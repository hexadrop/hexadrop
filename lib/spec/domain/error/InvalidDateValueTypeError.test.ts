import { describe, expect, test } from 'vitest';
import { InvalidDateValueTypeErrorMother } from './mother/InvalidDateValueTypeErrorMother';

describe('InvalidDateValueTypeError', () => {
    test('should create from string', () => {
        const expectedError = InvalidDateValueTypeErrorMother.create();
        expect(expectedError.message).toBe(`A DateValueObject must only contains date values`);
        expect(expectedError.errorCode).toBe(400);
        expect(expectedError.code).toBe('HEX(400)');
        expect(expectedError.name).toBe('InvalidDateValueTypeError');
        expect(expectedError.stack).toBeDefined();
    });
});
