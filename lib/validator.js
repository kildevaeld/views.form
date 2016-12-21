"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var utils_1 = require("./utils");
var orange_1 = require("orange");
var Debug = require("debug");
var debug = Debug('views:form:validator');
var validURL = require('valid-url');
function get_validations(el) {
    var required;
    var v = Object.keys(validators).map(function (e) {
        // The required validator is getting handled elsewhere
        if (e === 'required') return null;
        var i = el.getAttribute('validate-' + e);
        if (i == null) el.getAttribute(e);
        if (i != null) return [validators[e], i, messages[e] || "invalid", e];
        return null;
    }).filter(function (e) {
        return e !== null;
    });
    return v;
}
function validate(form, editor, value) {
    var vals = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    var el = editor.el;
    var v = get_validations(el),
        name = editor.name,
        //el.getAttribute('name'),
    errors = [];
    var required = el.getAttribute('required');
    if (required == null) required = el.getAttribute('validate-required');
    v = orange_1.unique(v.concat(vals));
    if (required != null) {
        debug("running 'required' validator on %s", name);
        if (!validators.required(name, form, value, null)) {
            debug("'required' validator failed on %s", name);
            return new ValidateErrors([new ValidateError(utils_1.template(messages.required, {
                name: name,
                label: editor.label,
                value: value,
                arg: null
            }))]);
        }
    } else if (value === null || value === "" || value === undefined) {
        // Do not run validations, when the value is empty
        return null;
    }
    for (var i = 0, ii = v.length; i < ii; i++) {
        debug("running '%s' validator on %s", v[i][3], name);
        if (!v[i][0](name, form, value, v[i][1])) {
            debug("'%s' validator failed on %s", v[i][3], name);
            var e = new ValidateError(utils_1.template(v[i][2], {
                name: name,
                value: value,
                label: editor.label,
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
    messages.min = "<b><% label %></b> must be at least <% arg %>";
    messages.max = "<b><% label %></b> must be a maximum of <% arg %>";
    messages.email = "<b><% label %></b> is not an email";
    messages.url = "<b><% label %></b> is not an url";
    messages.match = "<b><% label %></b> does not match: <b><%arg%></b>";
})(messages || (messages = {}));
var validators;
(function (validators) {
    function required(name, form, value, arg) {
        return !(value === "" || value === null || value === undefined);
    }
    validators.required = required;
    function min(name, form, value, arg) {
        var min = parseInt(arg);
        // TODO: check in init
        if (isNaN(min)) return;
        if (typeof value === 'string') {
            return value.length >= min;
        } else if (Array.isArray(value)) {
            return value.length >= min;
        } else {
            return parseInt(value) >= min;
        }
    }
    validators.min = min;
    function max(name, form, value, arg) {
        var max = parseInt(arg);
        // TODO: check in init
        if (isNaN(max)) return;
        if (typeof value === 'string') {
            return value.length <= max;
        } else if (Array.isArray(value)) {
            return value.length <= max;
        } else {
            return parseInt(value) <= max;
        }
    }
    validators.max = max;
    function match(name, form, value, arg) {
        var field = form.getFieldByName(arg);
        if (!field) {
            throw new Error("field: " + arg + " does not exists");
        }
        var oval = field.editor.value;
        return orange_1.equal(value, oval);
    }
    validators.match = match;
    function url(name, form, value, arg) {
        return validURL.isUri(value);
    }
    validators.url = url;
    var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    function email(name, form, value, arg) {
        return validate_email(value);
        // Thanks to:
        // http://fightingforalostcause.net/misc/2006/compare-email-regex.php
        // http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
        // http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
        function validate_email(email) {
            if (!email) return false;
            if (email.length > 254) return false;
            var valid = tester.test(email);
            if (!valid) return false;
            // Further checking of some things regex can't handle
            var parts = email.split("@");
            if (parts[0].length > 64) return false;
            var domainParts = parts[1].split(".");
            if (domainParts.some(function (part) {
                return part.length > 63;
            })) return false;
            return true;
        }
    }
    validators.email = email;
})(validators = exports.validators || (exports.validators = {}));
function setMessage(validator, message) {
    messages[validator] = message;
}
exports.setMessage = setMessage;
function registerValidator(name, fn, message) {
    validators[name] = fn;
    if (message) {
        messages[name] = message;
    }
}
exports.registerValidator = registerValidator;

var ValidateError = function (_Error) {
    _inherits(ValidateError, _Error);

    function ValidateError(message) {
        _classCallCheck(this, ValidateError);

        var _this = _possibleConstructorReturn(this, (ValidateError.__proto__ || Object.getPrototypeOf(ValidateError)).call(this, message));

        _this.message = message;
        return _this;
    }

    return ValidateError;
}(Error);

exports.ValidateError = ValidateError;

var ValidateErrors = function (_Error2) {
    _inherits(ValidateErrors, _Error2);

    _createClass(ValidateErrors, [{
        key: "length",
        get: function get() {
            return this.errors.length;
        }
    }]);

    function ValidateErrors() {
        var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, ValidateErrors);

        var _this2 = _possibleConstructorReturn(this, (ValidateErrors.__proto__ || Object.getPrototypeOf(ValidateErrors)).call(this));

        _this2.errors = errors;
        return _this2;
    }

    return ValidateErrors;
}(Error);

exports.ValidateErrors = ValidateErrors;