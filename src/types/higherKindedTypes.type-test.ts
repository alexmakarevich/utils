import {Equals} from "tsafe/Equals";
import {SimpleFunctionAsHKT, HigherKindedType, ResolveHKT} from "./higherKindedTypes";
import {assert, Not} from "./testTypes";

// sample simple HKT
interface TrueIfStringHkt extends HigherKindedType {
	GenericResult: this["GenericValue"] extends string ? true : false;
}

assert<ResolveHKT<TrueIfStringHkt, "">>;
assert<Not<ResolveHKT<TrueIfStringHkt, number>>>;

// FunctionAsHKT
interface HKTWrapInPromise extends HigherKindedType {
	GenericResult: Promise<this["GenericValue"]>;
}

type ResultingFunction = SimpleFunctionAsHKT<HKTWrapInPromise>;
assert<Equals<ResultingFunction, <T>(t: T) => Promise<T>>>;
