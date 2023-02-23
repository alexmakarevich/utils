import {InferHigherKindedType, HigherKindedType} from "../src/code/objectMapper";

export type InferEvenHigherKindedType<f extends EventHigherKindedType, x, y> = (f & {GenericValue: x})["GenericResult"];

/** Based on https://github.com/microsoft/TypeScript/issues/40928 */
export type EventHigherKindedType<P extends HigherKindedType = HigherKindedType> = {
	GenericValue: P;
	GenericResult: unknown;
};

export interface ReplacerHkt extends HigherKindedType {
	GenericResult: this["GenericValue"] extends (...p: infer Params) => infer Return
		? (...p: [...Params]) => Promise<Return>
		: this["GenericValue"];
}
