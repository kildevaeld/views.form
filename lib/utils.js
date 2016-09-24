"use strict";

var start = "<%",
    end = "%>",
    path = "[a-z0-9_$][\\.a-z0-9_]*",
    // e.g. config.person.name
pattern = new RegExp(start + "\\s*(" + path + ")\\s*" + end, "gi"),
    undef = undefined;
function template(template, data) {
    var throwOnNotFound = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    return template.replace(pattern, function (tag, token) {
        var path = token.split("."),
            len = path.length,
            lookup = data,
            i = 0;
        for (; i < len; i++) {
            lookup = lookup[path[i]];
            // Property not found
            if (lookup === undef) {
                if (throwOnNotFound) {
                    throw new Error("templ: '" + path[i] + "' not found in " + tag);
                } else {
                    lookup = "";
                }
            }
            // Return the required value
            if (i === len - 1) {
                return lookup;
            }
        }
        return lookup;
    });
}
exports.template = template;
function getValue(el, value) {
    var node = el;
    var isCheckbox = /checkbox/.test(node.type);
    var isRadio = /radio/.test(node.type);
    var isRadioOrCheckbox = isCheckbox || isRadio;
    var hasValue = Object.prototype.hasOwnProperty.call(node, "value");
    var isInput = hasValue || /input|textarea|checkbox/.test(node.nodeName.toLowerCase());
    var isSelect = /select/i.test(node.nodeName);
    if (arguments.length === 1) {
        if (isCheckbox) {
            return Boolean(node.checked);
        } else if (isSelect) {
            return node.value || "";
        } else if (isInput) {
            var _value = node.value || "";
            if (node.type && node.type.toLowerCase() === 'number') {
                _value = parseInt(_value);
                _value = isNaN(_value) ? 0 : _value;
            }
            return _value;
        } else {
            return node.innerHTML || "";
        }
    }
    if (value == null) {
        value = "";
    }
    if (isRadioOrCheckbox) {
        if (isRadio) {
            if (String(value) === String(node.value)) {
                node.checked = true;
            }
        } else {
            node.checked = value;
        }
    } else if (String(value) !== getValue(el)) {
        if (isInput || isSelect) {
            node.value = value;
        } else {
            node.innerHTML = value;
        }
    }
}
exports.getValue = getValue;
function setValue(el, value) {
    getValue(el, value);
}
exports.setValue = setValue;