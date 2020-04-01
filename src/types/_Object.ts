import {Type} from "../Types";

export class _Object implements Type {
	name = "object";
	options: any;

	constructor(options: ObjectOptions) {
		this.options = options;
	}

	validate(key: string, value: any): boolean {
		if (!value === undefined && (!this.options.hasOwnProperty("optional") || !this.options.optional)) {
			throw new Error(`Missing '${key}' property`);
		}
		if ((Array.isArray(value) || value === null || typeof value !== this.name) && typeof value !== "undefined") {
			const type = Array.isArray(value) ? "array" : value === null ? "null" : typeof value;
			throw new Error(`Invalid '${key}' type. Expected '${this.name}', got '${type}'`);
		}
		return true;
	}
}

export interface ObjectOptions {
	properties?: { [key: string]: any }
	optional?: boolean
}
