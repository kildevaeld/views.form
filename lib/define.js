"use strict";

var Debug = require("debug");
var debug = Debug('views:form');
var _editors = {};
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