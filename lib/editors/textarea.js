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
var orange_1 = require("orange");
var orange_dom_1 = require("orange.dom");
var editor_1 = require("../editor");
var define_1 = require("../define");
var views_1 = require("views");
/**
 * Autosize a textarea on input
 */

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

    function TextArea() {
        _classCallCheck(this, TextArea);

        return _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).apply(this, arguments));
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
}), __metadata("design:paramtypes", [])], TextArea);