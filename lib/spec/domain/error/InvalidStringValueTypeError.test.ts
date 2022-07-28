import { describe, expect, test } from 'vitest';
import { InvalidStringValueTypeErrorMother } from './mother/InvalidStringValueTypeErrorMother';

describe('InvalidStringValueTypeError', () => {
    test('should create from string', () => {
        const expectedError = InvalidStringValueTypeErrorMother.create();
        expect(expectedError.message).toBe(`A StringValueObject must only contains string values`);
        expect(expectedError.errorCode).toBe(400);
        expect(expectedError.code).toBe('HEX(400)');
        expect(expectedError.name).toBe('InvalidStringValueTypeError');
        expect(expectedError.stack).toBeDefined();
    });
});
