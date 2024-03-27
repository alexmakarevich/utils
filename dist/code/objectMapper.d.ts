import { FunctionAsHKT, HigherKindedType, HigherKindedTypeForFn, ResolveHKT, SimpleFunctionAsHKT } from "../types/higherKindedTypes";
export declare const objectMapperSimple: <HKT extends HigherKindedType>(callback: SimpleFunctionAsHKT<HKT>) => <P, Properties extends keyof P>(p: P, properties: Properties[]) => { [k in keyof P]: k extends Properties ? ResolveHKT<HKT, P[k]> : P[k]; };
export declare const objectMapperComplex: <HKT extends HigherKindedTypeForFn>(callback: FunctionAsHKT<HKT>) => <P, Properties extends keyof P>(p: P, properties: Properties[]) => { [k in keyof P]: k extends Properties ? ResolveHKT<HKT, [P[k]]> : P[k]; };