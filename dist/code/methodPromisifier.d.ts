import { CpsFn } from "../code/promisifier";
export declare const promisifyAllMethods: <ObjectWithCpsMethods extends {
    [x: string]: CpsFn<any[], any[]>;
}, Props extends keyof ObjectWithCpsMethods>(objectWithCpsmethods: ObjectWithCpsMethods, props: Props[]) => { [k in keyof ObjectWithCpsMethods]: k extends Props ? ObjectWithCpsMethods[k] extends CpsFn<infer NormalParams extends any[], infer CbResults extends any[]> ? (...params: NormalParams) => Promise<CbResults> : never : ObjectWithCpsMethods[k]; };
