const isString = (something: unknown) => {
	if (typeof something === "string") {
		return something;
	}
	throw "x";
};

const isNumber = (something: unknown) => {
	if (typeof something === "number") {
		return something;
	}
	throw "x";
};

const isObject = (something: unknown) => {
	if (typeof something === "object") {
		return something;
	}
	throw "x";
};

const isBoolean = (something: unknown) => {
	if (typeof something === "boolean") {
		return something;
	}
	throw "x";
};

const isBigInt = (something: unknown) => {
	if (typeof something === "bigint") {
		return something;
	}
	throw "x";
};

const isFunction = (something: unknown) => {
	if (typeof something === "function") {
		return something;
	}
	throw "x";
};

const isSymbol = (something: unknown) => {
	if (typeof something === "symbol") {
		return something;
	}
	throw "x";
};

const isUndefined = (something: unknown) => {
	if (typeof something === "undefined") {
		return something;
	}
	throw "x";
};

const oneOf = (possibleType: (typeof isNumber | typeof isString)[]) => (something: unknown) => {
	const reduced = possibleType.reduce((type) => {
		try {
			return isNumber(something);
		} catch {
			return undefined;
		}
	});
};

const isSpecificArray = (possibleMembers: (typeof isNumber | typeof isString)[]) => (something: unknown) => {
	if (Array.isArray(something)) {
		return something.map((member) =>
			// TODO: actually parse every type
			possibleMembers[0](member)
		);
	}
	throw "x";
};
