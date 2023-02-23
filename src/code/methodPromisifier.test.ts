import {promisifyAllMethods} from "./methodPromisifier";

// TODO: properly test
const sampleCpsFn = (a: boolean, b: {c: string}, cb: (err: any, result: string) => void) => {
	cb(null, "something");
};

const promisified = promisifierHkt(sampleCpsFn);

const [result] = await promisified(true, {c: "ssss"});

const srcObject = {
	aCpsMethod: sampleCpsFn,
};

const tryPromisifyAllMethods = promisifyAllMethods(srcObject, ["aCpsMethod"]);
