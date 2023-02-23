/// exact case

import {CpsFn} from "../src/code/promisifier";
import {ResolveHKT, SimpleFunctionAsHKT} from "../src/types/higherKindedTypes";
import {HigherKindedType} from "./sandbox";

interface PromisifierHKT extends HigherKindedType {
	GenericResult: this["GenericValue"] extends [infer NP extends any[], infer CbR extends any[]]
		? <NormalParams extends NP, CbResults extends CbR>(
				cpsFn: CpsFn<NormalParams, CbResults>
		  ) => (...params: NormalParams) => Promise<CbResults>
		: never;
}

type GenericFnAsHkt<HKT extends HigherKindedType, Generics extends any[]> = ResolveHKT<HKT, Generics>;

type PromisifierAsHKT = GenericFnAsHkt<PromisifierHKT, [any[], any[]]>;

const promisifierHkt: PromisifierAsHKT =
	<NP extends any[], CbR extends any[]>(cpsFn: CpsFn<NP, CbR>) =>
	(...params) =>
		new Promise((res, rej) => {
			cpsFn.call(null, ...params, (err: any, ...results: CbR) =>
				err
					? rej(err)
					: // @ts-ignore TODO: fix the ignore
					  res(results)
			);
		});

const sampleHktFn = (a: boolean, b: {c: string}, cb: (err: any, result: string) => void) => {
	cb(null, "something");
};

const promisified = promisifierHkt(sampleHktFn);

const [result] = await promisified(true, {c: "ssss"});

export const objectMapper =
	<HKT extends HigherKindedType, HKTGenerics extends any[]>(callback: GenericFnAsHkt<HKT, HKTGenerics>) =>
	<P, Properties extends keyof P>(p: P, properties: Properties[]) => {
		const newObject = {} as {[k in keyof P]: k extends Properties ? ResolveHKT<HKT, P[k]> : P[k]};

		for (const prop in p) {
			// @ts-ignore
			newObject[prop] = properties.includes(prop) ? callback(p[prop]) : p[prop];
		}

		return newObject;
	};

export const promisifyAllMethods = <
	ObjectWithCpsMethods extends {[k in string]: CpsFn<any[], any[]>},
	Props extends keyof ObjectWithCpsMethods
>(
	objectWithCpsmethods: ObjectWithCpsMethods,
	props: Props[]
) => {
	return objectMapper(promisifierHkt)(objectWithCpsmethods, props);
};
