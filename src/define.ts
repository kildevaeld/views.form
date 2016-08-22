import {IEditor, IEditorOptions} from './editor';

export interface IEditorConstructor {
    new (options?:IEditorOptions): IEditor
}

const _editors: {[key: string]: IEditorConstructor } = {};


export function editor(name:string): ClassDecorator {
    return function<T extends IEditorConstructor>(target:T) {
        _editors[name] = target;
    }
}

export function getEditor<T extends IEditor>(name: string, options?:IEditorOptions): IEditor {
    if (_editors[name]) {
        return new _editors[name](options);
    }
    return null;
}

