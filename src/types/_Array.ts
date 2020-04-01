import {Type} from "../Types";

export class _Array implements Type {
	name = "array";
	options: any;

	constructor(options: ArrayOptions) {
		this.options = options;
	}

	validate(key: string, value: any): boolean {
		if (!value && (!this.options.hasOwnProperty("optional") || !value.options.optional)) {
			throw new Error(`Missing '${key}' property`);
		}
		if (!Array.isArray(value)) {
			const type = value === null ? "null" : typeof value;
			throw new Error(`Invalid '${key}' type. Expected '${this.name}', got '${type}'`);
		}
		return true;
	}
}

export interface ArrayOptions {
	items?: Type
	max?: number,
	min?: number,
	length?: number,
	unique?: boolean,
	optional?: boolean
}
