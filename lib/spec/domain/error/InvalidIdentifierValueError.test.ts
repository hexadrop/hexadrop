import { describe, expect, test } from 'vitest';
import { WordMother } from '../../../src/test';
import { InvalidIdentifierValueErrorMother } from './mother/InvalidIdentifierValueErrorMother';

describe('InvalidIdentifierValueError', () => {
    test('should create from string', () => {
        const value = WordMother.random();
        const expectedError = InvalidIdentifierValueErrorMother.create(value);
        expect(expectedError.message).toBe(`<Identifier> does not allow the value '${value}'`);
        expect(expectedError.errorCode).toBe(400);
        expect(expectedError.code).toBe('HEX(400)');
        expect(expectedError.name).toBe('InvalidIdentifierValueError');
        expect(expectedError.stack).toBeDefined();
    });
});
