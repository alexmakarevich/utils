import {FunctionAsHKT, HigherKindedType, ResolveHKT, SimpleFunctionAsHKT} from "../src/types/higherKindedTypes";

// this is so generic, that it could be an infinite set of combos of the first two params
const fnAcceptingFnAsFkt = <Hkt extends HigherKindedType, HktParam, NormalFunction extends ResolveHKT<Hkt, HktParam>>(
	fn: NormalFunction
) => {};

const normalFn = (a: string): [string] => [a];

const test = fnAcceptingFnAsFkt(normalFn);

interface SampleHktForFn<ParamType extends any[] = unknown[]> extends HigherKindedType {
	GenericValue: ParamType;
	GenericResult: [this["GenericValue"][0]];
}

type FnFromHktExplicit = FunctionAsHKT<SampleHktForFn>;

// Yay, this works.
//TODO: prettify and use

const fnAcceptingFnAsFktExact = <NormalFunction extends FunctionAsHKT<SampleHktForFn<Parameters<NormalFunction>>>>(
	fn: NormalFunction
) => {};

interface HktFromFunction<Fn> extends HigherKindedType {}

const test2 = fnAcceptingFnAsFktExact(normalFn);
