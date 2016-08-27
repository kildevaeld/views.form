import { View, ViewOptions, RenderOptions } from 'views';
import { Form } from './form';
import { IEditor, IEditorOptions } from './editor';
import { ValidateErrors } from './validator';
export interface FieldOptions extends ViewOptions {
    editor?: HTMLElement;
    form: Form;
    name?: string;
    editorOptions?: IEditorOptions;
    createHelpArea?: boolean;
}
export declare class Field extends View<HTMLDivElement> implements IEditor {
    static createField(el: HTMLDivElement, options?: FieldOptions): Field;
    private _form;
    private _editor;
    _options: FieldOptions;
    name: string;
    label: string;
    value: any;
    clear(): void;
    editor: IEditor;
    constructor(options?: FieldOptions);
    render(options?: RenderOptions): this;
    createHelpArea(): void;
    validate(): ValidateErrors;
    protected _onEditorChange(): void;
}
