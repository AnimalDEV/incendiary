import {_String} from "../../src/types/_String";
import {strict as assert} from "assert";
import "mocha";

describe("_String type tests", function () {
	it("should be function", function () {
		assert.deepStrictEqual(typeof _String, "function");
	});
	it("should return _String instance", function () {
		assert.deepStrictEqual(new _String({}) instanceof _String, true);
	});
	it("should contains name property", function () {
		assert.deepStrictEqual(new _String({}).hasOwnProperty("name"), true);
	});
	it("should have name property set to 'string'", function () {
		assert.deepStrictEqual(new _String({}).name, "string");
	});
	it("should contains options property", function () {
		assert.deepStrictEqual(new _String({}).hasOwnProperty("options"), true);
	});
	it("should have options that is object", function () {
		assert.deepStrictEqual(typeof new _String({}).options, "object");
	});
	it("should have empty object in options", function () {
		assert.deepStrictEqual(new _String({}).options, {});
	});
	it("should throw error when called with undefined value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _String({}).validate("test", undefined);
		}, {message: "Missing 'test' property"});
	});
	it("should throw error when called with number type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _String({}).validate("test", 123);
		}, {message: "Invalid 'test' type. Expected 'string', got 'number'"});
	});
	it("should throw error when called with null type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _String({}).validate("test", null);
		}, {message: "Invalid 'test' type. Expected 'string', got 'null'"});
	});
	it("should throw error when called with boolean type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _String({}).validate("test", false);
		}, {message: "Invalid 'test' type. Expected 'string', got 'boolean'"});
	});
	it("should throw error when called with array value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _String({}).validate("test", []);
		}, {message: "Invalid 'test' type. Expected 'string', got 'array'"});
	});
	it("should throw error when called with object value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _String({}).validate("test", {});
		}, {message: "Invalid 'test' type. Expected 'string', got 'object'"});
	});
	it("should throw error when called with symbol type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _String({}).validate("test", Symbol("foo"));
		}, {message: "Invalid 'test' type. Expected 'string', got 'symbol'"});
	});
	it("should throw error when valid option array is empty", function () {
		assert.throws(() => {
			new _String({valid: []}).validate("test", "bar");
		}, {message: "Invalid 'valid' option. Valid array must contain at least one element"});
	});
	it("should throw error when valid option is set but provided value is not in array", function () {
		assert.throws(() => {
			new _String({valid: ["foo"]}).validate("test", "bar");
		}, {message: "Illegal 'bar' value in 'test'. Allowed values [foo]"});
	});
	it("should throw error when length option is lower than 0", function () {
		assert.throws(() => {
			new _String({length: -3}).validate("test", "a");
		}, {message: "Invalid 'length' option. Length cannot be lower than 0"});
	});
	it("should throw error when length option is set but provided value is shorter", function () {
		assert.throws(() => {
			new _String({length: 3}).validate("test", "a");
		}, {message: "Invalid 'test' param length. Value length must be exactly 3"});
	});
	it("should throw error when length option is set but provided value is longer", function () {
		assert.throws(() => {
			new _String({length: 3}).validate("test", "long");
		}, {message: "Invalid 'test' param length. Value length must be exactly 3"});
	});
	it("should throw error when max option is lower than 0", function () {
		assert.throws(() => {
			new _String({max: -13}).validate("test", "long");
		}, {message: "Invalid 'max' option. Max length cannot be lower than 0"});
	});
	it("should throw error when max option is set but provided value is longer", function () {
		assert.throws(() => {
			new _String({max: 3}).validate("test", "long");
		}, {message: "Invalid 'test' param length. Max length is 3"});
	});
	it("should throw error when min option is lower than 0", function () {
		assert.throws(() => {
			new _String({min: -1}).validate("test", "long");
		}, {message: "Invalid 'min' option. Min length cannot be lower than 0"});
	});
	it("should throw error when min option is set but provided value is shorter", function () {
		assert.throws(() => {
			new _String({min: 5}).validate("test", "long");
		}, {message: "Invalid 'test' param length. Min length is 5"});
	});
	it("should throw error when min is greater than max", function () {
		assert.throws(() => {
			new _String({min: 13, max: 1}).validate("test", "asd");
		}, {message: "Invalid 'min' option. Min cannot be greater than max option"});
	});
	it("should throw error when min is equal to max", function () {
		assert.throws(() => {
			new _String({min: 13, max: 13}).validate("test", "asd");
		}, {message: "Min and max options are the same. For that case use 'length' option"});
	});
	it("should throw error when length is set and max is set too", function () {
		assert.throws(() => {
			new _String({length: 13, max: 1}).validate("test", "asd");
		}, {message: "Length option cannot be used if min or max option is set"});
	});
	it("should throw error when length is set and min is set too", function () {
		assert.throws(() => {
			new _String({length: 13, min: 1}).validate("test", "asd");
		}, {message: "Length option cannot be used if min or max option is set"});
	});
	it("should throw error when length is set and min & max is set too", function () {
		assert.throws(() => {
			new _String({length: 13, max: 5, min: 1}).validate("test", "asd");
		}, {message: "Length option cannot be used if min or max option is set"});
	});
	it("should not throw error when optional is set to true, and value is missing", function () {
		assert.doesNotThrow(() => {
			// @ts-ignore
			new _String({optional: true}).validate("test", undefined);
		});
	});
	it("should return true when optional is set to true, and value is missing", function () {
		// @ts-ignore
		assert.deepStrictEqual(new _String({optional: true}).validate("test", undefined), true);
	});
	it("should return true when empty options and value is valid", function () {
		assert.deepStrictEqual(new _String({}).validate("test", "foo"), true);
	});
	it("should return true with options are set and value is valid (length variant)", function () {
		assert.deepStrictEqual(new _String({
			length: 5,
			valid: ["fives", "fours"]
		}).validate("test", "fives"), true);
	});
	it("should return true with options are set and value is valid (min and max variant)", function () {
		assert.deepStrictEqual(new _String({
			min: 5,
			max: 6,
			valid: ["fives", "change"]
		}).validate("test", "change"), true);
	});
});

