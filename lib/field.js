"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const views_1 = require('views');
const orange_1 = require('orange');
const editor_1 = require('./editor');
const define_1 = require('./define');
const Debug = require('debug');
const debug = Debug('views:form:field');
let Field_1;
let Field = Field_1 = class Field extends views_1.View {
    constructor(options) {
        if (options == null)
            throw new Error('field options required');
        if (options.form == null)
            throw new Error('form required');
        super(options);
        this._options = options;
        this._form = options.form;
    }
    static createField(el, options) {
        let elm = el.querySelector('[name]');
        if (elm == null)
            throw new Error("field doest not contain an element");
        let o = orange_1.extend({}, options || {}, {
            el: el
        });
        return new Field_1(o);
    }
    get name() {
        if (this._editor)
            return this._editor.name;
        return "no-name";
    }
    get label() {
        let label = this.el.querySelector('form-field-label');
        if (label) {
            return label.textContent;
        }
        return this.name;
    }
    set editor(editor) {
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
    get editor() {
        return this._editor;
    }
    render(options = {}) {
        if (!options.silent)
            this.triggerMethod('before:render');
        this.undelegateEvents();
        this.renderTemplate(this.getTemplateData());
        if (!this._editor) {
            let el = this.el.querySelector('[name]');
            if (!el) {
                throw new Error('no editor or no input with name attribute');
            }
            let editorType = el.getAttribute('form-editor');
            let o = orange_1.extend({}, this._options.editorOptions || {}, {
                el: el
            });
            let name = el.getAttribute('name');
            if (editorType) {
                let editor = define_1.getEditor(editorType, o);
                if (editor) {
                    debug('%s: found custom editor type: %s', name, editorType);
                    this.editor = editor;
                }
            }
            if (this.editor == null) {
                let editor = define_1.getEditor(el.nodeName.toLowerCase(), o);
                if (editor) {
                    debug('%s: found custom editor type from tag: %s', name, el.nodeName.toLowerCase());
                    this.editor = editor;
                }
                else {
                    this.editor = new editor_1.Editor(o);
                }
            }
        }
        if (this._options.createHelpArea)
            this.createHelpArea();
        this.editor.render();
        this.delegateEvents();
        if (!options.silent)
            this.triggerMethod('render');
        return this;
    }
    createHelpArea() {
        let helpArea = this.el.querySelector('.form-field-helparea');
        if (helpArea) {
            return;
        }
        debug('%s: creating help area', this.name);
        this.triggerMethod('before:helparea');
        helpArea = orange_1.createElement("div", {
            class: "form-field-helparea"
        });
        /*if (this.editor) {
            this.el.insertBefore(helpArea, this.editor.el);
        } else {*/
        this.el.appendChild(helpArea);
        //}
    }
    validate() {
        if (!this.editor)
            return null;
        let el = orange_1.Html.query(this.el);
        let e = this.editor.validate(this._form);
        let helpArea = this.el.querySelector('.form-field-helparea');
        if (e == null) {
            el.addClass('has-success').removeClass('has-error');
            if (helpArea)
                helpArea.innerHTML = '';
            return;
        }
        el.addClass('has-error').removeClass('has-success');
        if (helpArea) {
            let html;
            if (e.errors.length === 1) {
                html = `<span>${e.errors[0].message}</span>`;
            }
            else {
                let m = e.errors.map(m => `<li>${m.message}</li>`).join('');
                html = `<ul>${m}</ul>`;
            }
            helpArea.innerHTML = html;
        }
        return e;
    }
    _onEditorChange() {
        this.triggerMethod('change', this);
    }
};
Field = Field_1 = __decorate([
    views_1.attributes({
        tagName: 'div',
        className: 'form-field'
    }), 
    __metadata('design:paramtypes', [Object])
], Field);
exports.Field = Field;
