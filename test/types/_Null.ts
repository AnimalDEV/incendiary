import {_Null} from "../../src/types/_Null";
import {strict as assert} from "assert";
import "mocha";

describe("_Null type tests", function () {
	it("should be function", function () {
		assert.deepStrictEqual(typeof _Null, "function");
	});
	it("should return _Null instance", function () {
		assert.deepStrictEqual(new _Null({}) instanceof _Null, true);
	});
	it("should contains name property", function () {
		assert.deepStrictEqual(new _Null({}).hasOwnProperty("name"), true);
	});
	it("should have name property set to 'null'", function () {
		assert.deepStrictEqual(new _Null({}).name, "null");
	});
	it("should contains options property", function () {
		assert.deepStrictEqual(new _Null({}).hasOwnProperty("options"), true);
	});
	it("should have options that is object", function () {
		assert.deepStrictEqual(typeof new _Null({}).options, "object");
	});
	it("should have empty object in options", function () {
		assert.deepStrictEqual(new _Null({}).options, {});
	});
	it("should throw error when called with undefined value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Null({}).validate("test", undefined);
		}, {message: "Missing 'test' property"});
	});
	it("should throw error when called with string type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Null({}).validate("test", "foo");
		}, {message: "Invalid 'test' type. Expected 'null', got 'string'"});
	});
	it("should throw error when called with number type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Null({}).validate("test", 123);
		}, {message: "Invalid 'test' type. Expected 'null', got 'number'"});
	});
	it("should throw error when called with boolean type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Null({}).validate("test", false);
		}, {message: "Invalid 'test' type. Expected 'null', got 'boolean'"});
	});
	it("should throw error when called with array value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Null({}).validate("test", []);
		}, {message: "Invalid 'test' type. Expected 'null', got 'array'"});
	});
	it("should throw error when called with object value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Null({}).validate("test", {});
		}, {message: "Invalid 'test' type. Expected 'null', got 'object'"});
	});
	it("should throw error when called with symbol type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Null({}).validate("test", Symbol("foo"));
		}, {message: "Invalid 'test' type. Expected 'null', got 'symbol'"});
	});
	it("should not throw error when optional is set to true, and value is missing", function () {
		assert.doesNotThrow(() => {
			// @ts-ignore
			new _Null({optional: true}).validate("test", undefined);
		});
	});
	it("should return true when optional is set to true, and value is missing", function () {
		// @ts-ignore
		assert.deepStrictEqual(new _Null({optional: true}).validate("test", undefined), true);
	});
	it("should return true when empty options and value is valid", function () {
		assert.deepStrictEqual(new _Null({}).validate("test", null), true);
	});
	it("should return true with options are set and value is valid", function () {
		assert.deepStrictEqual(new _Null({
			optional: false
		}).validate("test", null), true);
	});
});

