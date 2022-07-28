import { InvalidNumberValueTypeError } from '../../../../src/domain/error/InvalidNumberValueTypeError';

export class InvalidNumberValueTypeErrorMother {
    static create(): InvalidNumberValueTypeError {
        return new InvalidNumberValueTypeError();
    }

    static creator() {
        return () => InvalidNumberValueTypeErrorMother.random();
    }

    static random() {
        return this.create();
    }
}
