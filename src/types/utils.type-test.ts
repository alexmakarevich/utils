import {assert} from "./testtypes";
import {Equals} from "tsafe/Equals";
import {Enummed, PartialPartial} from "./utils";

// Enummed
assert<Equals<Enummed<{a: ""; b: number; c: {d: boolean}}>, "" | number | {d: boolean}>>;

// PartialPartial
type SourceType = {a: string; b: number; c: {d: boolean; e: () => "f"}};
type ExpectedAfterPartialPartial = {a?: string; b: number; c?: {d: boolean; e: () => "f"}};

assert<Equals<PartialPartial<SourceType, "a" | "c">, ExpectedAfterPartialPartial>>;
