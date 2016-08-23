(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("views"), require("orange"));
	else if(typeof define === 'function' && define.amd)
		define(["views", "orange"], factory);
	else if(typeof exports === 'object')
		exports["form"] = factory(require("views"), require("orange"));
	else
		root["views"] = root["views"] || {}, root["views"]["form"] = factory(root["views"], root["orange"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(1));
	var define_1 = __webpack_require__(10);
	exports.editor = define_1.editor;
	var editor_1 = __webpack_require__(5);
	exports.BaseEditor = editor_1.BaseEditor;
	exports.BaseLayoutEditor = editor_1.BaseLayoutEditor;
	var field_1 = __webpack_require__(3);
	exports.Field = field_1.Field;
	__export(__webpack_require__(7));
	__webpack_require__(11);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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
	var views_1 = __webpack_require__(2);
	var field_1 = __webpack_require__(3);
	var Form = function (_views_1$View) {
	    _inherits(Form, _views_1$View);
	
	    function Form(options) {
	        _classCallCheck(this, Form);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, options));
	
	        _this._fields = [];
	        _this._isRendered = false;
	        _this._options = options || {};
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
	            this.listenTo(model, 'change', this._onModelValueChange);
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
	            var errors = [],
	                field;
	            for (var i = 0, ii = fields.length; i < ii; i++) {
	                try {
	                    field = field_1.Field.createField(fields[i], {
	                        form: this,
	                        createHelpArea: this.options.createHelpAreas || false
	                    });
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
	                console.log(errors);
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
	            this.model.set(field.name, field.editor.value);
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
	                this.model.set(field.name, field.editor.value);
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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
	var views_1 = __webpack_require__(2);
	var orange_1 = __webpack_require__(4);
	var editor_1 = __webpack_require__(5);
	var define_1 = __webpack_require__(10);
	var Field_1 = void 0;
	var Field = Field_1 = function (_views_1$View) {
	    _inherits(Field, _views_1$View);
	
	    function Field(options) {
	        _classCallCheck(this, Field);
	
	        if (options == null) throw new Error('field options required');
	        if (options.form == null) throw new Error('form required');
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Field).call(this, options));
	
	        _this._options = options;
	        _this._form = options.form;
	        return _this;
	    }
	
	    _createClass(Field, [{
	        key: "render",
	        value: function render() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	            if (!options.silent) this.triggerMethod('before:render');
	            this.undelegateEvents();
	            this.renderTemplate(this.getTemplateData());
	            if (!this._editor) {
	                var el = this.el.querySelector('[name]');
	                if (!el) {
	                    throw new Error('no editor or no input with name attribute');
	                }
	                var editorType = el.getAttribute('form-editor');
	                var o = orange_1.extend({}, this._options.editorOptions || {}, {
	                    el: el
	                });
	                if (editorType) {
	                    var editor = define_1.getEditor(editorType, o);
	                    if (editor) this.editor = editor;
	                }
	                if (this.editor == null) {
	                    var _editor = define_1.getEditor(el.nodeName.toLowerCase(), o);
	                    if (_editor) this.editor = _editor;else this.editor = new editor_1.Editor(o);
	                }
	            }
	            if (this._options.createHelpArea) this.createHelpArea();
	            this.editor.render();
	            this.delegateEvents();
	            if (!options.silent) this.triggerMethod('render');
	            return this;
	        }
	    }, {
	        key: "createHelpArea",
	        value: function createHelpArea() {
	            var helpArea = this.el.querySelector('.form-field-helparea');
	            if (helpArea) {
	                return;
	            }
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
	    }, {
	        key: "validate",
	        value: function validate() {
	            if (!this.editor) return null;
	            var el = orange_1.Html.query(this.el);
	            var e = this.editor.validate(this._form);
	            var helpArea = this.el.querySelector('.form-field-helparea');
	            if (e == null) {
	                el.addClass('has-success').removeClass('has-error');
	                if (helpArea) helpArea.innerHTML = '';
	                return;
	            }
	            el.addClass('has-error').removeClass('has-success');
	            if (helpArea) {
	                var html = void 0;
	                if (e.errors.length === 1) {
	                    html = "<span>" + e.errors[0].message + "</span>";
	                } else {
	                    var m = e.errors.map(function (m) {
	                        return "<li>" + m.message + "</li>";
	                    }).join('');
	                    html = "<ul>" + m + "</ul>";
	                }
	                helpArea.innerHTML = html;
	            }
	            return e;
	        }
	    }, {
	        key: "_onEditorChange",
	        value: function _onEditorChange() {
	            this.triggerMethod('change', this);
	        }
	    }, {
	        key: "name",
	        get: function get() {
	            if (this._editor) return this._editor.name;
	            return "no-name";
	        }
	    }, {
	        key: "label",
	        get: function get() {
	            var label = this.el.querySelector('form-field-label');
	            if (label) {
	                return label.textContent;
	            }
	            return this.name;
	        }
	    }, {
	        key: "editor",
	        set: function set(editor) {
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
	        },
	        get: function get() {
	            return this._editor;
	        }
	    }], [{
	        key: "createField",
	        value: function createField(el, options) {
	            var elm = el.querySelector('[name]');
	            if (elm == null) throw new Error("field doest not contain an element");
	            var o = orange_1.extend({}, options || {}, {
	                el: el
	            });
	            return new Field_1(o);
	        }
	    }]);
	
	    return Field;
	}(views_1.View);
	Field = Field_1 = __decorate([views_1.attributes({
	    tagName: 'div',
	    className: 'form-field'
	}), __metadata('design:paramtypes', [Object])], Field);
	exports.Field = Field;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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
	var views_1 = __webpack_require__(2);
	var utils_1 = __webpack_require__(6);
	var validator_1 = __webpack_require__(7);
	var orange_1 = __webpack_require__(4);
	
	var BaseEditor = function (_views_1$View) {
	    _inherits(BaseEditor, _views_1$View);
	
	    function BaseEditor() {
	        _classCallCheck(this, BaseEditor);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseEditor).apply(this, arguments));
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
	            console.log(orange_1.equal(value, this.getValue()), this.name);
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
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseLayoutEditor).apply(this, arguments));
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
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).apply(this, arguments));
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

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var start = "<%",
	    end = "%>",
	    path = "[a-z0-9_$][\\.a-z0-9_]*",
	    // e.g. config.person.name
	pattern = new RegExp(start + "\\s*(" + path + ")\\s*" + end, "gi"),
	    undef = undefined;
	function template(template, data) {
	    var throwOnNotFound = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	    return template.replace(pattern, function (tag, token) {
	        var path = token.split("."),
	            len = path.length,
	            lookup = data,
	            i = 0;
	        for (; i < len; i++) {
	            lookup = lookup[path[i]];
	            // Property not found
	            if (lookup === undef) {
	                if (throwOnNotFound) {
	                    throw new Error("tim: '" + path[i] + "' not found in " + tag);
	                } else {
	                    lookup = "";
	                }
	            }
	            // Return the required value
	            if (i === len - 1) {
	                return lookup;
	            }
	        }
	    });
	}
	exports.template = template;
	function getValue(el, value) {
	    var node = el;
	    var isCheckbox = /checkbox/.test(node.type);
	    var isRadio = /radio/.test(node.type);
	    var isRadioOrCheckbox = isCheckbox || isRadio;
	    var hasValue = Object.prototype.hasOwnProperty.call(node, "value");
	    var isInput = hasValue || /input|textarea|checkbox/.test(node.nodeName.toLowerCase());
	    var isSelect = /select/i.test(node.nodeName);
	    if (arguments.length === 1) {
	        if (isCheckbox) {
	            return Boolean(node.checked);
	        } else if (isSelect) {
	            return node.value || "";
	        } else if (isInput) {
	            var _value = node.value || "";
	            if (node.type.toLowerCase() === 'number') {
	                _value = parseInt(_value);
	                _value = isNaN(_value) ? 0 : _value;
	            }
	            return _value;
	        } else {
	            return node.innerHTML || "";
	        }
	    }
	    if (value == null) {
	        value = "";
	    }
	    if (isRadioOrCheckbox) {
	        if (isRadio) {
	            if (String(value) === String(node.value)) {
	                node.checked = true;
	            }
	        } else {
	            node.checked = value;
	        }
	    } else if (String(value) !== getValue(el)) {
	        if (isInput || isSelect) {
	            node.value = value;
	        } else {
	            node.innerHTML = value;
	        }
	    }
	}
	exports.getValue = getValue;
	function setValue(el, value) {
	    getValue(el, value);
	}
	exports.setValue = setValue;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var utils_1 = __webpack_require__(6);
	var orange_1 = __webpack_require__(4);
	var validURL = __webpack_require__(8);
	function get_validations(el) {
	    var required;
	    var v = Object.keys(validators).map(function (e) {
	        // The required validator is getting handled elsewhere
	        if (e === 'required') return null;
	        var i = el.getAttribute('validate-' + e);
	        if (i != null) return [validators[e], i, messages[e] || "invalid"];
	        return null;
	    }).filter(function (e) {
	        return e !== null;
	    });
	    return v;
	}
	function validate(form, editor, value) {
	    var vals = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
	
	    var el = editor.el;
	    var v = get_validations(el),
	        name = editor.name,
	        //el.getAttribute('name'),
	    required = el.getAttribute('required') || el.getAttribute('validate-required'),
	        errors = [];
	    v = orange_1.unique(v.concat(vals));
	    if (required != null) {
	        if (!validators.required(name, form, value, null)) {
	            return new ValidateErrors([new ValidateError(utils_1.template(messages.required, {
	                name: name,
	                label: name,
	                value: value,
	                arg: null
	            }))]);
	        }
	    } else if (value == null || value == "") {
	        // Do not run validations, when the value is empty
	        return null;
	    }
	    for (var i = 0, ii = v.length; i < ii; i++) {
	        if (!v[i][0](name, form, value, v[i][1])) {
	            var e = new ValidateError(utils_1.template(v[i][2], {
	                name: name,
	                value: value,
	                label: name,
	                arg: v[i][1]
	            }));
	            errors.push(e);
	        }
	    }
	    if (errors.length) {
	        return new ValidateErrors(errors);
	    }
	    return null;
	}
	exports.validate = validate;
	var messages;
	(function (messages) {
	    messages.required = "<b><% label %></b> is required";
	    messages.min = "<b><% label %></b> needs to be minimum <% arg %>";
	    messages.max = "<b><% label %></b> needs to be maximum <% arg %>";
	    messages.email = "<b><% label %></b> is not an email";
	    messages.url = "<b><% label %></b> is not an url";
	    messages.match = "<b><% label %></b> does not match: <b><%arg%></b>";
	})(messages || (messages = {}));
	var validators;
	(function (validators) {
	    function required(name, form, value, arg) {
	        return !(value == "" || value == null);
	    }
	    validators.required = required;
	    function min(name, form, value, arg) {
	        var min = parseInt(arg);
	        // TODO: check in init
	        if (isNaN(min)) return;
	        if (typeof value === 'string') {
	            return value.length >= min;
	        } else if (Array.isArray(value)) {
	            return value.length >= min;
	        } else {
	            return parseInt(value) >= min;
	        }
	    }
	    validators.min = min;
	    function max(name, form, value, arg) {
	        var max = parseInt(arg);
	        // TODO: check in init
	        if (isNaN(max)) return;
	        if (typeof value === 'string') {
	            return value.length <= max;
	        } else if (Array.isArray(value)) {
	            return value.length <= max;
	        } else {
	            return parseInt(value) <= max;
	        }
	    }
	    validators.max = max;
	    function match(name, form, value, arg) {
	        var field = form.getFieldByName(arg);
	        if (!field) {
	            throw new Error('field: ' + arg + ' does not exists');
	        }
	        var oval = field.editor.value;
	        return orange_1.equal(value, oval);
	    }
	    validators.match = match;
	    function url(name, form, value, arg) {
	        return validURL.isUri(value);
	    }
	    validators.url = url;
	    var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
	    function email(name, form, value, arg) {
	        return validate_email(value);
	        // Thanks to:
	        // http://fightingforalostcause.net/misc/2006/compare-email-regex.php
	        // http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
	        // http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
	        function validate_email(email) {
	            if (!email) return false;
	            if (email.length > 254) return false;
	            var valid = tester.test(email);
	            if (!valid) return false;
	            // Further checking of some things regex can't handle
	            var parts = email.split("@");
	            if (parts[0].length > 64) return false;
	            var domainParts = parts[1].split(".");
	            if (domainParts.some(function (part) {
	                return part.length > 63;
	            })) return false;
	            return true;
	        }
	    }
	    validators.email = email;
	})(validators = exports.validators || (exports.validators = {}));
	function setMessage(validator, message) {
	    messages[validator] = message;
	}
	exports.setMessage = setMessage;
	function registerValidator(name, fn) {
	    validators[name] = fn;
	}
	exports.registerValidator = registerValidator;
	
	var ValidateError = function (_Error) {
	    _inherits(ValidateError, _Error);
	
	    function ValidateError(message) {
	        _classCallCheck(this, ValidateError);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ValidateError).call(this, message));
	
	        _this.message = message;
	        return _this;
	    }
	
	    return ValidateError;
	}(Error);
	
	exports.ValidateError = ValidateError;
	
	var ValidateErrors = function (_Error2) {
	    _inherits(ValidateErrors, _Error2);
	
	    function ValidateErrors() {
	        var errors = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	        _classCallCheck(this, ValidateErrors);
	
	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ValidateErrors).call(this));
	
	        _this2.errors = errors;
	        return _this2;
	    }
	
	    _createClass(ValidateErrors, [{
	        key: 'length',
	        get: function get() {
	            return this.errors.length;
	        }
	    }]);
	
	    return ValidateErrors;
	}(Error);
	
	exports.ValidateErrors = ValidateErrors;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {(function(module) {
	    'use strict';
	
	    module.exports.is_uri = is_iri;
	    module.exports.is_http_uri = is_http_iri;
	    module.exports.is_https_uri = is_https_iri;
	    module.exports.is_web_uri = is_web_iri;
	    // Create aliases
	    module.exports.isUri = is_iri;
	    module.exports.isHttpUri = is_http_iri;
	    module.exports.isHttpsUri = is_https_iri;
	    module.exports.isWebUri = is_web_iri;
	
	
	    // private function
	    // internal URI spitter method - direct from RFC 3986
	    var splitUri = function(uri) {
	        var splitted = uri.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
	        return splitted;
	    };
	
	    function is_iri(value) {
	        if (!value) {
	            return;
	        }
	
	        // check for illegal characters
	        if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(value)) return;
	
	        // check for hex escapes that aren't complete
	        if (/%[^0-9a-f]/i.test(value)) return;
	        if (/%[0-9a-f](:?[^0-9a-f]|$)/i.test(value)) return;
	
	        var splitted = [];
	        var scheme = '';
	        var authority = '';
	        var path = '';
	        var query = '';
	        var fragment = '';
	        var out = '';
	
	        // from RFC 3986
	        splitted = splitUri(value);
	        scheme = splitted[1]; 
	        authority = splitted[2];
	        path = splitted[3];
	        query = splitted[4];
	        fragment = splitted[5];
	
	        // scheme and path are required, though the path can be empty
	        if (!(scheme && scheme.length && path.length >= 0)) return;
	
	        // if authority is present, the path must be empty or begin with a /
	        if (authority && authority.length) {
	            if (!(path.length === 0 || /^\//.test(path))) return;
	        } else {
	            // if authority is not present, the path must not start with //
	            if (/^\/\//.test(path)) return;
	        }
	
	        // scheme must begin with a letter, then consist of letters, digits, +, ., or -
	        if (!/^[a-z][a-z0-9\+\-\.]*$/.test(scheme.toLowerCase()))  return;
	
	        // re-assemble the URL per section 5.3 in RFC 3986
	        out += scheme + ':';
	        if (authority && authority.length) {
	            out += '//' + authority;
	        }
	
	        out += path;
	
	        if (query && query.length) {
	            out += '?' + query;
	        }
	
	        if (fragment && fragment.length) {
	            out += '#' + fragment;
	        }
	
	        return out;
	    }
	
	    function is_http_iri(value, allowHttps) {
	        if (!is_iri(value)) {
	            return;
	        }
	
	        var splitted = [];
	        var scheme = '';
	        var authority = '';
	        var path = '';
	        var port = '';
	        var query = '';
	        var fragment = '';
	        var out = '';
	
	        // from RFC 3986
	        splitted = splitUri(value);
	        scheme = splitted[1]; 
	        authority = splitted[2];
	        path = splitted[3];
	        query = splitted[4];
	        fragment = splitted[5];
	
	        if (!scheme)  return;
	
	        if(allowHttps) {
	            if (scheme.toLowerCase() != 'https') return;
	        } else {
	            if (scheme.toLowerCase() != 'http') return;
	        }
	
	        // fully-qualified URIs must have an authority section that is
	        // a valid host
	        if (!authority) {
	            return;
	        }
	
	        // enable port component
	        if (/:(\d+)$/.test(authority)) {
	            port = authority.match(/:(\d+)$/)[0];
	            authority = authority.replace(/:\d+$/, '');
	        }
	
	        out += scheme + ':';
	        out += '//' + authority;
	        
	        if (port) {
	            out += port;
	        }
	        
	        out += path;
	        
	        if(query && query.length){
	            out += '?' + query;
	        }
	
	        if(fragment && fragment.length){
	            out += '#' + fragment;
	        }
	        
	        return out;
	    }
	
	    function is_https_iri(value) {
	        return is_http_iri(value, true);
	    }
	
	    function is_web_iri(value) {
	        return (is_http_iri(value) || is_https_iri(value));
	    }
	
	})(module);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)(module)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	var _editors = {};
	function editor(name) {
	    return function (target) {
	        _editors[name] = target;
	    };
	}
	exports.editor = editor;
	function getEditor(name, options) {
	    if (_editors[name]) {
	        return new _editors[name](options);
	    }
	    return null;
	}
	exports.getEditor = getEditor;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	var orange = __webpack_require__(4);
	var editor_1 = __webpack_require__(5);
	var define_1 = __webpack_require__(10);
	var views_1 = __webpack_require__(2);
	
	var AutoSizer = function () {
	    function AutoSizer(el) {
	        _classCallCheck(this, AutoSizer);
	
	        this.el = el;
	        this._onChange = orange.bind(this._onChange, this);
	        this._onPageResize = orange.bind(this._onPageResize, this);
	        this._initInitialSize();
	    }
	
	    _createClass(AutoSizer, [{
	        key: "_onPageResize",
	        value: function _onPageResize() {
	            if (this.el.clientWidth !== this._state.clientWidth) {
	                this._updateSize();
	            }
	        }
	    }, {
	        key: "_onChange",
	        value: function _onChange() {
	            this._updateSize();
	        }
	    }, {
	        key: "_initInitialSize",
	        value: function _initInitialSize() {
	            var style = window.getComputedStyle(this.el, null);
	            var heightOffset = void 0;
	            if (style.resize === 'vertical') {
	                this.el.style.resize = 'none';
	            } else if (style.resize === 'both') {
	                this.el.style.resize = 'horizontal';
	            }
	            if (style.boxSizing === 'content-box') {
	                heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
	            } else {
	                heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
	            }
	            // Fix when a textarea is not on document body and heightOffset is Not a Number
	            if (isNaN(heightOffset)) {
	                heightOffset = 0;
	            }
	            this._state = {
	                overflowY: style.overflowY,
	                heightOffset: heightOffset,
	                clientWidth: this.el.clientWidth
	            };
	            orange.addEventListener(this.el, 'keyup', this._onChange);
	            orange.addEventListener(this.el, 'input', this._onChange);
	            orange.addEventListener(window, 'resize', this._onPageResize);
	            this._updateSize();
	        }
	    }, {
	        key: "_changeOverflow",
	        value: function _changeOverflow(value) {
	            {
	                // Chrome/Safari-specific fix:
	                // When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
	                // made available by removing the scrollbar. The following forces the necessary text reflow.
	                var width = this.el.style.width;
	                this.el.style.width = '0px';
	                // Force reflow:
	                /* jshint ignore:start */
	                this.el.offsetWidth;
	                /* jshint ignore:end */
	                this.el.style.width = width;
	            }
	            this._state.overflowY = value;
	            ///*if (setOverflowY) {
	            this.el.style.overflowY = value;
	            //}*/
	            this._resize();
	        }
	    }, {
	        key: "_resize",
	        value: function _resize() {
	            var htmlTop = window.pageYOffset;
	            var bodyTop = document.body.scrollTop;
	            var originalHeight = this.el.style.height;
	            this.el.style.height = 'auto';
	            var endHeight = this.el.scrollHeight + this._state.heightOffset;
	            if (this.el.scrollHeight === 0) {
	                // If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
	                this.el.style.height = originalHeight;
	                return;
	            }
	            this.el.style.height = endHeight + 'px';
	            // used to check if an update is actually necessary on window.resize
	            this._state.clientWidth = this.el.clientWidth;
	            // prevents scroll-position jumping
	            document.documentElement.scrollTop = htmlTop;
	            document.body.scrollTop = bodyTop;
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            this._updateSize();
	        }
	    }, {
	        key: "_updateSize",
	        value: function _updateSize() {
	            var startHeight = this.el.style.height;
	            this._resize();
	            var style = window.getComputedStyle(this.el, null);
	            if (style.height !== this.el.style.height) {
	                if (this._state.overflowY !== 'visible') {
	                    this._changeOverflow('visible');
	                }
	            } else {
	                if (this._state.overflowY !== 'hidden') {
	                    this._changeOverflow('hidden');
	                }
	            }
	            if (startHeight !== this.el.style.height) {}
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            orange.removeEventListener(this.el, 'keyup', this._onChange);
	            orange.removeEventListener(this.el, 'input', this._onChange);
	            orange.removeEventListener(window, 'resize', this._onPageResize);
	        }
	    }]);
	
	    return AutoSizer;
	}();
	
	exports.AutoSizer = AutoSizer;
	var TextArea = function (_editor_1$BaseEditor) {
	    _inherits(TextArea, _editor_1$BaseEditor);
	
	    function TextArea(options) {
	        _classCallCheck(this, TextArea);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(TextArea).call(this, options));
	    }
	
	    _createClass(TextArea, [{
	        key: "render",
	        value: function render(o) {
	            _get(Object.getPrototypeOf(TextArea.prototype), "render", this).call(this, o);
	            var autoSize = this.el.getAttribute('autosize');
	            if (autoSize != null) {
	                if (this._autoSizer == null) {
	                    this._autoSizer = new AutoSizer(this.el);
	                    this.el.style.overflowX = 'hidden';
	                    this.el.style.wordWrap = 'break-word';
	                    this.el.rows = 1;
	                }
	            } else {
	                if (this._autoSizer) {
	                    this._autoSizer.destroy();
	                    this._autoSizer = void 0;
	                }
	            }
	            return this;
	        }
	    }, {
	        key: "setValue",
	        value: function setValue(value) {
	            this.el.value = value;
	            if (this._autoSizer) this._autoSizer.update();
	        }
	    }, {
	        key: "getValue",
	        value: function getValue() {
	            return this.el.value;
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            if (this._autoSizer) {
	                this._autoSizer.destroy();
	                this._autoSizer = void 0;
	            }
	        }
	    }]);
	
	    return TextArea;
	}(editor_1.BaseEditor);
	TextArea = __decorate([define_1.editor('textarea'), views_1.attributes({
	    events: {
	        keyup: function keyup() {
	            this._prev = this.getValue();
	            this.triggerMethod('change');
	        },
	        change: function change() {
	            if (this._prev !== this.getValue()) {
	                this._prev = this.getValue();
	                this.triggerMethod('change');
	            }
	        }
	    }
	}), __metadata('design:paramtypes', [Object])], TextArea);

/***/ }
/******/ ])
});
;
//# sourceMappingURL=views.form.js.map