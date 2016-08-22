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
const orange = require('orange');
const editor_1 = require('../editor');
const define_1 = require('../define');
const views_1 = require('views');
class AutoSizer {
    constructor(el) {
        this.el = el;
        this._onChange = orange.bind(this._onChange, this);
        this._onPageResize = orange.bind(this._onPageResize, this);
        this._initInitialSize();
    }
    _onPageResize() {
        if (this.el.clientWidth !== this._state.clientWidth) {
            this._updateSize();
        }
    }
    _onChange() {
        this._updateSize();
    }
    _initInitialSize() {
        const style = window.getComputedStyle(this.el, null);
        let heightOffset;
        if (style.resize === 'vertical') {
            this.el.style.resize = 'none';
        }
        else if (style.resize === 'both') {
            this.el.style.resize = 'horizontal';
        }
        if (style.boxSizing === 'content-box') {
            heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
        }
        else {
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
    _changeOverflow(value) {
        {
            // Chrome/Safari-specific fix:
            // When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
            // made available by removing the scrollbar. The following forces the necessary text reflow.
            const width = this.el.style.width;
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
    _resize() {
        const htmlTop = window.pageYOffset;
        const bodyTop = document.body.scrollTop;
        const originalHeight = this.el.style.height;
        this.el.style.height = 'auto';
        let endHeight = this.el.scrollHeight + this._state.heightOffset;
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
    update() {
        this._updateSize();
    }
    _updateSize() {
        const startHeight = this.el.style.height;
        this._resize();
        const style = window.getComputedStyle(this.el, null);
        if (style.height !== this.el.style.height) {
            if (this._state.overflowY !== 'visible') {
                this._changeOverflow('visible');
            }
        }
        else {
            if (this._state.overflowY !== 'hidden') {
                this._changeOverflow('hidden');
            }
        }
        if (startHeight !== this.el.style.height) {
        }
    }
    destroy() {
        orange.removeEventListener(this.el, 'keyup', this._onChange);
        orange.removeEventListener(this.el, 'input', this._onChange);
        orange.removeEventListener(window, 'resize', this._onPageResize);
    }
}
exports.AutoSizer = AutoSizer;
let TextArea = class TextArea extends editor_1.BaseEditor {
    constructor(options) {
        super(options);
    }
    render(o) {
        super.render(o);
        let autoSize = this.el.getAttribute('autosize');
        if (autoSize != null) {
            if (this._autoSizer == null) {
                this._autoSizer = new AutoSizer(this.el);
                this.el.style.overflowX = 'hidden';
                this.el.style.wordWrap = 'break-word';
                this.el.rows = 1;
            }
        }
        else {
            if (this._autoSizer) {
                this._autoSizer.destroy();
                this._autoSizer = void 0;
            }
        }
        return this;
    }
    setValue(value) {
        this.el.value = value;
        if (this._autoSizer)
            this._autoSizer.update();
    }
    getValue() {
        return this.el.value;
    }
    clear() {
        this.el.textContent = "";
    }
    destroy() {
        if (this._autoSizer) {
            this._autoSizer.destroy();
            this._autoSizer = void 0;
        }
    }
};
TextArea = __decorate([
    define_1.editor('textarea'),
    views_1.attributes({
        events: {
            keyup: function () {
                this._prev = this.getValue();
                this.triggerMethod('change');
            },
            change: function () {
                if (this._prev !== this.getValue()) {
                    this._prev = this.getValue();
                    this.triggerMethod('change');
                }
            }
        }
    }), 
    __metadata('design:paramtypes', [Object])
], TextArea);
