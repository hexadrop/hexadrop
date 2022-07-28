import { InvalidIdentifierFormatError } from '../../../../src/domain/error/InvalidIdentifierFormatError';
import { WordMother } from '../../../../src/test';

export class InvalidIdentifierFormatErrorMother {
    static create(value: string): InvalidIdentifierFormatError {
        return new InvalidIdentifierFormatError(value);
    }

    static creator() {
        return () => InvalidIdentifierFormatErrorMother.random();
    }

    static random() {
        const word = WordMother.random();
        return this.create(word);
    }
}
