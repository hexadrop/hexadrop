import { InvalidBooleanValueTypeError } from '../error/InvalidBooleanValueTypeError';

export abstract class BooleanValueObject {
	readonly value: boolean;

	protected constructor(value: boolean) {
		BooleanValueObject.notEmpty(value);
		BooleanValueObject.allowedValue(value);
		this.value = value;
	}

	isEqualsTo(other: BooleanValueObject): boolean {
		return this.value === other.value;
	}

	toString(): string {
		return JSON.stringify(this.value);
	}

	private static notEmpty(value: unknown) {
		if (value === null || value === undefined) throw new InvalidBooleanValueTypeError();
	}

	private static allowedValue(value: unknown) {
		if (typeof value !== 'boolean') throw new InvalidBooleanValueTypeError();
	}
}
