import { View, ViewOptions, IDataView } from 'views';
import { ValidateErrors } from './validator';
import { Form } from './form';
export interface IEditor extends IDataView {
    name: string;
    label?: string;
    value: any;
    clear(): any;
    validate(form: Form): ValidateErrors;
}
export interface IEditorOptions extends ViewOptions {
    [key: string]: any;
    form?: Form;
    name?: string;
    label?: string;
    defaultValue?: any;
}
export declare abstract class BaseEditor<E extends HTMLElement, V> extends View<E> implements IEditor {
    options: IEditorOptions;
    form: Form;
    protected _label: string;
    protected _name: string;
    readonly name: string;
    value: V;
    label: string;
    constructor(options?: IEditorOptions);
    clear(): void;
    validate(form: Form): ValidateErrors;
    protected abstract getValue(): V;
    protected abstract setValue(value: V): any;
}
export declare abstract class BaseLayoutEditor<E extends HTMLElement, V> extends View<E> implements IEditor {
    options: IEditorOptions;
    protected _label: any;
    readonly name: string;
    value: V;
    label: any;
    constructor(options?: IEditorOptions);
    clear(): void;
    validate(form: Form): ValidateErrors;
    protected abstract getValue(): V;
    protected abstract setValue(value: V): any;
}
export declare class Editor<E extends HTMLElement> extends BaseEditor<E, any> implements IEditor {
    private _prev;
    readonly name: string;
    protected setValue(value: any): void;
    protected getValue(): any;
    protected _onKeyPress(e: KeyboardEvent): void;
    protected _onChange(e: KeyboardEvent): void;
}
