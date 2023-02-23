import {CpsFn} from "../src/code/promisifier";
import {FunctionAsHKT, HigherKindedTypeForFn} from "../src/types/higherKindedTypes";
import {HigherKindedType} from "./sandbox";

type GetGeneric<G, P, R> = <g extends G>(p: P) => R;

export type HigherKindedFnSetup = {
	Generic: unknown;
	Params: unknown[];
	Result: unknown;
};

interface Implementation extends HigherKindedFnSetup {
	Generic: {
		A: any;
	};
	Params: [a: this["Generic"]["A"]];
	Result: this["Params"][0];
}

type ImplementFn<HigherKindedFnSetup> = <P extends HigherKindedFnSetup["GenericGeneric"]>(
	...params: HigherKindedFnSetup["GenericParams"]
) => HigherKindedFnSetup["GenericResult"];

type Res = ImplementFn<Implementation>;

const fn: Res = (a) => a;

const r = fn("");

type parametrizedFn = <T>(a: T) => void;

type afterParametrization = Parameters<parametrizedFn>;

interface HKTFnWGenerics {
	ParamsWithGeneric: (...params: any) => any;
	Return: any;
}

interface ExactHkt extends HKTFnWGenerics {
	ParamsWithGeneric: <T>(a: T) => any;
	Return: Parameters<this["ParamsWithGeneric"]>[0];
}

type ImplementFn2<HKT extends HKTFnWGenerics> = (...params: Parameters<HKT["ParamsWithGeneric"]>) => HKT["Return"];

type Test = ImplementFn2<ExactHkt>;

interface FHKTWithGenericsNextToParams extends HigherKindedType {
	GenericValue: [[A: string, B: number], [a: 0 | 1]];
	GenericResult: this["GenericValue"][1][0];
}

type Implement3<HKT extends HigherKindedType> = HKT["GenericValue"] extends [any[], [a: number]]
	? <Generics extends HKT["GenericValue"]>(a: Generics[0][0][0]) => HKT["GenericResult"]
	: never;

type Test3 = Implement3<FHKTWithGenericsNextToParams>;

const fn: Test3 = <Generics>(a) => {
	return a;
};

///////

interface FHKTWithGenericsSeparateFromParams extends HigherKindedFnSetup {
	Generic: [A: string, B: number];
	Params: [a: 0, b: 1];
	Result: this["Params"][1];
}

type Implement4<HKT extends HigherKindedFnSetup> = HKT["Generic"] extends any[]
	? HKT["Generic"] extends number[]
		? ?(<Generics extends HKT["Generic"]>(a: Generics[HKT["Params"][0]]) => HKT["Result"])
		: never
	: never;

///

interface PromisifierHkt extends HigherKindedTypeForFn {
	GenericResult: this["GenericValue"] extends [cpsFn: CpsFn<infer NormalParams, infer CbResults>]
		? (...params: NormalParams) => Promise<CbResults>
		: never;
}

type Testo = FunctionAsHKT<PromisifierHkt>;

const testo: Testo =
	<NormalParams extends any[], CbResults extends any[]>(cpsFn: CpsFn<NormalParams, CbResults>) =>
	(...params: NormalParams): Promise<CbResults> =>
		new Promise((res, rej) => {
			cpsFn.call(null, ...params, (err: any, ...results: CbResults) => (err ? rej(err) : res(results)));
		});

///////

type FunctionAsHKT2<HKT extends HigherKindedTypeForFn> = HKT["GenericValue"] extends [cpsFn: CpsFn<infer NP, infer CR>]
	? <NPG extends NP, CRG extends CR>(...params: HKT["GenericValue"]) => ResolveHKT<HKT, HKT["GenericValue"]>
	: never;

////////////

interface GPR {
	Generics: any[];
	Params: any[];
	Return: any;
}

interface GPRSpecific extends GPR {
	Params: this["Generics"] extends [infer A, infer B] ? [a: A[], b: B[]] : never;
	Return: this["Params"] extends [a: (infer A)[], B: (infer B)[]] ? (A | B)[] : never;
}

type GPRasHKT<GPR> = <P extends GPR["Generics"]>(...params: GPR["Params"]) => GPR["Return"];
