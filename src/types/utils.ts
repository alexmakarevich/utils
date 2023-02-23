/** returns given type but with specified keys made optional */
export type PartialPartial<T, Keys extends keyof T> = Omit<T, Keys> & Partial<Pick<T, Keys>>;

/** returns a union of the type's values */
export type Enummed<T> = T[keyof T];

/** combines two arrays */
export type MergeTwoArrays<A extends any[], B extends any[]> = [...A, ...B];
