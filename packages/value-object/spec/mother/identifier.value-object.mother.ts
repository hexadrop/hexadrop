import { UuidMother } from '@hexadrop/testing';
import { IdentifierValueObject } from '@hexadrop/value-object';

class ExtendsIdentifierValueObject extends IdentifierValueObject {}

export class IdentifierValueObjectMother {
	static create(value: string): IdentifierValueObject {
		return new ExtendsIdentifierValueObject(value);
	}

	static invalid(): IdentifierValueObject {
		return this.create('s');
	}

	static random(): IdentifierValueObject {
		const value = UuidMother.random();

		return this.create(value);
	}
}
