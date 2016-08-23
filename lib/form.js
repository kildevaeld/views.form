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
const field_1 = require('./field');
const orange_1 = require('orange');
let Form = class Form extends views_1.View {
    constructor(options) {
        super(options);
        this._fields = [];
        this._isRendered = false;
        options = options || {};
        this._options = orange_1.extend({}, {
            createHelpAreas: false,
            validateOnChange: true,
            fieldOptions: {}
        }, options);
    }
    get options() {
        return this._options;
    }
    get fields() {
        return [].concat(this._fields);
    }
    getFieldByName(name) {
        for (let i = 0, ii = this.fields.length; i < ii; i++) {
            if (this.fields[i].name === name)
                return this.fields[i];
        }
        return null;
    }
    render(options = {}) {
        this._isRendered = false;
        if (!options.silent)
            this.triggerMethod('before:render');
        this.undelegateEvents();
        this.renderTemplate(this.getTemplateData());
        this._renderFields();
        this.delegateEvents();
        if (!options.silent)
            this.triggerMethod('render');
        this._isRendered = true;
        this._setValue(this.model);
        return this;
    }
    setModel(model) {
        if (model === this.model)
            return;
        super.setModel(model);
        this._setValue(model);
        this.listenTo(model, 'change', this._onModelValueChange);
        return this;
    }
    validate() {
        return this.fields.map(m => m.validate()).filter(m => m != null);
    }
    _setValue(model) {
        if (!this._isRendered) {
            this.once('render', () => this._setValue(model));
        }
        if (model == null) {
            this.fields.forEach(m => m.editor.clear());
        }
        else {
            this.fields.forEach(m => {
                if (model.get(m.name) !== undefined) {
                    m.editor.value = model.get(m.name);
                }
                else {
                    this.model.set(m.name, m.editor.value, { silent: true });
                }
            });
        }
    }
    _renderFields() {
        this.triggerMethod('before:render:fields');
        this._fields.forEach(f => {
            this.stopListening(f);
            f.destroy();
        });
        this._fields = [];
        let fields = this.el.querySelectorAll('.field');
        var errors = [], field;
        for (let i = 0, ii = fields.length; i < ii; i++) {
            try {
                let e = fields[i].querySelector('[name]');
                let name = "";
                if (e)
                    name = e.getAttribute('name');
                let o = orange_1.extend({
                    createHelpArea: this.options.createHelpAreas || false
                }, this.options.fieldOptions[name] || {}, {
                    form: this
                });
                field = field_1.Field.createField(fields[i], o);
                this._fields.push(field);
                //this.listenTo(field, 'all', this._onFieldEventTriggered);
                this.listenTo(field, 'change', this._onFieldValueChanged);
            }
            catch (e) {
                errors.push(e);
            }
        }
        this._fields.forEach(m => { m.render(); });
        if (errors.length) {
            console.log(errors);
            this.triggerMethod('render:fields:error', errors);
        }
        this.triggerMethod('render:fields');
    }
    _onModelValueChange(model) {
        for (let key in model.changed) {
            let field = this.getFieldByName(key);
            if (field == null)
                continue;
            field.editor.value = model.get(key);
        }
    }
    _onFieldValueChanged(field, ...args) {
        this.trigger('change');
        if (this.options.validateOnChange) {
            if (field.validate()) {
                return;
            }
            ;
        }
        this.model.set(field.name, field.editor.value);
    }
    _onFieldEventTriggered(event, field, ...args) {
        console.log(event);
        if (event === "change") {
            this.trigger('change');
            if (this.options.validateOnChange) {
                if (field.validate()) {
                    return;
                }
                ;
            }
            this.model.set(field.name, field.editor.value);
        }
        this.triggerMethod('field:' + event, field, ...args);
    }
    destroy() {
        this._fields.forEach(f => f.destroy());
        this._fields = [];
        return super.destroy();
    }
};
Form = __decorate([
    views_1.attributes({
        tagName: 'form',
        events: {}
    }), 
    __metadata('design:paramtypes', [Object])
], Form);
exports.Form = Form;
