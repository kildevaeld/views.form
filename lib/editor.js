"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var views_1 = require('views');
var utils_1 = require('./utils');
var validator_1 = require('./validator');
var orange_1 = require('orange');

var BaseEditor = function (_views_1$View) {
    _inherits(BaseEditor, _views_1$View);

    function BaseEditor() {
        _classCallCheck(this, BaseEditor);

        return _possibleConstructorReturn(this, (BaseEditor.__proto__ || Object.getPrototypeOf(BaseEditor)).apply(this, arguments));
    }

    _createClass(BaseEditor, [{
        key: "clear",
        value: function clear() {
            this.triggerMethod('before:clear');
            this.setValue(null);
            this.triggerMethod('clear');
        }
    }, {
        key: "validate",
        value: function validate(form) {
            return validator_1.validate(form, this, this.value);
        }
    }, {
        key: "name",
        get: function get() {
            return this.el.getAttribute('name');
        }
    }, {
        key: "value",
        get: function get() {
            return this.getValue();
        },
        set: function set(value) {
            if (orange_1.equal(value, this.getValue())) return;
            this.setValue(value);
        }
    }]);

    return BaseEditor;
}(views_1.View);

exports.BaseEditor = BaseEditor;

var BaseLayoutEditor = function (_views_1$View2) {
    _inherits(BaseLayoutEditor, _views_1$View2);

    function BaseLayoutEditor() {
        _classCallCheck(this, BaseLayoutEditor);

        return _possibleConstructorReturn(this, (BaseLayoutEditor.__proto__ || Object.getPrototypeOf(BaseLayoutEditor)).apply(this, arguments));
    }

    _createClass(BaseLayoutEditor, [{
        key: "clear",
        value: function clear() {
            this.triggerMethod('before:clear');
            this.setValue(null);
            this.triggerMethod('clear');
        }
    }, {
        key: "validate",
        value: function validate(form) {
            return validator_1.validate(form, this, this.value);
        }
    }, {
        key: "name",
        get: function get() {
            return this.el.getAttribute('name');
        }
    }, {
        key: "value",
        get: function get() {
            return this.getValue();
        },
        set: function set(value) {
            if (orange_1.equal(value, this.getValue())) return;
            this.triggerMethod('before:set:value', value);
            this.setValue(value);
            this.triggerMethod('set:value', value);
        }
    }]);

    return BaseLayoutEditor;
}(views_1.View);

exports.BaseLayoutEditor = BaseLayoutEditor;
var Editor = function (_BaseEditor) {
    _inherits(Editor, _BaseEditor);

    function Editor() {
        _classCallCheck(this, Editor);

        return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));
    }

    _createClass(Editor, [{
        key: "setValue",
        value: function setValue(value) {
            utils_1.setValue(this.el, value);
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return utils_1.getValue(this.el);
        }
    }, {
        key: "_onKeyPress",
        value: function _onKeyPress(e) {
            this._prev = this.getValue();
            this.triggerMethod('change');
        }
    }, {
        key: "_onChange",
        value: function _onChange(e) {
            if (orange_1.equal(this._prev, this.getValue())) return;
            this._prev = this.getValue();
            this.triggerMethod('change');
        }
    }, {
        key: "name",
        get: function get() {
            return this.el.getAttribute('name');
        }
    }]);

    return Editor;
}(BaseEditor);
Editor = __decorate([views_1.attributes({
    tagName: 'input',
    events: {
        keyup: '_onKeyPress',
        change: '_onChange'
    }
}), __metadata('design:paramtypes', [])], Editor);
exports.Editor = Editor;