export abstract class BooleanValueObject {
	readonly value: boolean;

	protected constructor(value: boolean) {
		this.value = value;
	}

	equalsTo(other: BooleanValueObject): boolean {
		return this.value === other.value;
	}
}
