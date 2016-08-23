
import {View, ViewOptions, attributes, RenderOptions} from 'views';
import {Form} from './form';
import {extend, createElement, addClass, removeClass, Html, callFunc} from 'orange';
import {IEditor, Editor, IEditorOptions} from './editor';
import {getEditor} from './define';
import {ValidateErrors} from './validator'

export interface FieldOptions extends ViewOptions {
    editor?: HTMLElement;
    form: Form;
    name?: string;
    editorOptions?: IEditorOptions;
    createHelpArea?:boolean;
}

@attributes({
    tagName: 'div',
    className: 'form-field'
})
export class Field extends View<HTMLDivElement> {
    static createField(el: HTMLDivElement, options?:FieldOptions): Field {
        let elm = <HTMLElement>el.querySelector('[name]')
        if (elm == null) throw new Error("field doest not contain an element");
        let o = extend({}, options||{}, {
            el: el
        })
        
        return new Field(o);
    }

    private _form: Form;
    private _editor: IEditor;
    public _options: FieldOptions;

    get name(): string {
        if (this._editor) return this._editor.name;
        return "no-name";
    }

    get label(): string {
        let label = this.el.querySelector('form-field-label');
        if (label) {
            return label.textContent;
        }
        return this.name;
    }

    set editor(editor: IEditor) {
        if (this._editor) {
            this.stopListening(this._editor);
            this._editor.destroy();
        }

        this._editor = editor;

        if (editor == null) {
            return;
        }

        this.listenTo(editor, 'change', this._onEditorChange);
        /*this.listenTo(editor, 'all', (event:string, ...args:any[]) => {
            if (event == 'change') return;
            args = (args || []);
            args.unshift(this);
            this.triggerMethod(event, ...args);
        })*/
    }

    get editor(): IEditor {
        return this._editor;
    }

    constructor(options?:FieldOptions) {
        
        if (options == null) throw new Error('field options required');
        if (options.form == null) throw new Error('form required');

        super(options);

        this._options = options;

        this._form = options.form;

    }

    render (options:RenderOptions = {}) {

        if (!options.silent)
            this.triggerMethod('before:render');

        this.undelegateEvents();

        this.renderTemplate(this.getTemplateData());

        if (!this._editor) {
            let el = <HTMLElement>this.el.querySelector('[name]');
            if (!el) {
                throw new Error('no editor or no input with name attribute');
            }


            let editorType = el.getAttribute('form-editor');
            
            let o = extend({}, this._options.editorOptions||{}, {
                el: el
            });

            if (editorType) {
                let editor = getEditor(editorType, o);
                if (editor) this.editor = editor;
            }

            if (this.editor == null) {
                let editor = getEditor(el.nodeName.toLowerCase(),o);
                
                if (editor) this.editor = editor;
                else this.editor = new Editor(o);
            }  
        }

        if (this._options.createHelpArea) this.createHelpArea();

        this.editor.render();

        this.delegateEvents();

        if (!options.silent)
            this.triggerMethod('render');


        return this;
    }

    public createHelpArea() {
        let helpArea = <HTMLDivElement>this.el.querySelector('.form-field-helparea');
        if (helpArea) {
            return;
        }

        this.triggerMethod('before:helparea');
        helpArea = createElement<HTMLDivElement>("div", {
            class: "form-field-helparea"
        });

        /*if (this.editor) {
            this.el.insertBefore(helpArea, this.editor.el);
        } else {*/
            this.el.appendChild(helpArea);
        //}
    }

    validate (): ValidateErrors {
        if (!this.editor) return null;

        let el = Html.query(this.el);

        let e = this.editor.validate(this._form);
        let helpArea = this.el.querySelector('.form-field-helparea')
        
        if (e == null) {
            el.addClass('has-success').removeClass('has-error');
            if (helpArea) helpArea.innerHTML = '';
            return;
        }

        el.addClass('has-error').removeClass('has-success')

        
        if (helpArea) {
            let html;
            if (e.errors.length === 1) {
                html = `<span>${e.errors[0].message}</span>`
            } else {
                
                let m = e.errors.map( m => `<li>${m.message}</li>`).join('');
                html = `<ul>${m}</ul>`;
            }
            helpArea.innerHTML = html;
        }

        return e;

    }

    protected _onEditorChange() {
        this.triggerMethod('change', this);
    }
}
