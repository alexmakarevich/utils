import { MergeTwoArrays } from "../types/utils";
export type CpsFn<NormalParams extends any[], CbResults extends any[]> = (...params: MergeTwoArrays<NormalParams, [CpsCallback<CbResults>]>) => void;
type CpsCallback<CbResults extends any[]> = (err: any, ...results: CbResults) => void;
export declare const promisifier: <NormalParams extends any[], CbResults extends any[]>(cpsFn: CpsFn<NormalParams, CbResults>, context?: Object) => (...params: NormalParams) => Promise<CbResults>;
export {};
