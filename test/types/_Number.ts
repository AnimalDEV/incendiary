import {_Number} from "../../src/types/_Number";
import {strict as assert} from "assert";
import "mocha";

describe("_Number type tests", function () {
	it("should be function", function () {
		assert.deepStrictEqual(typeof _Number, "function");
	});
	it("should return _Number instance", function () {
		assert.deepStrictEqual(new _Number({}) instanceof _Number, true);
	});
	it("should contains name property", function () {
		assert.deepStrictEqual(new _Number({}).hasOwnProperty("name"), true);
	});
	it("should have name property set to 'number'", function () {
		assert.deepStrictEqual(new _Number({}).name, "number");
	});
	it("should contains options property", function () {
		assert.deepStrictEqual(new _Number({}).hasOwnProperty("options"), true);
	});
	it("should have options that is object", function () {
		assert.deepStrictEqual(typeof new _Number({}).options, "object");
	});
	it("should have empty object in options", function () {
		assert.deepStrictEqual(new _Number({}).options, {});
	});
	it("should throw error when called with undefined value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Number({}).validate("test", undefined);
		}, {message: "Missing 'test' property"});
	});
	it("should throw error when called with string type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Number({}).validate("test", "foo");
		}, {message: "Invalid 'test' type. Expected 'number', got 'string'"});
	});
	it("should throw error when called with null type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Number({}).validate("test", null);
		}, {message: "Invalid 'test' type. Expected 'number', got 'null'"});
	});
	it("should throw error when called with boolean type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Number({}).validate("test", false);
		}, {message: "Invalid 'test' type. Expected 'number', got 'boolean'"});
	});
	it("should throw error when called with array value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Number({}).validate("test", []);
		}, {message: "Invalid 'test' type. Expected 'number', got 'array'"});
	});
	it("should throw error when called with object value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Number({}).validate("test", {});
		}, {message: "Invalid 'test' type. Expected 'number', got 'object'"});
	});
	it("should throw error when called with symbol type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Number({}).validate("test", Symbol("foo"));
		}, {message: "Invalid 'test' type. Expected 'number', got 'symbol'"});
	});
	it("should throw error when valid option array is empty", function () {
		assert.throws(() => {
			new _Number({valid: []}).validate("test", 123);
		}, {message: "Invalid 'valid' option. Valid array must contain at least one element"});
	});
	it("should throw error when valid option is set but provided value is not in array", function () {
		assert.throws(() => {
			new _Number({valid: [1]}).validate("test", 12);
		}, {message: "Illegal '12' value in 'test'. Allowed values [1]"});
	});
	it("should throw error when max option is set but provided value is greater", function () {
		assert.throws(() => {
			new _Number({max: 3}).validate("test", 5);
		}, {message: "Invalid 'test' param value. Max value is 3"});
	});
	it("should throw error when min option is set but provided value is lower", function () {
		assert.throws(() => {
			new _Number({min: -5}).validate("test", -9);
		}, {message: "Invalid 'test' param value. Min value is -5"});
	});
	it("should throw error when min is greater than max", function () {
		assert.throws(() => {
			new _Number({min: 13, max: 1}).validate("test", 5);
		}, {message: "Invalid 'min' option. Min cannot be greater than max option"});
	});
	it("should throw error when min is equal to max", function () {
		assert.throws(() => {
			new _Number({min: 13, max: 13}).validate("test", 1);
		}, {message: "Min and max options are the same. For that case use 'valid' option"});
	});
	it("should throw error when integer is set to true and value is floating point", function () {
		assert.throws(() => {
			new _Number({integer: true}).validate("test", 1.123);
		}, {message: "Illegal '1.123' value in 'test'. Value must be integer"});
	});
	it("should throw error when positive is set to true and value is negative", function () {
		assert.throws(() => {
			new _Number({positive: true}).validate("test", -1);
		}, {message: "Illegal '-1' value in 'test'. Value must be positive"});
	});
	it("should throw error when positive is set to false and value is positive", function () {
		assert.throws(() => {
			new _Number({positive: false}).validate("test", 1);
		}, {message: "Illegal '1' value in 'test'. Value must be negative"});
	});
	it("should not throw error when optional is set to true, and value is missing", function () {
		assert.doesNotThrow(() => {
			// @ts-ignore
			new _Number({optional: true}).validate("test", undefined);
		});
	});
	it("should return true when optional is set to true, and value is missing", function () {
		// @ts-ignore
		assert.deepStrictEqual(new _Number({optional: true}).validate("test", undefined), true);
	});
	it("should return true when empty options and value is valid", function () {
		assert.deepStrictEqual(new _Number({}).validate("test", 12), true);
	});
	it("should return true with options are set and value is valid", function () {
		assert.deepStrictEqual(new _Number({
			min: 5,
			max: 6,
			valid: [4, 3, 67, 6, 2]
		}).validate("test", 6), true);
	});
});

