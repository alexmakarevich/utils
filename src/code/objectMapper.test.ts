import {Equals} from "tsafe/Equals";
import {SimpleFunctionAsHKT, HigherKindedType} from "../types/higherKindedTypes";
import {assert} from "../types/testTypes";
import {objectMapperComplex, objectMapperSimple} from "./objectMapper";

describe(__filename, () => {
	// higher kinded type that maps the following:
	// b = a is function ? (params<a> => promise<returntype<a>>) : (a)
	interface ReplacerHkt extends HigherKindedType {
		GenericResult: this["GenericValue"] extends (...p: infer Params) => infer Return
			? (...p: [...Params]) => Promise<Return>
			: this["GenericValue"];
	}

	const replacerCallbackWrappingReturnInPromise: SimpleFunctionAsHKT<ReplacerHkt> = (p: any) => {
		if (typeof p === "function") {
			return (...newParams: Parameters<typeof p>) => Promise.resolve(p(...newParams));
		}
		return p;
	};

	it("maps simple object correctly", async () => {
		const mapResult = objectMapperSimple(replacerCallbackWrappingReturnInPromise)(
			{
				a: "",
				b: true,
				c: false,
				d: (a: string, b: "lol") => true,
			},
			["a", "b", "c", "d"]
		);

		// test of type
		assert<Equals<typeof mapResult, {a: string; b: boolean; c: boolean; d: (a: string, b: "lol") => Promise<true>}>>;

		expect(mapResult).toMatchObject({a: "", b: true, c: false});
		expect(mapResult.d("a", "lol")).toBeInstanceOf(Promise);
		expect(await mapResult.d("a", "lol")).toEqual(true);
	});

	it("maps only those properties which are listed", async () => {
		const mapResult = objectMapperSimple(replacerCallbackWrappingReturnInPromise)(
			{
				a: () => true,
				b: () => true,
			},
			["a"]
		);

		// test of type
		assert<Equals<typeof mapResult, {a: () => Promise<true>; b: () => true}>>;

		expect(mapResult.a()).toBeInstanceOf(Promise);
		expect(await mapResult.a()).toEqual(true);
		expect(mapResult.b()).toEqual(true);
	});
});
