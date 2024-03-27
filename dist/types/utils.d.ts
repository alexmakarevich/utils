export type PartialPartial<T, Keys extends keyof T> = Omit<T, Keys> & Partial<Pick<T, Keys>>;
export type Enummed<T> = T[keyof T];
export type MergeTwoArrays<A extends any[], B extends any[]> = [...A, ...B];
