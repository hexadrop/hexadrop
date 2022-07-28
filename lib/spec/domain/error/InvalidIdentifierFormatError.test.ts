import { describe, expect, test } from 'vitest';
import { WordMother } from '../../../src/test';
import { InvalidIdentifierFormatErrorMother } from './mother/InvalidIdentifierFormatErrorMother';


describe('InvalidIdentifierFormatError', () => {
    test('should create from string', () => {
        const value = WordMother.random();
        const expectedError = InvalidIdentifierFormatErrorMother.create(value);
        expect(expectedError.message).toBe(`<Identifier> does not allow the value '${value}'`);
        expect(expectedError.errorCode).toBe(400);
        expect(expectedError.code).toBe('HEX(400)');
        expect(expectedError.name).toBe('InvalidIdentifierFormatError');
        expect(expectedError.stack).toBeDefined();
    });
});
