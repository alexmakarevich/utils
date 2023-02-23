import {assert} from "../src/types/testTypes";
import {Equals} from "tsafe/Equals";

// Testing out different ways to strictly compare types

type Not<T> = T extends true ? false : true;

// 1
type SimpleCompare<A, B> = A extends B ? (B extends A ? true : false) : false;

// 2
export type ValidateShape<T, Shape> = T extends Shape
	? Exclude<keyof T, keyof Shape> extends never
		? true
		: false
	: false;

// 3
export type DoubleValidate<A, B> = ValidateShape<A, B> extends true
	? ValidateShape<B, A> extends true
		? true
		: false
	: false;

type TestedCompare<A, B> = Equals<A, B>;

assert<Not<TestedCompare<true, false>>>;
assert<TestedCompare<true, true>>;
assert<TestedCompare<9, 9>>;
assert<Not<TestedCompare<9, 8>>>;
assert<Not<TestedCompare<9, number>>>; // this one is usually broken.
assert<Not<TestedCompare<number, 9>>>;
assert<Not<TestedCompare<9, "9">>>;
assert<Not<TestedCompare<Object, {}>>>;
assert<Not<TestedCompare<Object, () => {}>>>;
assert<Not<TestedCompare<Object, Function>>>;
assert<TestedCompare<() => 9, () => 9>>;
assert<Not<TestedCompare<(a: number) => 9, () => 9>>>;
assert<TestedCompare<string | number, string | number>>; // this one is usually broken.
assert<TestedCompare<string | number, number | string>>; // this one is usually broken.
assert<Not<TestedCompare<string | number, string>>>;
assert<Not<TestedCompare<string, number | string>>>;
assert<Not<TestedCompare<{a: string}, {a: string | number}>>>;
assert<Not<TestedCompare<{a: string}, {a: string; b?: null}>>>;
