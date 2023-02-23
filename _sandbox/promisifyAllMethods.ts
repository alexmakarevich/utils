import {objectMapperComplex} from "../src/code/objectMapper";
import {CpsFn, promisifier} from "../src/code/promisifier";

type O = {[k in string]: string};

export const promisifyAllMethods = <
	ObjectWithCpsMethods extends {[k in string]: CpsFn<any[], any[]>},
	Props extends keyof ObjectWithCpsMethods
>(
	objectWithCpsmethods: ObjectWithCpsMethods,
	props: Props[]
) => {
	return objectMapperComplex(promisifier)(objectWithCpsmethods, props);
};
