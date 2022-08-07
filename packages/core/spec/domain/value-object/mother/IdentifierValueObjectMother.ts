import { IdentifierValueObject } from '../../../../src';
import { UuidMother } from '@hexadrop/mother';

export class IdentifierValueObjectMother {
	static create(value: string): IdentifierValueObject {
		return new IdentifierValueObject(value);
	}

	static creator() {
		return () => IdentifierValueObjectMother.random();
	}

	static random() {
		const value = UuidMother.random();
		return this.create(value);
	}

	static invalid() {
		return this.create('s');
	}
}
