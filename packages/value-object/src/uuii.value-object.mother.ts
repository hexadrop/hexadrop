import UuiiValueObject from './uuii.value-object';

class ExtendsUuiiValueObject extends UuiiValueObject {}

const UuiiValueObjectMother = {
	create(value: string): UuiiValueObject {
		return new ExtendsUuiiValueObject(value);
	},

	invalid(): UuiiValueObject {
		return UuiiValueObjectMother.create('s');
	},

	random(): UuiiValueObject {
		const value = crypto.randomUUID();

		return UuiiValueObjectMother.create(value);
	},
};

export default UuiiValueObjectMother;
