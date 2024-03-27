export type HigherKindedType<P = unknown> = {
    GenericValue: P;
    GenericResult: unknown;
};
export type ResolveHKT<f extends HigherKindedType, x> = (f & {
    GenericValue: x;
})["GenericResult"];
export type SimpleFunctionAsHKT<HKT extends HigherKindedType> = <P extends HKT["GenericValue"]>(param: P) => ResolveHKT<HKT, P>;
export type HigherKindedTypeForFn = {
    GenericValue: unknown[];
    GenericResult: unknown;
};
export type FunctionAsHKT<HKT extends HigherKindedTypeForFn> = <P extends HKT["GenericValue"]>(...params: P) => ResolveHKT<HKT, P>;
