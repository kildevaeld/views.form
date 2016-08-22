import { IEditor, IEditorOptions } from './editor';
export interface IEditorConstructor {
    new (options?: IEditorOptions): IEditor;
}
export declare function editor(name: string): ClassDecorator;
export declare function getEditor<T extends IEditor>(name: string, options?: IEditorOptions): IEditor;
