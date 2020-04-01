import {_Object} from "../../src/types/_Object";
import {strict as assert} from "assert";
import "mocha";

describe("_Object type tests", function () {
	it("should be function", function () {
		assert.deepStrictEqual(typeof _Object, "function");
	});
	it("should return _Object instance", function () {
		assert.deepStrictEqual(new _Object({}) instanceof _Object, true);
	});
	it("should contains name property", function () {
		assert.deepStrictEqual(new _Object({}).hasOwnProperty("name"), true);
	});
	it("should have name property set to 'object'", function () {
		assert.deepStrictEqual(new _Object({}).name, "object");
	});
	it("should contains options property", function () {
		assert.deepStrictEqual(new _Object({}).hasOwnProperty("options"), true);
	});
	it("should have options that is object", function () {
		assert.deepStrictEqual(typeof new _Object({}).options, "object");
	});
	it("should have empty object in options", function () {
		assert.deepStrictEqual(new _Object({}).options, {});
	});
});
