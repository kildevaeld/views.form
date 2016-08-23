import { View, RenderOptions, ViewOptions } from 'views';
import { Field, FieldOptions } from './field';
import { IModel } from 'collection';
import { ValidateErrors } from './validator';
export interface FormOptions extends ViewOptions {
    createHelpAreas?: boolean;
    validateOnChange?: boolean;
    fieldOptions?: {
        [key: string]: FieldOptions;
    };
}
export declare class Form extends View<HTMLFormElement> {
    private _fields;
    private _isRendered;
    _options: FormOptions;
    options: FormOptions;
    constructor(options?: FormOptions);
    fields: Field[];
    getFieldByName(name: string): Field;
    render(options?: RenderOptions): this;
    setModel(model: IModel): this;
    validate(): ValidateErrors[];
    private _setValue(model);
    private _renderFields();
    private _onModelValueChange(model);
    private _onFieldValueChanged(field, ...args);
    private _onFieldEventTriggered(event, field, ...args);
    destroy(): any;
}
