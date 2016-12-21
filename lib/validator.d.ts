import { Form } from './form';
import { IEditor } from './editor';
export interface Validator {
    (form: Form, value: any, arg: any): any;
}
export declare type ValidatorDef = [Validator, string, string, string];
export declare function validate(form: Form, editor: IEditor, value: any, vals?: ValidatorDef[]): ValidateErrors;
export declare module validators {
    function required(name: string, form: Form, value: any, arg: any): boolean;
    function min(name: string, form: Form, value: any, arg: any): boolean;
    function max(name: string, form: Form, value: any, arg: any): boolean;
    function match(name: string, form: Form, value: any, arg: any): boolean;
    function url(name: string, form: Form, value: any, arg: any): any;
    function email(name: string, form: Form, value: any, arg: any): boolean;
}
export declare function setMessage(validator: string, message: string): void;
export declare function registerValidator(name: string, fn: (name: string, form: Form, value: any, arg: any) => boolean, message?: string): void;
export declare class ValidateError extends Error {
    message: string;
    constructor(message: string);
}
export declare class ValidateErrors extends Error {
    errors: ValidateError[];
    readonly length: number;
    constructor(errors?: ValidateError[]);
}
