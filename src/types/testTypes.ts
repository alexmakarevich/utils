// these types are for testing other types

export const assert = <T extends true>() => {};

export type Not<T> = T extends true ? false : true;
