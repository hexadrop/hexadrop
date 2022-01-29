export abstract class NumberValueObject {
	readonly value: number;

	protected constructor(value: number) {
		this.value = value;
	}

	equalsTo(other: NumberValueObject): boolean {
		return this.value === other.value;
	}

	isBiggerThan(other: NumberValueObject): boolean {
		return this.value > other.value;
	}
}
