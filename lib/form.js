"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
var field_1 = require('./field');
var orange_1 = require('orange');
var Debug = require('debug');
var debug = Debug('views:form');
var Form = function (_views_1$View) {
    _inherits(Form, _views_1$View);

    function Form(options) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, options));

        _this._fields = [];
        _this._isRendered = false;
        options = options || {};
        _this._options = orange_1.extend({}, {
            createHelpAreas: false,
            validateOnChange: true,
            fieldOptions: {}
        }, options);
        return _this;
    }

    _createClass(Form, [{
        key: "getFieldByName",
        value: function getFieldByName(name) {
            for (var i = 0, ii = this.fields.length; i < ii; i++) {
                if (this.fields[i].name === name) return this.fields[i];
            }
            return null;
        }
    }, {
        key: "render",
        value: function render() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            this._isRendered = false;
            if (!options.silent) this.triggerMethod('before:render');
            this.undelegateEvents();
            this.renderTemplate(this.getTemplateData());
            this._renderFields();
            this.delegateEvents();
            if (!options.silent) this.triggerMethod('render');
            this._isRendered = true;
            this._setValue(this.model);
            return this;
        }
    }, {
        key: "setModel",
        value: function setModel(model) {
            if (model === this.model) return;
            _get(Object.getPrototypeOf(Form.prototype), "setModel", this).call(this, model);
            this._setValue(model);
            if (model != null) this.listenTo(model, 'change', this._onModelValueChange);
            return this;
        }
    }, {
        key: "validate",
        value: function validate() {
            return this.fields.map(function (m) {
                return m.validate();
            }).filter(function (m) {
                return m != null;
            });
        }
    }, {
        key: "clear",
        value: function clear() {
            if (!this._fields) return this;
            this._fields.forEach(function (f) {
                return f.clear();
            });
        }
    }, {
        key: "_setValue",
        value: function _setValue(model) {
            var _this2 = this;

            if (!this._isRendered) {
                this.once('render', function () {
                    return _this2._setValue(model);
                });
            }
            if (model == null) {
                this.fields.forEach(function (m) {
                    return m.editor.clear();
                });
            } else {
                this.fields.forEach(function (m) {
                    if (model.get(m.name) !== undefined) {
                        m.editor.value = model.get(m.name);
                    } else {
                        _this2.model.set(m.name, m.editor.value, { silent: true });
                    }
                });
            }
        }
    }, {
        key: "_renderFields",
        value: function _renderFields() {
            var _this3 = this;

            this.triggerMethod('before:render:fields');
            this._fields.forEach(function (f) {
                _this3.stopListening(f);
                f.destroy();
            });
            this._fields = [];
            var fields = this.el.querySelectorAll('.field');
            debug('found %i fields', fields.length);
            var errors = [],
                field;
            for (var i = 0, ii = fields.length; i < ii; i++) {
                try {
                    var e = fields[i].querySelector('[name]');
                    var name = "";
                    if (e) name = e.getAttribute('name');
                    var o = orange_1.extend({
                        createHelpArea: this.options.createHelpAreas || false
                    }, this.options.fieldOptions[name] || {}, {
                        form: this
                    });
                    debug('create field: %s', name);
                    field = field_1.Field.createField(fields[i], o);
                    this._fields.push(field);
                    //this.listenTo(field, 'all', this._onFieldEventTriggered);
                    this.listenTo(field, 'change', this._onFieldValueChanged);
                } catch (e) {
                    errors.push(e);
                }
            }
            this._fields.forEach(function (m) {
                m.render();
            });
            if (errors.length) {
                this.triggerMethod('render:fields:error', errors);
            }
            this.triggerMethod('render:fields');
        }
    }, {
        key: "_onModelValueChange",
        value: function _onModelValueChange(model) {
            for (var key in model.changed) {
                var field = this.getFieldByName(key);
                if (field == null) continue;
                field.editor.value = model.get(key);
            }
        }
    }, {
        key: "_onFieldValueChanged",
        value: function _onFieldValueChanged(field) {
            this.trigger('change');
            if (this.options.validateOnChange) {
                if (field.validate()) {
                    return;
                }
                ;
            }
            if (this.model) this.model.set(field.name, field.editor.value);
        }
    }, {
        key: "_onFieldEventTriggered",
        value: function _onFieldEventTriggered(event, field) {
            console.log(event);
            if (event === "change") {
                this.trigger('change');
                if (this.options.validateOnChange) {
                    if (field.validate()) {
                        return;
                    }
                    ;
                }
                if (this.model) this.model.set(field.name, field.editor.value);
            }

            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
            }

            this.triggerMethod.apply(this, ['field:' + event, field].concat(args));
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this._fields.forEach(function (f) {
                return f.destroy();
            });
            this._fields = [];
            return _get(Object.getPrototypeOf(Form.prototype), "destroy", this).call(this);
        }
    }, {
        key: "options",
        get: function get() {
            return this._options;
        }
    }, {
        key: "fields",
        get: function get() {
            return [].concat(this._fields);
        }
    }]);

    return Form;
}(views_1.View);
Form = __decorate([views_1.attributes({
    tagName: 'form',
    events: {}
}), __metadata('design:paramtypes', [Object])], Form);
exports.Form = Form;