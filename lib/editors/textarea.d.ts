export declare class AutoSizer {
    el: HTMLElement;
    private _state;
    constructor(el: HTMLElement);
    private _onPageResize();
    private _onChange();
    private _initInitialSize();
    private _changeOverflow(value);
    private _resize();
    update(): void;
    private _updateSize();
    destroy(): void;
}
