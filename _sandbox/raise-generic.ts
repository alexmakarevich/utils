// TODO: generalize and explain this, add to the actual lib

type TypeWithGeneric<G = never> = {children: RaiseGeneric<G>[]};

type RaiseGeneric<T> = T extends TypeWithGeneric<infer G>
	? G extends never
		? T
		: TypeWithGeneric | G | TypeWithGeneric<G>
	: T;

type FirstTWG = TypeWithGeneric<string>;
type SecondTWG = TypeWithGeneric<FirstTWG>;
type ThirdTWG = TypeWithGeneric<SecondTWG>;
type FourthTWG = TypeWithGeneric<number>;
type FifthTWG = TypeWithGeneric<FourthTWG>;

type TototalTWG = TypeWithGeneric<ThirdTWG | FifthTWG>;

type TestRaiseGeneric = RaiseGeneric<TypeWithGeneric>;
