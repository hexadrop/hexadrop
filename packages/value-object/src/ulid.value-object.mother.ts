import { ulid } from 'ulid';

import UlidValueObject from './ulid.value-object';

class ExtendsUlidValueObject extends UlidValueObject {}

export default class UlidValueObjectMother {
	static create(value: string): UlidValueObject {
		return new ExtendsUlidValueObject(value);
	}

	static invalid(): UlidValueObject {
		return UlidValueObjectMother.create('s');
	}

	static random(seedTime?: number): UlidValueObject {
		const value = ulid(seedTime);

		return UlidValueObjectMother.create(value);
	}
}
