export abstract class DateValueObject {
	readonly value: Date;

	protected constructor(value: Date) {
		this.value = value;
	}

	toString(): string {
		return this.value.toISOString();
	}
}
