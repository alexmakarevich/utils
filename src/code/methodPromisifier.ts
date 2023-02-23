import {CpsFn, promisifier} from "../code/promisifier";
import {HigherKindedType, SimpleFunctionAsHKT} from "../types/higherKindedTypes";
import {objectMapperSimple} from "./objectMapper";

interface PromisifierFnHkt extends HigherKindedType {
	GenericResult: this["GenericValue"] extends CpsFn<infer NormalParams extends any[], infer CbResults extends any[]>
		? (...params: NormalParams) => Promise<CbResults>
		: never;
}

// TODO: any way to get rid of ignore, e.g. in the case below?
// /** @ts-ignore  */
// export const promisifierHkt: SimpleFunctionAsHKT<PromisifierFnHkt> = promisifier;

export const promisifyAllMethods = <
	ObjectWithCpsMethods extends {[k in string]: CpsFn<any[], any[]>},
	Props extends keyof ObjectWithCpsMethods
>(
	objectWithCpsmethods: ObjectWithCpsMethods,
	props: Props[]
) => {
	return objectMapperSimple(promisifier as SimpleFunctionAsHKT<PromisifierFnHkt>)(objectWithCpsmethods, props);
};
