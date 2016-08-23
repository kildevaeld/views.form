import * as orange from 'orange';
import {BaseEditor, IEditorOptions} from '../editor';
import {editor} from '../define';
import {attributes} from 'views';

export class AutoSizer {
    private _state: {
        overflowY: string;
        heightOffset: number;
        clientWidth: number;
    }

    constructor(public el: HTMLElement) {
        this._onChange = orange.bind(this._onChange, this);
        this._onPageResize = orange.bind(this._onPageResize, this);
        this._initInitialSize();
    }

    private _onPageResize() {
        if (this.el.clientWidth !== this._state.clientWidth) {
            this._updateSize();
        }
    }

    private _onChange() {
        this._updateSize();
    }

    private _initInitialSize() {
        const style = window.getComputedStyle(this.el, null);

        let heightOffset: number;


        if ((<any>style).resize === 'vertical') {
            (<any>this.el).style.resize = 'none';
        } else if ((<any>style).resize === 'both') {
            (<any>this.el).style.resize = 'horizontal';
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
        orange.addEventListener(<any>window, 'resize', this._onPageResize);

        this._updateSize();

    }

    private _changeOverflow(value: string) {
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

    private _resize() {
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

    update () {
        this._updateSize();
    }

    private _updateSize() {
        const startHeight = this.el.style.height;

        this._resize();

        const style = window.getComputedStyle(this.el, null);

        if (style.height !== this.el.style.height) {
            if (this._state.overflowY !== 'visible') {
                this._changeOverflow('visible');
            }
        } else {
            if (this._state.overflowY !== 'hidden') {
                this._changeOverflow('hidden');
            }
        }

        if (startHeight !== this.el.style.height) {
            //const evt = createEvent('autosize:resized');
            //ta.dispatchEvent(evt);
        }
    }

    destroy() {
        orange.removeEventListener(this.el, 'keyup', this._onChange);
        orange.removeEventListener(this.el, 'input', this._onChange);
        orange.removeEventListener(<any>window, 'resize', this._onPageResize);
    }
}

@editor('textarea')
@attributes({
    events: {
        keyup: function () {
            this._prev = this.getValue()
            this.triggerMethod('change');
        },
        change: function () {
            if (this._prev !== this.getValue()) {
                this._prev = this.getValue();
                this.triggerMethod('change');
            }
        }
    }
})
class TextArea extends BaseEditor<HTMLTextAreaElement, string> {
    private _prev:string;
    private _autoSizer: AutoSizer;
    private _overflowY: string;
    private _state: {
        overflowY: string;
        heightOffset: number;
        clientWidth: number;
    }

    constructor(options:IEditorOptions) {
        super(options);

    }

    render(o?) {
        super.render(o);

        let autoSize = this.el.getAttribute('autosize');
        
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

    protected setValue(value:string) {
        this.el.value = value;
        if (this._autoSizer) this._autoSizer.update();
    }

    protected getValue(): string {
        return this.el.value;
    }

    destroy() {
        if (this._autoSizer) {
            this._autoSizer.destroy();
            this._autoSizer = void 0;
        }
    }
    
}