import {Equals} from "tsafe/Equals";
import {SimpleFunctionAsHKT, HigherKindedType} from "../src/types/higherKindedTypes";

interface ConditionaReturn extends HigherKindedType<string | number> {
	GenericResult: this["GenericValue"] extends string ? string extends this["GenericValue"] ? "string" : "number"
}

const conditionalReturnHkt: SimpleFunctionAsHKT<ConditionaReturn> = (p) => {
	if (typeof p === "string") {
		return "string";
	}
	return "number";
};

const test = conditionalReturnHkt("")


const withoutHKT = <T>(a: T): Equals<T, string> extends true ? "s" : "n" => {
	if (typeof a === "string") {
		return "s"
	}
	return "n"
}


interface HKTFnWGenerics {
	ParamsWithGeneric: (...params: any) => any;
	Return: any;
}

interface ExactHkt extends HKTFnWGenerics {
	ParamsWithGeneric: <T>(a: T) => any;
	Return: Parameters<this["ParamsWithGeneric"]>[0];
}

type ImplementFn<HKT extends HKTFnWGenerics> = (...params: Parameters<HKT["ParamsWithGeneric"]>) => HKT["Return"];

type Test = ImplementFn<ExactHkt>;



type ReplaceReturn<Fn, Return> = Fn() => return