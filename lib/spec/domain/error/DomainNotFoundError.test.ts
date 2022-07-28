import { describe, test, expect } from 'vitest';
import { UuidMother } from '../../../src/test';
import { DomainNotFoundErrorMother } from './mother/DomainNotFoundErrorMother';


describe('DomainNotFoundError', () => {
    test('should create from string', () => {
        const domain = 'User';
        const id = UuidMother.random();
        const param = 'code';
        const expectedError = DomainNotFoundErrorMother.create(domain, id, param);
        expect(expectedError.message).toBe(`${domain} with ${param} '${id}' was not found`);
        expect(expectedError.errorCode).toBe(404);
        expect(expectedError.code).toBe('HEX(404)');
        expect(expectedError.name).toBe('DomainNotFoundError');
        expect(expectedError.stack).toBeDefined();
    });
    test('should create from string and code', () => {
        const domain = 'User';
        const id = UuidMother.random();
        const param = 'code';
        const expectedError = DomainNotFoundErrorMother.create(domain, id, param, 'HEX(500404)');
        expect(expectedError.message).toBe(`${domain} with ${param} '${id}' was not found`);
        expect(expectedError.errorCode).toBe(500404);
        expect(expectedError.code).toBe('HEX(500404)');
        expect(expectedError.name).toBe('DomainNotFoundError');
        expect(expectedError.stack).toBeDefined();
    });
});
