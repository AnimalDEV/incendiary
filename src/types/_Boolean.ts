import {Type} from "../Types";

export class _Boolean implements Type {
	name = "boolean";
	options: any;

	constructor(options: BooleanOptions) {
		if (options.valid !== undefined) {
			if (options.valid.length < 1) {
				throw new Error("Invalid 'valid' option. Valid array must contain at least one element");
			}
			if (options.valid.length > 2) {
				throw new Error("Invalid 'valid' option. Valid array can contain max 2 elements");
			}
		}
		this.options = options;
	}

	validate(key: string, value: boolean): boolean {
		if (this.options.hasOwnProperty("falsy") && this.options.falsy === true) {
			value = !!value;
		}
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
		return true;
	}
}

export interface BooleanOptions {
	valid?: boolean[],
	falsy?: boolean,
	optional?: boolean
}
