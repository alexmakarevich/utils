import {MergeTwoArrays} from "../types/utils";

export type CpsFn<NormalParams extends any[], CbResults extends any[]> = (
	...params: MergeTwoArrays<NormalParams, [CpsCallback<CbResults>]>
) => void;

type CpsCallback<CbResults extends any[]> = (err: any, ...results: CbResults) => void;

export const promisifier =
	<NormalParams extends any[], CbResults extends any[]>(cpsFn: CpsFn<NormalParams, CbResults>, context?: Object) =>
	(...params: NormalParams): Promise<CbResults> =>
		new Promise((res, rej) => {
			cpsFn.call(context ?? null, ...params, (err: any, ...results: CbResults) => (err ? rej(err) : res(results)));
		});

interface Params {
	params: any;
}

interface Params2 extends Params {
	generic: "s";
	params: this["generic"];
}
