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
	var define_1 = __webpack_require__(16);
	exports.editor = define_1.editor;
	var editor_1 = __webpack_require__(8);
	exports.BaseEditor = editor_1.BaseEditor;
	exports.BaseLayoutEditor = editor_1.BaseLayoutEditor;
	var field_1 = __webpack_require__(3);
	exports.Field = field_1.Field;
	__export(__webpack_require__(10));
	__webpack_require__(17);

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
	var orange_1 = __webpack_require__(4);
	var Debug = __webpack_require__(11);
	var debug = Debug('views:form');
	var Form = function (_views_1$View) {
	    _inherits(Form, _views_1$View);
	
	    function Form(options) {
	        _classCallCheck(this, Form);
	
	        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, options));
	
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
	            _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), "setModel", this).call(this, model);
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
	            return _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), "destroy", this).call(this);
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
	var orange_dom_1 = __webpack_require__(5);
	var editor_1 = __webpack_require__(8);
	var define_1 = __webpack_require__(16);
	var Debug = __webpack_require__(11);
	var debug = Debug('views:form:field');
	var Field_1 = void 0;
	var Field = Field_1 = function (_views_1$View) {
	    _inherits(Field, _views_1$View);
	
	    function Field(options) {
	        _classCallCheck(this, Field);
	
	        if (options == null) throw new Error('field options required');
	        if (options.form == null) throw new Error('form required');
	
	        var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, options));
	
	        _this._options = options;
	        _this._form = options.form;
	        return _this;
	    }
	
	    _createClass(Field, [{
	        key: "clear",
	        value: function clear() {
	            if (this.editor) this.editor.clear();
	            orange_dom_1.removeClass(this.el, 'has-success has-error');
	            orange_dom_1.Html.query('.form-field-helparea').html('');
	        }
	    }, {
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
	                var name = el.getAttribute('name');
	                if (editorType) {
	                    var editor = define_1.getEditor(editorType, o);
	                    if (editor) {
	                        debug('%s: found custom editor type: %s', name, editorType);
	                        this.editor = editor;
	                    }
	                }
	                if (this.editor == null) {
	                    var _editor = define_1.getEditor(el.nodeName.toLowerCase(), o);
	                    if (_editor) {
	                        debug('%s: found custom editor type from tag: %s', name, el.nodeName.toLowerCase());
	                        this.editor = _editor;
	                    } else {
	                        this.editor = new editor_1.Editor(o);
	                    }
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
	            debug('%s: creating help area', this.name);
	            this.triggerMethod('before:helparea');
	            helpArea = orange_dom_1.createElement("div", {
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
	            var el = orange_dom_1.Html.query(this.el);
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
	        key: "value",
	        get: function get() {
	            if (this.editor) return this.editor.value;
	            return null;
	        },
	        set: function set(value) {
	            if (this.editor) this.editor.value = value;
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
	
	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// TODO: CreateHTML
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var orange_1 = __webpack_require__(4);
	var ElementProto = typeof Element !== 'undefined' && Element.prototype || {};
	var matchesSelector = ElementProto.matches || ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector || ElementProto.oMatchesSelector || function (selector) {
	    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
	    return !!~orange_1.indexOf(nodeList, this);
	};
	var elementAddEventListener = ElementProto.addEventListener || function (eventName, listener) {
	    return this.attachEvent('on' + eventName, listener);
	};
	var elementRemoveEventListener = ElementProto.removeEventListener || function (eventName, listener) {
	    return this.detachEvent('on' + eventName, listener);
	};
	var transitionEndEvent = function transitionEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitTransition': 'webkitTransitionEnd',
	        'MozTransition': 'transitionend',
	        'OTransition': 'oTransitionEnd otransitionend',
	        'transition': 'transitionend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null;
	};
	var animationEndEvent = function animationEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitAnimation': 'webkitAnimationEnd',
	        'MozAnimation': 'animationend',
	        'OAnimation': 'oAnimationEnd oanimationend',
	        'animation': 'animationend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null;
	};
	function matches(elm, selector) {
	    return matchesSelector.call(elm, selector);
	}
	exports.matches = matches;
	function addEventListener(elm, eventName, listener) {
	    var useCap = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	    elementAddEventListener.call(elm, eventName, listener, useCap);
	}
	exports.addEventListener = addEventListener;
	function removeEventListener(elm, eventName, listener) {
	    elementRemoveEventListener.call(elm, eventName, listener);
	}
	exports.removeEventListener = removeEventListener;
	var unbubblebles = 'focus blur change load error'.split(' ');
	var domEvents = [];
	function delegate(elm, selector, eventName, callback, ctx) {
	    var root = elm;
	    var handler = function handler(e) {
	        var node = e.target || e.srcElement;
	        // Already handled
	        if (e.delegateTarget) return;
	        for (; node && node != root; node = node.parentNode) {
	            if (matches(node, selector)) {
	                e.delegateTarget = node;
	                callback(e);
	            }
	        }
	    };
	    var useCap = !!~unbubblebles.indexOf(eventName);
	    addEventListener(elm, eventName, handler, useCap);
	    domEvents.push({ eventName: eventName, handler: handler, listener: callback, selector: selector });
	    return handler;
	}
	exports.delegate = delegate;
	function undelegate(elm, selector, eventName, callback) {
	    /*if (typeof selector === 'function') {
	        listener = <Function>selector;
	        selector = null;
	      }*/
	    var handlers = domEvents.slice();
	    for (var i = 0, len = handlers.length; i < len; i++) {
	        var item = handlers[i];
	        var match = item.eventName === eventName && (callback ? item.listener === callback : true) && (selector ? item.selector === selector : true);
	        if (!match) continue;
	        removeEventListener(elm, item.eventName, item.handler);
	        domEvents.splice(orange_1.indexOf(handlers, item), 1);
	    }
	}
	exports.undelegate = undelegate;
	function addClass(elm, className) {
	    if (elm.classList) {
	        var split = className.split(' ');
	        for (var i = 0, ii = split.length; i < ii; i++) {
	            if (elm.classList.contains(split[i].trim())) continue;
	            elm.classList.add(split[i].trim());
	        }
	    } else {
	        elm.className = orange_1.unique(elm.className.split(' ').concat(className.split(' '))).join(' ');
	    }
	}
	exports.addClass = addClass;
	function removeClass(elm, className) {
	    if (elm.classList) {
	        var split = className.split(' ');
	        for (var i = 0, ii = split.length; i < ii; i++) {
	            elm.classList.remove(split[i].trim());
	        }
	    } else {
	        var _split = elm.className.split(' '),
	            classNames = className.split(' '),
	            tmp = _split,
	            index = void 0;
	        for (var _i = 0, _ii = classNames.length; _i < _ii; _i++) {
	            index = _split.indexOf(classNames[_i]);
	            if (!!~index) _split = _split.splice(index, 1);
	        }
	    }
	}
	exports.removeClass = removeClass;
	function hasClass(elm, className) {
	    if (elm.classList) {
	        return elm.classList.contains(className);
	    }
	    var reg = new RegExp('\b' + className);
	    return reg.test(elm.className);
	}
	exports.hasClass = hasClass;
	function selectionStart(elm) {
	    if ('selectionStart' in elm) {
	        // Standard-compliant browsers
	        return elm.selectionStart;
	    } else if (document.selection) {
	        // IE
	        elm.focus();
	        var sel = document.selection.createRange();
	        var selLen = document.selection.createRange().text.length;
	        sel.moveStart('character', -elm.value.length);
	        return sel.text.length - selLen;
	    }
	}
	exports.selectionStart = selectionStart;
	var _events = {
	    animationEnd: null,
	    transitionEnd: null
	};
	function transitionEnd(elm, fn, ctx, duration) {
	    var event = _events.transitionEnd || (_events.transitionEnd = transitionEndEvent());
	    var callback = function callback(e) {
	        removeEventListener(elm, event, callback);
	        fn.call(ctx, e);
	    };
	    addEventListener(elm, event, callback);
	}
	exports.transitionEnd = transitionEnd;
	function animationEnd(elm, fn, ctx, duration) {
	    var event = _events.animationEnd || (_events.animationEnd = animationEndEvent());
	    var callback = function callback(e) {
	        removeEventListener(elm, event, callback);
	        fn.call(ctx, e);
	    };
	    addEventListener(elm, event, callback);
	}
	exports.animationEnd = animationEnd;
	exports.domReady = function () {
	    var fns = [],
	        _listener,
	        doc = document,
	        hack = doc.documentElement.doScroll,
	        domContentLoaded = 'DOMContentLoaded',
	        loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);
	    if (!loaded) {
	        doc.addEventListener(domContentLoaded, _listener = function listener() {
	            doc.removeEventListener(domContentLoaded, _listener);
	            loaded = true;
	            while (_listener = fns.shift()) {
	                _listener();
	            }
	        });
	    }
	    return function (fn) {
	        loaded ? setTimeout(fn, 0) : fns.push(fn);
	    };
	}();
	function createElement(tag, attr) {
	    var elm = document.createElement(tag);
	    if (attr) {
	        for (var key in attr) {
	            elm.setAttribute(key, attr[key]);
	        }
	    }
	    return elm;
	}
	exports.createElement = createElement;
	
	var LoadedImage = function () {
	    function LoadedImage(img) {
	        _classCallCheck(this, LoadedImage);
	
	        this.img = img;
	    }
	
	    _createClass(LoadedImage, [{
	        key: 'check',
	        value: function check(fn) {
	            this.fn = fn;
	            var isComplete = this.getIsImageComplete();
	            if (isComplete) {
	                // report based on naturalWidth
	                this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
	                return;
	            }
	            this.img.addEventListener('load', this);
	            this.img.addEventListener('error', this);
	        }
	    }, {
	        key: 'confirm',
	        value: function confirm(loaded, msg, err) {
	            this.isLoaded = loaded;
	            if (this.fn) this.fn(err);
	        }
	    }, {
	        key: 'getIsImageComplete',
	        value: function getIsImageComplete() {
	            return this.img.complete && this.img.naturalWidth !== undefined && this.img.naturalWidth !== 0;
	        }
	    }, {
	        key: 'handleEvent',
	        value: function handleEvent(e) {
	            var method = 'on' + event.type;
	            if (this[method]) {
	                this[method](event);
	            }
	        }
	    }, {
	        key: 'onload',
	        value: function onload(e) {
	            this.confirm(true, 'onload');
	            this.unbindEvents();
	        }
	    }, {
	        key: 'onerror',
	        value: function onerror(e) {
	            this.confirm(false, 'onerror', new Error(e.error));
	            this.unbindEvents();
	        }
	    }, {
	        key: 'unbindEvents',
	        value: function unbindEvents() {
	            this.img.removeEventListener('load', this);
	            this.img.removeEventListener('error', this);
	            this.fn = void 0;
	        }
	    }]);
	
	    return LoadedImage;
	}();
	
	function imageLoaded(img) {
	    return new orange_1.Promise(function (resolve, reject) {
	        var i = new LoadedImage(img);
	        i.check(function (err) {
	            if (err) return reject(err);
	            resolve(i.isLoaded);
	        });
	    });
	}
	exports.imageLoaded = imageLoaded;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var orange_1 = __webpack_require__(4);
	var dom = __webpack_require__(6);
	var domEvents;
	var singleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
	function parseHTML(html) {
	    var parsed = singleTag.exec(html);
	    if (parsed) {
	        return document.createElement(parsed[0]);
	    }
	    var div = document.createElement('div');
	    div.innerHTML = html;
	    var element = div.firstChild;
	    return element;
	}
	
	var Html = function () {
	    function Html(el) {
	        _classCallCheck(this, Html);
	
	        if (!Array.isArray(el)) el = [el];
	        this._elements = el || [];
	    }
	
	    _createClass(Html, [{
	        key: 'get',
	        value: function get(n) {
	            n = n === undefined ? 0 : n;
	            return n >= this.length ? undefined : this._elements[n];
	        }
	    }, {
	        key: 'addClass',
	        value: function addClass(str) {
	            return this.forEach(function (e) {
	                dom.addClass(e, str);
	            });
	        }
	    }, {
	        key: 'removeClass',
	        value: function removeClass(str) {
	            return this.forEach(function (e) {
	                dom.removeClass(e, str);
	            });
	        }
	    }, {
	        key: 'hasClass',
	        value: function hasClass(str) {
	            return this._elements.reduce(function (p, c) {
	                return dom.hasClass(c, str);
	            }, false);
	        }
	    }, {
	        key: 'attr',
	        value: function attr(key, value) {
	            var attr = void 0;
	            if (typeof key === 'string' && value) {
	                attr = _defineProperty({}, key, value);
	            } else if (typeof key == 'string') {
	                if (this.length) return this.get(0).getAttribute(key);
	            } else if (orange_1.isObject(key)) {
	                attr = key;
	            }
	            return this.forEach(function (e) {
	                for (var k in attr) {
	                    e.setAttribute(k, attr[k]);
	                }
	            });
	        }
	    }, {
	        key: 'text',
	        value: function text(str) {
	            if (arguments.length === 0) {
	                return this.length > 0 ? this.get(0).textContent : null;
	            }
	            return this.forEach(function (e) {
	                return e.textContent = str;
	            });
	        }
	    }, {
	        key: 'html',
	        value: function html(_html) {
	            if (arguments.length === 0) {
	                return this.length > 0 ? this.get(0).innerHTML : null;
	            }
	            return this.forEach(function (e) {
	                return e.innerHTML = _html;
	            });
	        }
	    }, {
	        key: 'css',
	        value: function css(attr, value) {
	            if (arguments.length === 2) {
	                return this.forEach(function (e) {
	                    if (attr in e.style) e.style[attr] = String(value);
	                });
	            } else {
	                return this.forEach(function (e) {
	                    for (var k in attr) {
	                        if (k in e.style) e.style[k] = String(attr[k]);
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'parent',
	        value: function parent() {
	            var out = [];
	            this.forEach(function (e) {
	                if (e.parentElement) {
	                    out.push(e.parentElement);
	                }
	            });
	            return new Html(out);
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            return this.forEach(function (e) {
	                if (e.parentElement) e.parentElement.removeChild(e);
	            });
	        }
	    }, {
	        key: 'clone',
	        value: function clone() {
	            return new Html(this.map(function (m) {
	                return m.cloneNode();
	            }));
	        }
	    }, {
	        key: 'find',
	        value: function find(str) {
	            var out = [];
	            this.forEach(function (e) {
	                out = out.concat(orange_1.slice(e.querySelectorAll(str)));
	            });
	            return new Html(out);
	        }
	    }, {
	        key: 'map',
	        value: function map(fn) {
	            var out = new Array(this.length);
	            this.forEach(function (e, i) {
	                out[i] = fn(e, i);
	            });
	            return out;
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach(fn) {
	            this._elements.forEach(fn);
	            return this;
	        }
	    }, {
	        key: 'length',
	        get: function get() {
	            return this._elements.length;
	        }
	    }], [{
	        key: 'query',
	        value: function query(_query, context) {
	            if (typeof context === 'string') {
	                context = document.querySelectorAll(context);
	            }
	            var html = void 0;
	            var els = void 0;
	            if (typeof _query === 'string') {
	                if (_query.length > 0 && _query[0] === '<' && _query[_query.length - 1] === ">" && _query.length >= 3) {
	                    return new Html([parseHTML(_query)]);
	                }
	                if (context) {
	                    if (context instanceof HTMLElement) {
	                        els = orange_1.slice(context.querySelectorAll(_query));
	                    } else {
	                        html = new Html(orange_1.slice(context));
	                        return html.find(_query);
	                    }
	                } else {
	                    els = orange_1.slice(document.querySelectorAll(_query));
	                }
	            } else if (_query && _query instanceof Element) {
	                els = [_query];
	            } else if (_query && _query instanceof NodeList) {
	                els = orange_1.slice(_query);
	            }
	            return new Html(els);
	        }
	    }]);
	
	    return Html;
	}();
	
	exports.Html = Html;

/***/ },
/* 8 */
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
	var utils_1 = __webpack_require__(9);
	var validator_1 = __webpack_require__(10);
	var orange_1 = __webpack_require__(4);
	
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

/***/ },
/* 9 */
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
	            if (node.type && node.type.toLowerCase() === 'number') {
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var utils_1 = __webpack_require__(9);
	var orange_1 = __webpack_require__(4);
	var Debug = __webpack_require__(11);
	var debug = Debug('views:form:validator');
	var validURL = __webpack_require__(14);
	function get_validations(el) {
	    var required;
	    var v = Object.keys(validators).map(function (e) {
	        // The required validator is getting handled elsewhere
	        if (e === 'required') return null;
	        var i = el.getAttribute('validate-' + e);
	        if (i != null) return [validators[e], i, messages[e] || "invalid", e];
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
	    errors = [];
	    var required = el.getAttribute('required');
	    if (required == null) required = el.getAttribute('validate-required');
	    v = orange_1.unique(v.concat(vals));
	    if (required != null) {
	        debug("running 'required' validator on %s", name);
	        if (!validators.required(name, form, value, null)) {
	            debug("'required' validator failed on %s", name);
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
	        debug("running '%s' validator on %s", v[i][3], name);
	        if (!v[i][0](name, form, value, v[i][1])) {
	            debug("'%s' validator failed on %s", v[i][3], name);
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
	
	        var _this = _possibleConstructorReturn(this, (ValidateError.__proto__ || Object.getPrototypeOf(ValidateError)).call(this, message));
	
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
	
	        var _this2 = _possibleConstructorReturn(this, (ValidateErrors.__proto__ || Object.getPrototypeOf(ValidateErrors)).call(this));
	
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(12);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(13);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 14 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Debug = __webpack_require__(11);
	var debug = Debug('views:form');
	var _editors = {};
	function editor(name) {
	    return function (target) {
	        debug('register editor: %s', name);
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
/* 17 */
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
	var orange_1 = __webpack_require__(4);
	var orange_dom_1 = __webpack_require__(5);
	var editor_1 = __webpack_require__(8);
	var define_1 = __webpack_require__(16);
	var views_1 = __webpack_require__(2);
	
	var AutoSizer = function () {
	    function AutoSizer(el) {
	        _classCallCheck(this, AutoSizer);
	
	        this.el = el;
	        this._onChange = orange_1.bind(this._onChange, this);
	        this._onPageResize = orange_1.bind(this._onPageResize, this);
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
	            orange_dom_1.addEventListener(this.el, 'keyup', this._onChange);
	            orange_dom_1.addEventListener(this.el, 'input', this._onChange);
	            orange_dom_1.addEventListener(window, 'resize', this._onPageResize);
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
	            orange_dom_1.removeEventListener(this.el, 'keyup', this._onChange);
	            orange_dom_1.removeEventListener(this.el, 'input', this._onChange);
	            orange_dom_1.removeEventListener(window, 'resize', this._onPageResize);
	        }
	    }]);
	
	    return AutoSizer;
	}();
	
	exports.AutoSizer = AutoSizer;
	var TextArea = function (_editor_1$BaseEditor) {
	    _inherits(TextArea, _editor_1$BaseEditor);
	
	    function TextArea(options) {
	        _classCallCheck(this, TextArea);
	
	        return _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, options));
	    }
	
	    _createClass(TextArea, [{
	        key: "render",
	        value: function render(o) {
	            _get(TextArea.prototype.__proto__ || Object.getPrototypeOf(TextArea.prototype), "render", this).call(this, o);
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