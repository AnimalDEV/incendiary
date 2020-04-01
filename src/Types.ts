import {_String, StringOptions} from "./types/_String";
import {_Number, NumberOptions} from "./types/_Number";
import {_Boolean, BooleanOptions} from "./types/_Boolean";
import {_Null, NullOptions} from "./types/_Null";
import {_Array, ArrayOptions} from "./types/_Array";
import {_Object, ObjectOptions} from "./types/_Object";

export class Types {
	_String: (options?: StringOptions) => Type;
	_Number: (options?: NumberOptions) => Type;
	_Boolean: (options?: BooleanOptions) => Type;
	_Null: (options?: NullOptions) => Type;
	_Array: (options?: ArrayOptions) => Type;
	_Object: (options?: ObjectOptions) => Type;

	constructor() {
		this._String = (options: StringOptions = {}): Type => new _String(options);
		this._Number = (options: NumberOptions = {}): Type => new _Number(options);
		this._Boolean = (options: BooleanOptions = {}): Type => new _Boolean(options);
		this._Null = (options: NullOptions = {}): Type => new _Null(options);
		this._Array = (options: ArrayOptions = {}): Type => new _Array(options);
		this._Object = (options: ObjectOptions = {}): Type => new _Object(options);
	}
}

export interface Type {
	name: string,
	options: any,

	validate(key: string, value: any): boolean
}
