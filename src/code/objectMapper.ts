import {
	FunctionAsHKT,
	HigherKindedType,
	HigherKindedTypeForFn,
	ResolveHKT,
	SimpleFunctionAsHKT,
} from "../types/higherKindedTypes";

export const objectMapperSimple =
	<HKT extends HigherKindedType>(callback: SimpleFunctionAsHKT<HKT>) =>
	<P, Properties extends keyof P>(p: P, properties: Properties[]) => {
		const newObject = {} as {[k in keyof P]: k extends Properties ? ResolveHKT<HKT, P[k]> : P[k]};

		for (const prop in p) {
			// @ts-ignore
			newObject[prop] = properties.includes(prop) ? callback(p[prop]) : p[prop];
		}

		return newObject;
	};

export const objectMapperComplex =
	<HKT extends HigherKindedTypeForFn>(callback: FunctionAsHKT<HKT>) =>
	<P, Properties extends keyof P>(p: P, properties: Properties[]) => {
		const newObject = {} as {[k in keyof P]: k extends Properties ? ResolveHKT<HKT, [P[k]]> : P[k]};

		for (const prop in p) {
			// @ts-ignore
			newObject[prop] = properties.includes(prop) ? callback(p[prop]) : p[prop];
		}

		return newObject;
	};
