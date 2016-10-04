
import {View, ViewOptions, IDataView, attributes} from 'views';
import {setValue, getValue} from './utils';
import {ValidateErrors, validate} from './validator';
import {Form} from './form';
import {equal} from 'orange';

export interface IEditor extends IDataView {
    name: string;
    value: any;
    clear();
    validate(form: Form): ValidateErrors
}

export interface IEditorOptions extends ViewOptions {
    [key: string]: any;
    form?: Form
    name?: string;
    defaultValue?: any;
}

export abstract class BaseEditor<E extends HTMLElement, V> extends View<E> implements IEditor {
    form: Form;
    public get name() {
        return this.el.getAttribute('name');
    }

    public get value(): V {
        return this.getValue();
    }

    public set value(value: V) {
        if (equal(value,this.getValue())) return;
        this.setValue(value);
    }

    constructor(public options?:IEditorOptions) {
        super(options);
    }

    
   public clear() {
        this.triggerMethod('before:clear');
        this.setValue(this.options.defaultValue ? this.options.defaultValue : null);
        this.triggerMethod('clear');
    }
    
    public validate(form: Form): ValidateErrors {
        return validate(form, this, this.value);
    }
    
    
    protected abstract getValue(): V;
    protected abstract setValue(value:V);


}

export abstract class BaseLayoutEditor<E extends HTMLElement, V> extends View<E> implements IEditor {
     public get name() {
        return this.el.getAttribute('name');
    }

    public get value(): V {
        return this.getValue();
    }

    public set value(value: V) {
        if (equal(value,this.getValue())) return;
        this.triggerMethod('before:set:value', value);
        this.setValue(value);
        this.triggerMethod('set:value', value);
    }

    constructor(public options?:IEditorOptions) {
        super(options);
    }

    
    public clear() {
        this.triggerMethod('before:clear');
        this.setValue(this.options.defaultValue ? this.options.defaultValue : null);
        this.triggerMethod('clear');
    }
    
    public validate(form: Form): ValidateErrors {
        return validate(form, this, this.value);
    }
    
    
    protected abstract getValue(): V;
    protected abstract setValue(value:V);   
}

@attributes({
    tagName: 'input',
    events: {
        keyup: '_onKeyPress',
        change: '_onChange'
    }
})
export class Editor<E extends HTMLElement> extends BaseEditor<E, any> implements IEditor {
    private _prev: any;


    public get name(): string {
        return this.el.getAttribute('name');
    }

    protected setValue(value:any) {
        setValue(this.el, value);
    }

    protected getValue(): any {
        return getValue(this.el)
    }

    
    protected _onKeyPress(e:KeyboardEvent) {
        this._prev = this.getValue();
        this.triggerMethod('change');
    }

    protected _onChange(e:KeyboardEvent) {
        if (equal(this._prev, this.getValue())) return;
        this._prev = this.getValue();
        this.triggerMethod('change');
    }

}