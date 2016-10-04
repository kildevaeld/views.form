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
var orange_1 = require('orange');
var orange_dom_1 = require('orange.dom');
var editor_1 = require('./editor');
var define_1 = require('./define');
var Debug = require('debug');
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
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (!options.silent) this.triggerMethod('before:render');
            this.undelegateEvents();
            this.renderTemplate(this.getTemplateData());
            if (!this._editor) {
                var el = this.el.querySelector('[name]');
                if (!el) {
                    throw new Error('no editor or no input with name attribute');
                }
                var editorType = el.getAttribute('form-editor');
                var o = orange_1.extend({}, this._options || {}, {
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