import {Types} from "./Types";
import {Schema} from "./Schema";
import {log} from "util";

const {_String, _Array, _Boolean, _Null, _Number, _Object} = new Types();

const schema = new Schema({
	hi: {
		a: {
			b: 1
		}
	}
});

console.log(schema);

console.log(schema.model);