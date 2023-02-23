import {CpsFn} from "../src/code/promisifier";
import {
	HigherKindedTypeForFn,
	FunctionAsHKT,
	ResolveHKT,
	HigherKindedType,
	SimpleFunctionAsHKT,
} from "../src/types/higherKindedTypes";

interface PromisifierAsHkt extends HigherKindedTypeForFn {
	GenericResult: this["GenericValue"] extends [
		cpsFn: CpsFn<infer NormalParams extends any[], infer CbResults extends any[]>
	]
		? (...params: NormalParams) => Promise<CbResults>
		: never;
}

type ResolvedPromisifier = ResolveHKT<PromisifierAsHkt, [cps: CpsFn<[a: string], [r: string]>]>;

export const promisifierHkt: FunctionAsHKT<PromisifierAsHkt> =
	<NormalParams extends any[], CbResults extends any[]>(cpsFn: CpsFn<NormalParams, CbResults>) =>
	(...params: NormalParams): Promise<CbResults> =>
		new Promise((res, rej) => {
			cpsFn.call(null, ...params, (err: any, ...results: CbResults) => (err ? rej(err) : res(results)));
		});

const sampleCpsFn = (a: boolean, b: {c: string}, cb: (err: any, result: string) => void) => {
	cb(null, "something");
};

const promisified = promisifierHkt(sampleCpsFn);

const [result] = await promisified(true, {c: "ssss"});

export const promisifyAllMethods = <
	ObjectWithCpsMethods extends {[k in string]: CpsFn<any[], any[]>},
	Props extends keyof ObjectWithCpsMethods
>(
	objectWithCpsmethods: ObjectWithCpsMethods,
	props: Props[]
) => {
	return objectMapper(promisifierHkt)(objectWithCpsmethods, props);
};

const srcObject = {
	aCpsMethod: sampleCpsFn,
};

const tryPromisifyAllMethods = promisifyAllMethods(srcObject, ["aCpsMethod"]);

// THIS ACTUALLY FUCKING WORKS

export const objectMapper =
	<HKT extends HigherKindedTypeForFn>(callback: FunctionAsHKT<HKT>) =>
	<P, Properties extends keyof P>(p: P, properties: Properties[]) => {
		const newObject = {} as {[k in keyof P]: k extends Properties ? ResolveHKT<HKT, [P[k]]> : P[k]};

		for (const prop in p) {
			// @ts-ignore
			newObject[prop] = properties.includes(prop) ? callback(p[prop]) : p[prop];
		}

		return newObject;
	};
