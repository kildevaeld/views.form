
import { View, attributes, RenderOptions, ViewOptions } from 'views';
import { Field, FieldOptions } from './field';
import { IModel } from 'collection';
import { ValidateErrors } from './validator';
import { extend } from 'orange';
import * as Debug from 'debug';

const debug = Debug('views:form');

export interface FormOptions extends ViewOptions {
    createHelpAreas?: boolean;
    validateOnChange?: boolean;
    fields?: { [key: string]: FieldOptions };
    fieldSelector?: string;
}

@attributes({
    tagName: 'form',
    events: {}
})
export class Form extends View<HTMLFormElement> {

    private _fields: Field[] = [];
    private _isRendered: boolean = false;
    public _options: FormOptions;


    get options(): FormOptions {
        return this._options;
    }

    constructor(options?: FormOptions) {
        super(options);
        options = options || {};
        this._options = extend({}, {
            createHelpAreas: false,
            validateOnChange: true,
            fields: {},
            fieldSelector: '.field'
        }, options);
    }

    get fields(): Field[] {
        return [].concat(this._fields);
    }

    getFieldByName(name: string): Field {
        for (let i = 0, ii = this.fields.length; i < ii; i++) {
            if (this.fields[i].name === name) return this.fields[i];
        }
        return null;
    }


    render(options: RenderOptions = {}) {
        this._isRendered = false;
        if (!options.silent)
            this.triggerMethod('before:render');

        this.undelegateEvents();

        this.renderTemplate(this.getTemplateData());

        this._renderFields();

        this.delegateEvents();


        this._isRendered = true;

        if (!options.silent)
            this.triggerMethod('render');


        this._setValue(this.model);

        return this;
    }

    update() {
        if (this.model == null) return this;
        this._model.set(this.value);
        return this;
    }

    get value() {
        let out = {};
        this.fields.forEach(f => {
            out[f.name] = f.value;
        });
        return out;
    }

    set value(value: any) {
        if (value == null) {
            this.fields.forEach(m => m.editor.clear());
        } else {
            this.fields.forEach(m => {
                if (value[m.name] !== undefined) {
                    m.editor.value = value[m.name];
                }
            });
        }
    }

    setModel(model: IModel) {

        if (model === this.model) return;

        super.setModel(model);
        this._setValue(model)


        if (model != null)
            this.listenTo(model, 'change', this._onModelValueChange);

        return this;
    }

    validate(): ValidateErrors[] {
        return this.fields.map(m => m.validate()).filter(m => m != null);
    }

    clear() {
        if (!this._fields) return this;
        this._fields.forEach(f => f.clear());


    }

    private _setValue(model: IModel) {
        if (!this._isRendered) {
            //this.once('render', () => this._setValue(model))
            return;
        }

        this.clear();

        if (model != null) {
            this.fields.forEach(m => {
                if (model.get(m.name) !== undefined) {
                    m.editor.value = model.get(m.name);
                } else {
                    (<any>this.model).set(m.name, m.editor.value, { silent: true });
                }
            })

        }

    }



    private _renderFields() {

        this.triggerMethod('before:render:fields');

        this._fields.forEach(f => {
            this.stopListening(f);
            f.destroy()
        });
        this._fields = [];

        let fields = this.el.querySelectorAll(this.options.fieldSelector);
        debug('found %i fields', fields.length);
        var errors = [], field;
        for (let i = 0, ii = fields.length; i < ii; i++) {

            try {
                let e = fields[i].querySelector('[name]');
                let name = "";
                if (e) name = e.getAttribute('name');

                let o = extend({
                    createHelpArea: this.options.createHelpAreas || false
                }, this.options.fields[name] || {}, {
                        form: this
                    });

                debug('create field: %s', name);
              
                field = Field.createField(<HTMLDivElement>fields[i], o);
                this._fields.push(field);

                //this.listenTo(field, 'all', this._onFieldEventTriggered);
                this.listenTo(field, 'change', this._onFieldValueChanged);

            } catch (e) {
                errors.push(e);
            }

        }

        this._fields.forEach(m => { m.render() });

        if (errors.length) {
            this.triggerMethod('render:fields:error', errors);
        }

        this.triggerMethod('render:fields');

    }

    private _onModelValueChange(model: IModel) {
        for (let key in model.changed) {
            let field = this.getFieldByName(key);
            if (field == null) continue;
            field.editor.value = model.get(key);
        }
    }

    private _onFieldValueChanged(field: Field, ...args: any[]) {

        this.trigger('change')
        if (this.options.validateOnChange) {
            if (field.validate()) {
                return;
            };
        }
        if (this.model)
            this.model.set(field.name, field.editor.value);

    }


    private _onFieldEventTriggered(event: string, field: Field, ...args: any[]) {
        console.log(event);
        if (event === "change") {
            this.trigger('change')
            if (this.options.validateOnChange) {
                if (field.validate()) {
                    return;
                };
            }
            if (this.model)
                this.model.set(field.name, field.editor.value);
        }

        this.triggerMethod('field:' + event, field, ...args);

    }


    destroy() {
        this._fields.forEach(f => f.destroy());
        this._fields = [];
        return super.destroy();
    }

}