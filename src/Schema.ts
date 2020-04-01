import {Type} from "./Types";
import {_Number} from "./types/_Number";
import {_Boolean} from "./types/_Boolean";
import {_String} from "./types/_String";
import {_Array, ArrayOptions} from "./types/_Array";
import {_Null} from "./types/_Null";
import {_Object, ObjectOptions} from "./types/_Object";

export class Schema {
	properties: { [key: string]: Type };

	constructor(properties: { [key: string]: any }) {
		this.properties = Schema.normalize(properties);
	}

	validate(data: { [key: string]: any }): { [key: string]: any } {
		for (const [key, value] of Object.entries(this.properties)) {
			value.validate(key, data[key]);
		}
		return data;
	}

	static normalize(schema: { [key: string]: any }): { [key: string]: Type } {
		if (schema === null || Array.isArray(schema) || typeof schema !== "object") {
			throw new Error("Schema must be an object");
		}
		const normalized: { [key: string]: Type } = {};
		for (const [key, value] of Object.entries(schema)) {
			normalized[key] = this.normalizeProperty(value);
		}
		return normalized;
	}

	static normalizeProperty(property: any): Type {
		if (property === null) {
			return new _Null({});
		}
		if (Array.isArray(property)) {
			const options: ArrayOptions = {};
			if (property.length > 0) {
				options.items = Schema.normalizeProperty(property[0]);
			}
			return new _Array(options);
		}
		if (property instanceof _Object) {
			const options: ObjectOptions = {};
			if (property.options.properties && Object.keys(property.options.properties).length > 0) {
				options.properties = Schema.normalize(property.options.properties);
			}
			return new _Object(options);
		}
		if (property instanceof _Array) {
			const options: ArrayOptions = {};
			if (property.options.items !== undefined) {
				options.items = Schema.normalizeProperty(property.options.items);
			}
			return new _Object(options);
		}
		if (property instanceof _Boolean || property instanceof _Number || property instanceof _Null || property instanceof _String) {
			return property;
		}
		switch (typeof property) {
			case "string":
				return new _String({valid: [property]});
			case "number":
				return new _Number({valid: [property]});
			case "boolean":
				return new _Boolean({valid: [property]});
			case "object":
				const options: ObjectOptions = {};
				if (Object.keys(property).length > 0) {
					options.properties = Schema.normalize(property);
				}
				return new _Object(options);
			case "function":
				return property();
			case "symbol":
			case "undefined":
			default:
				throw new Error(`Invalid '${property}' property type for, got '${typeof property}'`);
		}
	}
}
