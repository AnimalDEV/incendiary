import {_Boolean} from "../../src/types/_Boolean";
import {strict as assert} from "assert";
import "mocha";

describe("_Boolean type tests", function () {
	it("should be function", function () {
		assert.deepStrictEqual(typeof _Boolean, "function");
	});
	it("should return _Boolean instance", function () {
		assert.deepStrictEqual(new _Boolean({}) instanceof _Boolean, true);
	});
	it("should contains name property", function () {
		assert.deepStrictEqual(new _Boolean({}).hasOwnProperty("name"), true);
	});
	it("should have name property set to 'boolean'", function () {
		assert.deepStrictEqual(new _Boolean({}).name, "boolean");
	});
	it("should contains options property", function () {
		assert.deepStrictEqual(new _Boolean({}).hasOwnProperty("options"), true);
	});
	it("should have options that is object", function () {
		assert.deepStrictEqual(typeof new _Boolean({}).options, "object");
	});
	it("should have empty object in options", function () {
		assert.deepStrictEqual(new _Boolean({}).options, {});
	});
	it("should throw error when called with undefined value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({}).validate("test", undefined);
		}, {message: "Missing 'test' property"});
	});
	it("should throw error when called with string type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({}).validate("test", "foo");
		}, {message: "Invalid 'test' type. Expected 'boolean', got 'string'"});
	});
	it("should throw error when called with null type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({}).validate("test", null);
		}, {message: "Invalid 'test' type. Expected 'boolean', got 'null'"});
	});
	it("should throw error when called with number type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({}).validate("test", 123);
		}, {message: "Invalid 'test' type. Expected 'boolean', got 'number'"});
	});
	it("should throw error when called with array value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({}).validate("test", []);
		}, {message: "Invalid 'test' type. Expected 'boolean', got 'array'"});
	});
	it("should throw error when called with object value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({}).validate("test", {});
		}, {message: "Invalid 'test' type. Expected 'boolean', got 'object'"});
	});
	it("should throw error when called with symbol type value", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({}).validate("test", Symbol("foo"));
		}, {message: "Invalid 'test' type. Expected 'boolean', got 'symbol'"});
	});
	it("should throw error when valid option array is empty", function () {
		assert.throws(() => {
			new _Boolean({valid: []}).validate("test", false);
		}, {message: "Invalid 'valid' option. Valid array must contain at least one element"});
	});
	it("should throw error when valid option array has more than 2 elements", function () {
		assert.throws(() => {
			new _Boolean({valid: [true, false, true]}).validate("test", false);
		}, {message: "Invalid 'valid' option. Valid array can contain max 2 elements"});
	});
	it("should throw error when valid option is set but provided value is not in array", function () {
		assert.throws(() => {
			new _Boolean({valid: [false]}).validate("test", true);
		}, {message: "Illegal 'true' value in 'test'. Allowed values [false]"});
	});
	it("should throw error when valid option is set to true and falsy is on but provided value is falsy (0)", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({falsy: true, valid: [true]}).validate("test", 0);
		}, {message: "Illegal 'false' value in 'test'. Allowed values [true]"});
	});
	it("should throw error when valid option is set to true and falsy is on but provided value is falsy (-0)", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({falsy: true, valid: [true]}).validate("test", -0);
		}, {message: "Illegal 'false' value in 'test'. Allowed values [true]"});
	});
	it("should throw error when valid option is set to true and falsy is on but provided value is falsy (0n)", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({falsy: true, valid: [true]}).validate("test", 0n);
		}, {message: "Illegal 'false' value in 'test'. Allowed values [true]"});
	});
	it("should throw error when valid option is set to true and falsy is on but provided value is falsy ('')", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({falsy: true, valid: [true]}).validate("test", "");
		}, {message: "Illegal 'false' value in 'test'. Allowed values [true]"});
	});
	it("should throw error when valid option is set to true and falsy is on but provided value is falsy (null)", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({falsy: true, valid: [true]}).validate("test", null);
		}, {message: "Illegal 'false' value in 'test'. Allowed values [true]"});
	});
	it("should throw error when valid option is set to true and falsy is on but provided value is falsy (undefined)", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({falsy: true, valid: [true]}).validate("test", undefined);
		}, {message: "Illegal 'false' value in 'test'. Allowed values [true]"});
	});
	it("should throw error when valid option is set to true and falsy is on but provided value is falsy (NaN)", function () {
		assert.throws(() => {
			// @ts-ignore
			new _Boolean({falsy: true, valid: [true]}).validate("test", NaN);
		}, {message: "Illegal 'false' value in 'test'. Allowed values [true]"});
	});
	it("should not throw error when optional is set to true, and value is missing", function () {
		assert.doesNotThrow(() => {
			// @ts-ignore
			new _Boolean({optional: true}).validate("test", undefined);
		});
	});
	it("should return true when optional is set to true, and value is missing", function () {
		// @ts-ignore
		assert.deepStrictEqual(new _Boolean({optional: true}).validate("test", undefined), true);
	});
	it("should return true when empty options and value is valid", function () {
		assert.deepStrictEqual(new _Boolean({}).validate("test", true), true);
	});
	it("should return true with options are set and value is valid", function () {
		assert.deepStrictEqual(new _Boolean({
			falsy: false,
			optional: true,
			valid: [true, false]
		}).validate("test", false), true);
	});
});

