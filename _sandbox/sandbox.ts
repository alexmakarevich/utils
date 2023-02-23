/** Based on https://github.com/microsoft/TypeScript/issues/40928 */
export type HigherKindedType<P = unknown> = {
	GenericValue: P;
	GenericResult: unknown;
};

export type InferHigherKindedType<f extends HigherKindedType, x> = (f & {GenericValue: x})["GenericResult"];

export type ReplacerHkt = HigherKindedType & {
	GenericResult: HigherKindedType["GenericValue"] extends (...p: infer Params) => infer Return
		? (...p: [...Params, ...["lolkek"]]) => Promise<Return>
		: HigherKindedType["GenericValue"];
};

type FunctionOfHktType<HKTi extends HigherKindedType> = <P extends HKTi["GenericValue"]>(
	param: P
) => InferHigherKindedType<HKTi, P>;
// @ts-ignore
const rcf: FunctionOfHktType<ReplacerHkt> = <P>(p: P) => (typeof p === "boolean" ? "bool" : "other");

export const propertyReplacer =
	<HKTi extends HigherKindedType>(cb: FunctionOfHktType<HKTi>) =>
	<P>(p: P) => {
		// @ts-ignore
		// TODO: implement
		return null as {[k in keyof P]: InferHigherKindedType<HKTi, P[k]>};
	};

// the replacer must have a type based on HKT, currently the HKT type must be provided explicitly
const sowc = propertyReplacer<ReplacerHkt>(rcf)({a: "", b: true, c: false, d: (a: string, b: "lol") => true});

/**
 *
 * @param something
 * @returns
 */
const isString = (something: unknown) => {
	if (typeof something === "string") {
		return something;
	}
	throw "x";
};

/**
 *
 * @param something
 * @returns
 */
const isType =
	<Type extends "string" | "number" | "boolean">(type: Type) =>
	(something: unknown) => {
		if (typeof something === "number") {
			return something;
		}
		throw "x";
	};

const isNumber = isType("number");

/**
 *
 * @param something
 * @returns
 */
const isExactString = (something: unknown): "exact" => {
	if (something === "exact") {
		return something;
	}
	throw "x";
};
