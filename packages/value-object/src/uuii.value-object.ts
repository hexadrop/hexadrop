import StringValueObject from './string.value-object';
import InvalidUuiiValueError from './uuii.value-object.error';

const REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default abstract class UuiiValueObject extends StringValueObject {
	constructor(value: string, property?: string) {
		super(value, undefined, property);
		UuiiValueObject.ensureIsValidUuid(value, property);
	}

	static random(): string {
		return crypto.randomUUID();
	}

	private static ensureIsValidUuid(id: string, property?: string): void {
		if (!REGEXP.test(id)) {
			throw new InvalidUuiiValueError(id, property);
		}
	}
}
