"use strict";
const _editors = {};
function editor(name) {
    return function (target) {
        _editors[name] = target;
    };
}
exports.editor = editor;
function getEditor(name, options) {
    if (_editors[name]) {
        return new _editors[name](options);
    }
    return null;
}
exports.getEditor = getEditor;
