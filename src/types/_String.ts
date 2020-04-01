import {Type} from "../Types";

export class _String implements Type {
	name = "string";
	options: any;

	constructor(options: StringOptions) {
		if (options.length !== undefined && options.length < 0) {
			throw new Error("Invalid 'length' option. Length cannot be lower than 0");
		}
		if (options.valid !== undefined && options.valid.length < 1) {
			throw new Error("Invalid 'valid' option. Valid array must contain at least one element");
		}
		if (options.max !== undefined && options.max < 0) {
			throw new Error("Invalid 'max' option. Max length cannot be lower than 0");
		}
		if (options.min !== undefined && options.min < 0) {
			throw new Error("Invalid 'min' option. Min length cannot be lower than 0");
		}
		if (options.length !== undefined && (options.min !== undefined || options.max !== undefined)) {
			throw new Error("Length option cannot be used if min or max option is set");
		}
		if (options.min !== undefined && options.max !== undefined) {
			if (options.min > options.max) {
				throw new Error("Invalid 'min' option. Min cannot be greater than max option")
			}
			if (options.min === options.max) {
				throw new Error("Min and max options are the same. For that case use 'length' option")
			}
		}
		this.options = options;
	}

	validate(key: string, value: string): boolean {
		if (value === undefined && (!this.options.hasOwnProperty("optional") || !this.options.optional)) {
			throw new Error(`Missing '${key}' property`);
		}
		if (typeof value !== this.name && typeof value !== "undefined") {
			const type = Array.isArray(value) ? "array" : value === null ? "null" : typeof value;
			throw new Error(`Invalid '${key}' type. Expected '${this.name}', got '${type}'`);
		}
		if (this.options.hasOwnProperty("valid") && !this.options.valid.includes(value)) {
			throw new Error(`Illegal '${value}' value in '${key}'. Allowed values [${this.options.valid}]`);
		}
		if (this.options.hasOwnProperty("length") && value.length !== this.options.length) {
			throw new Error(`Invalid '${key}' param length. Value length must be exactly ${this.options.length}`);
		}
		if (this.options.hasOwnProperty("max") && value.length > this.options.max) {
			throw new Error(`Invalid '${key}' param length. Max length is ${this.options.max}`);
		}
		if (this.options.hasOwnProperty("min") && value.length < this.options.min) {
			throw new Error(`Invalid '${key}' param length. Min length is ${this.options.min}`);
		}
		return true;
	}
}

export interface StringOptions {
	valid?: string[],
	max?: number,
	min?: number,
	optional?: boolean,
	length?: number
}
