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
const utils_1 = require('./utils');
const validator_1 = require('./validator');
const orange_1 = require('orange');
class BaseEditor extends views_1.View {
    get name() {
        return this.el.getAttribute('name');
    }
    get value() {
        return this.getValue();
    }
    set value(value) {
        if (orange_1.equal(value, this.getValue()))
            return;
        this.setValue(value);
    }
    validate(form) {
        return validator_1.validate(form, this, this.value);
    }
}
exports.BaseEditor = BaseEditor;
class BaseLayoutEditor extends views_1.View {
    get name() {
        return this.el.getAttribute('name');
    }
    get value() {
        return this.getValue();
    }
    set value(value) {
        if (orange_1.equal(value, this.getValue()))
            return;
        this.setValue(value);
    }
    validate(form) {
        return validator_1.validate(form, this, this.value);
    }
}
exports.BaseLayoutEditor = BaseLayoutEditor;
let Editor = class Editor extends BaseEditor {
    get name() {
        return this.el.getAttribute('name');
    }
    setValue(value) {
        utils_1.setValue(this.el, value);
    }
    getValue() {
        return utils_1.getValue(this.el);
    }
    clear() {
        utils_1.setValue(this.el, '');
    }
    _onKeyPress(e) {
        this._prev = this.getValue();
        this.triggerMethod('change');
    }
    _onChange(e) {
        if (orange_1.equal(this._prev, this.getValue()))
            return;
        this._prev = this.getValue();
        this.triggerMethod('change');
    }
};
Editor = __decorate([
    views_1.attributes({
        tagName: 'input',
        events: {
            keyup: '_onKeyPress',
            change: '_onChange'
        }
    }), 
    __metadata('design:paramtypes', [])
], Editor);
exports.Editor = Editor;
