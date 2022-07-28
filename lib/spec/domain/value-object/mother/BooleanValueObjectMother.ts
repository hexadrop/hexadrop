import { BooleanValueObject } from '../../../../src';
import { BooleanMother } from '../../../../src/test';

export class FakeBooleanValueObject extends BooleanValueObject {
    constructor(value: boolean) {
        super(value);
    }

}

export class InvalidStringBooleanValueObject extends BooleanValueObject {
    constructor() {
        // @ts-ignore
        super('a');
    }
}

export class UndefinedStringBooleanValueObject extends BooleanValueObject {
    constructor() {
        // @ts-ignore
        super(undefined);
    }
}

export class BooleanValueObjectMother {
    static create(value: boolean): BooleanValueObject {
        return new FakeBooleanValueObject(value);
    }

    static creator() {
        return () => BooleanValueObjectMother.random();
    }

    static random() {
        const value = BooleanMother.random();
        return this.create(value);
    }

    static invalidWithString() {
        return new InvalidStringBooleanValueObject();
    }

    static invalidWithUndefined() {
        return new UndefinedStringBooleanValueObject();
    }
}
