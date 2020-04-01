import {Type} from "../Types";

export class _Number implements Type {
	name = "number";
	options: any;

	constructor(options: NumberOptions) {
		if (options.valid !== undefined && options.valid.length < 1) {
			throw new Error("Invalid 'valid' option. Valid array must contain at least one element");
		}
		if (options.min !== undefined && options.max !== undefined) {
			if (options.min > options.max) {
				throw new Error("Invalid 'min' option. Min cannot be greater than max option")
			}
			if (options.min === options.max) {
				throw new Error("Min and max options are the same. For that case use 'valid' option")
			}
		}
		this.options = options;
	}

	validate(key: string, value: number): boolean {
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
		if (this.options.hasOwnProperty("integer") && this.options.integer === true && !Number.isInteger(value)) {
			throw new Error(`Illegal '${value}' value in '${key}'. Value must be integer`);
		}
		if (this.options.hasOwnProperty("positive") && this.options.positive === true && value < 0) {
			throw new Error(`Illegal '${value}' value in '${key}'. Value must be positive`);
		}
		if (this.options.hasOwnProperty("positive") && this.options.positive === false && value > 0) {
			throw new Error(`Illegal '${value}' value in '${key}'. Value must be negative`);
		}
		if (this.options.hasOwnProperty("max") && value > this.options.max) {
			throw new Error(`Invalid '${key}' param value. Max value is ${this.options.max}`);
		}
		if (this.options.hasOwnProperty("min") && value < this.options.min) {
			throw new Error(`Invalid '${key}' param value. Min value is ${this.options.min}`);
		}
		return true;
	}
}

export interface NumberOptions {
	valid?: number[],
	max?: number,
	min?: number,
	integer?: boolean,
	optional?: boolean,
	positive?: boolean
}
