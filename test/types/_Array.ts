import {_Array} from "../../src/types/_Array";
import {strict as assert} from "assert";
import "mocha";

describe("_Array type tests", function () {
	it("should be function", function () {
		assert.deepStrictEqual(typeof _Array, "function");
	});
	it("should return _Array instance", function () {
		assert.deepStrictEqual(new _Array({}) instanceof _Array, true);
	});
	it("should contains name property", function () {
		assert.deepStrictEqual(new _Array({}).hasOwnProperty("name"), true);
	});
	it("should have name property set to 'array'", function () {
		assert.deepStrictEqual(new _Array({}).name, "array");
	});
	it("should contains options property", function () {
		assert.deepStrictEqual(new _Array({}).hasOwnProperty("options"), true);
	});
	it("should have options that is object", function () {
		assert.deepStrictEqual(typeof new _Array({}).options, "object");
	});
	it("should have empty object in options", function () {
		assert.deepStrictEqual(new _Array({}).options, {});
	});
});
