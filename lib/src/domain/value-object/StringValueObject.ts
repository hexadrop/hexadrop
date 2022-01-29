export abstract class StringValueObject<S extends string = string> {
	readonly value: S;

	protected constructor(value: S) {
		this.value = value;
	}

	toString(): string {
		return this.value;
	}
}
