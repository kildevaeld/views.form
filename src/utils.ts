

const start = "<%",
    end = "%>",
    path = "[a-z0-9_$][\\.a-z0-9_]*", // e.g. config.person.name
    pattern = new RegExp(start + "\\s*(" + path + ")\\s*" + end, "gi"),
    undef = undefined;

export function template(template: string, data: any, throwOnNotFound:boolean = true) {
    return template.replace(pattern, function(tag, token) {
        var path = token.split("."),
            len = path.length,
            lookup = data,
            i = 0;

        for (; i < len; i++) {
            lookup = lookup[path[i]];

            // Property not found
            if (lookup === undef) {
                if (throwOnNotFound) {
                    throw new Error("tim: '" + path[i] + "' not found in " + tag);
                } else {
                    lookup = "";
                }
            }

            // Return the required value
            if (i === len - 1) {
                return lookup;
            }
        }
    });
}



export function getValue(el: HTMLElement, value?: any): any {
    var node = <HTMLInputElement>el;
    var isCheckbox = /checkbox/.test(node.type);
    var isRadio = /radio/.test(node.type);

    var isRadioOrCheckbox = isCheckbox || isRadio;
    var hasValue = Object.prototype.hasOwnProperty.call(node, "value");
    var isInput = hasValue || /input|textarea|checkbox/.test(node.nodeName.toLowerCase());
    var isSelect = /select/i.test(node.nodeName)

    if (arguments.length === 1) {
        if (isCheckbox) {
            return Boolean(node.checked);
        } else if (isSelect) {
            return node.value || "";
        } else if (isInput) {
            let value = node.value || "";
            if (node.type && node.type.toLowerCase() === 'number') {
                value = <any>parseInt(value)
                value = <any>(isNaN(<any>value) ? 0 : value)
            }
            return value;

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

export function setValue(el: HTMLElement, value: any) {
    getValue(el, value);
}

