import { View, ViewOptions, IDataView } from 'views';
import { ValidateErrors } from './validator';
import { Form } from './form';
export interface IEditor extends IDataView {
    name: string;
    value: any;
    clear(): any;
    validate(form: Form): ValidateErrors;
}
export interface IEditorOptions extends ViewOptions {
}
export declare abstract class BaseEditor<E extends HTMLElement, V> extends View<E> implements IEditor {
    form: Form;
    name: string;
    value: V;
    abstract clear(): any;
    validate(form: Form): ValidateErrors;
    protected abstract getValue(): V;
    protected abstract setValue(value: V): any;
}
export declare class Editor<E extends HTMLElement> extends BaseEditor<E, any> implements IEditor {
    private _prev;
    name: string;
    protected setValue(value: any): void;
    protected getValue(): any;
    clear(): void;
    protected _onKeyPress(e: KeyboardEvent): void;
    protected _onChange(e: KeyboardEvent): void;
}
