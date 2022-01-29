import { v4 } from 'uuid';
import { InvalidArgumentError } from '../error/InvalidArgumentError';

const REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class IdentifierValueObject {
	readonly value: string;

	constructor(value: string) {
		IdentifierValueObject.ensureIsValidUuid(value);

		this.value = value;
	}

	static random(): IdentifierValueObject {
		return new IdentifierValueObject(v4());
	}

	toString(): string {
		return this.value;
	}

	private static ensureIsValidUuid(id: string): void {
		if (!REGEXP.test(id)) {
			throw new InvalidArgumentError(`<Identifier> does not allow the value <${id}>`);
		}
	}
}
