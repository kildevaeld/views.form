import { View, RenderOptions } from 'views';
import { IEditor, IEditorOptions } from './editor';
import { ValidateErrors } from './validator';
export interface FieldOptions extends IEditorOptions {
    editor?: HTMLElement;
    label?: string;
    createHelpArea?: boolean;
}
export declare class Field extends View<HTMLDivElement> implements IEditor {
    static createField(el: HTMLDivElement, options?: FieldOptions): Field;
    private _form;
    private _editor;
    private _label;
    _options: FieldOptions;
    readonly name: string;
    readonly label: string;
    value: any;
    clear(): void;
    editor: IEditor;
    constructor(options?: FieldOptions);
    render(options?: RenderOptions): this;
    createHelpArea(): void;
    validate(): ValidateErrors;
    protected _onEditorChange(): void;
}
