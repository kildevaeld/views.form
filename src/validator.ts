declare const require: any;
import {template} from './utils';
import {Field} from './field';
import {Form} from './form';
import {IEditor} from './editor';
import {unique, equal} from 'orange';

const validURL = require('valid-url');

export interface Validator {
    (form: Form, value: any, arg: any);
}

function get_validations(el: HTMLElement) {
    var required;

    let v = Object.keys(validators).map(e => {
        // The required validator is getting handled elsewhere
        if (e === 'required') return null;
        let i = el.getAttribute('validate-' + e);
        if (i != null) return [validators[e], i, messages[e]||"invalid"];
        return null;
    }).filter(e => e !== null);
    
    return v;
}

export function validate(form: Form, editor: IEditor, value:any, vals:[Validator, string, string][] = []) {

    let el = editor.el;

    let v = get_validations(el),
        name = editor.name,//el.getAttribute('name'),
        required = el.getAttribute('required')||el.getAttribute('validate-required'),
        errors = [];

    v = unique(v.concat(vals));

    if (required != null) {
        if (!validators.required(name, form, value, null)) {
            return new ValidateErrors([new ValidateError(template(messages.required, {
                name: name,
                label: name,
                value: value,
                arg: null
            }))]);
        }
    } else if (value == null || value == "") {
        // Do not run validations, when the value is empty
        return null;
    }

    for (let i = 0, ii = v.length; i < ii; i++) {
        if (!v[i][0](name, form, value, v[i][1])) {
            let e = new ValidateError(template(v[i][2], {
                name: name,
                value: value,
                label: name,
                arg: v[i][1]
            }));
            errors.push(e);
        }
    }

    if (errors.length) {
        return new ValidateErrors(errors);
    }

    return null;
}

module messages {
    export const required = "<b><% label %></b> is required";
    export const min = "<b><% label %></b> needs to be minimum <% arg %>";
    export const max = "<b><% label %></b> needs to be maximum <% arg %>"
    export const email = "<b><% label %></b> is not an email";
    export const url = "<b><% label %></b> is not an url";
    export const match = "<b><% label %></b> does not match: <b><%arg%></b>"
}

export module validators {
    export function required(name: string, form: Form, value: any, arg: any) {
        return !(value == "" || value == null)
    }

    export function min(name: string, form: Form, value: any, arg: any) {

        let min = parseInt(arg);
        // TODO: check in init
        if (isNaN(min)) return;

        if (typeof value === 'string') {
            return value.length >= min;
        } else if (Array.isArray(value)) {
            return value.length >= min;
        } else  {
            return parseInt(value) >= min;
        }
    }

    export function max(name: string, form: Form, value: any, arg: any) {
         let max = parseInt(arg);
        // TODO: check in init
        if (isNaN(max)) return;

        if (typeof value === 'string') {
            return value.length <= max;
        } else if (Array.isArray(value)) {
            return value.length <= max;
        } else  {
            return parseInt(value) <= max;
        }   
    }

    export function match(name: string, form: Form, value: any, arg: any) {

        let field = form.getFieldByName(arg);

        if (!field) {
            throw new Error(`field: ${arg} does not exists`);
        }

        let oval = field.editor.value;

        return equal(value, oval);

    }

    export function url(name: string, form: Form, value: any, arg: any) {
        return validURL.isUri(value);
    }

    const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    export function email(name: string, form: Form, value: any, arg: any) {

        return validate_email(value);


        // Thanks to:
        // http://fightingforalostcause.net/misc/2006/compare-email-regex.php
        // http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
        // http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
        function validate_email(email) {
            if (!email)
                return false;

            if (email.length > 254)
                return false;

            var valid = tester.test(email);
            if (!valid)
                return false;

            // Further checking of some things regex can't handle
            var parts = email.split("@");
            if (parts[0].length > 64)
                return false;

            var domainParts = parts[1].split(".");
            if (domainParts.some(function(part) { return part.length > 63; }))
                return false;

            return true;
        }

    }
}

export function setMessage(validator: string, message: string) {
    messages[validator] = message;
}

export function registerValidator(name: string, fn: (name: string, form: Form, value: any, arg: any) => boolean) {
    validators[name] = fn;
}

export class ValidateError extends Error {
    message: string;
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}

export class ValidateErrors extends Error {
    errors: ValidateError[];
    get length () { return this.errors.length }
    constructor(errors: ValidateError[] = []) {
        super();
        this.errors = errors;
    }
}