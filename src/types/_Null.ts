import {Type} from "../Types";

export class _Null implements Type {
	name = "null";
	options: any;

	constructor(options: NullOptions) {
		this.options = options;
	}

	validate(key: string, value: null): boolean {
		if (value === undefined && (!this.options.hasOwnProperty("optional") || !this.options.optional)) {
			throw new Error(`Missing '${key}' property`);
		}
		if (value !== null && typeof value !== "undefined") {
			const type = Array.isArray(value) ? "array" : typeof value;
			throw new Error(`Invalid '${key}' type. Expected '${this.name}', got '${type}'`);
		}
		return true;
	}
}

export interface NullOptions {
	optional?: boolean
}
