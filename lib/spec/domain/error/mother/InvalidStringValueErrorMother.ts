import { InvalidStringValueError } from '../../../../src/domain/error/InvalidStringValueError';
import { WordMother } from '../../../../src/test';

export class InvalidStringValueErrorMother {
    static create(value: string): InvalidStringValueError {
        return new InvalidStringValueError(value);
    }

    static creator() {
        return () => InvalidStringValueErrorMother.random();
    }

    static random() {
        const value = WordMother.random();
        return this.create(value);
    }
}
