"use strict";
const utils_1 = require('./utils');
const orange_1 = require('orange');
const Debug = require('debug');
const debug = Debug('views:form:validator');
const validURL = require('valid-url');
function get_validations(el) {
    var required;
    let v = Object.keys(validators).map(e => {
        // The required validator is getting handled elsewhere
        if (e === 'required')
            return null;
        let i = el.getAttribute('validate-' + e);
        if (i != null)
            return [validators[e], i, messages[e] || "invalid", e];
        return null;
    }).filter(e => e !== null);
    return v;
}
function validate(form, editor, value, vals = []) {
    let el = editor.el;
    let v = get_validations(el), name = editor.name, //el.getAttribute('name'),
    errors = [];
    let required = el.getAttribute('required');
    if (required == null)
        required = el.getAttribute('validate-required');
    v = orange_1.unique(v.concat(vals));
    if (required != null) {
        debug("running 'required' validator on %s", name);
        if (!validators.required(name, form, value, null)) {
            debug("'required' validator failed on %s", name);
            return new ValidateErrors([new ValidateError(utils_1.template(messages.required, {
                    name: name,
                    label: name,
                    value: value,
                    arg: null
                }))]);
        }
    }
    else if (value == null || value == "") {
        // Do not run validations, when the value is empty
        return null;
    }
    for (let i = 0, ii = v.length; i < ii; i++) {
        debug("running '%s' validator on %s", v[i][3], name);
        if (!v[i][0](name, form, value, v[i][1])) {
            debug("'%s' validator failed on %s", v[i][3], name);
            let e = new ValidateError(utils_1.template(v[i][2], {
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
exports.validate = validate;
var messages;
(function (messages) {
    messages.required = "<b><% label %></b> is required";
    messages.min = "<b><% label %></b> needs to be minimum <% arg %>";
    messages.max = "<b><% label %></b> needs to be maximum <% arg %>";
    messages.email = "<b><% label %></b> is not an email";
    messages.url = "<b><% label %></b> is not an url";
    messages.match = "<b><% label %></b> does not match: <b><%arg%></b>";
})(messages || (messages = {}));
var validators;
(function (validators) {
    function required(name, form, value, arg) {
        return !(value == "" || value == null);
    }
    validators.required = required;
    function min(name, form, value, arg) {
        let min = parseInt(arg);
        // TODO: check in init
        if (isNaN(min))
            return;
        if (typeof value === 'string') {
            return value.length >= min;
        }
        else if (Array.isArray(value)) {
            return value.length >= min;
        }
        else {
            return parseInt(value) >= min;
        }
    }
    validators.min = min;
    function max(name, form, value, arg) {
        let max = parseInt(arg);
        // TODO: check in init
        if (isNaN(max))
            return;
        if (typeof value === 'string') {
            return value.length <= max;
        }
        else if (Array.isArray(value)) {
            return value.length <= max;
        }
        else {
            return parseInt(value) <= max;
        }
    }
    validators.max = max;
    function match(name, form, value, arg) {
        let field = form.getFieldByName(arg);
        if (!field) {
            throw new Error(`field: ${arg} does not exists`);
        }
        let oval = field.editor.value;
        return orange_1.equal(value, oval);
    }
    validators.match = match;
    function url(name, form, value, arg) {
        return validURL.isUri(value);
    }
    validators.url = url;
    const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    function email(name, form, value, arg) {
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
            if (domainParts.some(function (part) { return part.length > 63; }))
                return false;
            return true;
        }
    }
    validators.email = email;
})(validators = exports.validators || (exports.validators = {}));
function setMessage(validator, message) {
    messages[validator] = message;
}
exports.setMessage = setMessage;
function registerValidator(name, fn) {
    validators[name] = fn;
}
exports.registerValidator = registerValidator;
class ValidateError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.ValidateError = ValidateError;
class ValidateErrors extends Error {
    constructor(errors = []) {
        super();
        this.errors = errors;
    }
    get length() { return this.errors.length; }
}
exports.ValidateErrors = ValidateErrors;
