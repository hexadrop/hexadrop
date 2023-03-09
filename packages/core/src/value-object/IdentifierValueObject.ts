import { v4 } from 'uuid';

import { InvalidIdentifierValueError } from '../error/InvalidIdentifierValueError';
import { StringValueObject } from './StringValueObject';

const REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class IdentifierValueObject extends StringValueObject {
	constructor(value: string, property?: string) {
		super(value, undefined, property);
		IdentifierValueObject.ensureIsValidUuid(value, property);
	}

	static random(): IdentifierValueObject {
		return new IdentifierValueObject(v4());
	}

	private static ensureIsValidUuid(id: string, property?: string): void {
		if (!REGEXP.test(id)) {
			throw new InvalidIdentifierValueError(property, id);
		}
	}
}
