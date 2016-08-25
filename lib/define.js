"use strict";
const Debug = require('debug');
const debug = Debug('views:form');
const _editors = {};
function editor(name) {
    return function (target) {
        debug('register editor: %s', name);
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
