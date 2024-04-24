import { describe, expect, test } from 'bun:test';

import DomainNotFoundErrorMother from './not-found.mother';

describe('DomainNotFoundError', () => {
	test('should create from domain, id', () => {
		const domain = 'User';
		const id = crypto.randomUUID();
		const expectedError = DomainNotFoundErrorMother.create(domain, id);
		expect(expectedError.message).toBe(`${domain} with id '${id}' was not found`);
		expect(expectedError.errorCode).toBe(404);
		expect(expectedError.code).toBe('HEX(404)');
		expect(expectedError.name).toBe('DomainNotFoundError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from domain, id, param', () => {
		const domain = 'User';
		const id = crypto.randomUUID();
		const parameter = 'code';
		const expectedError = DomainNotFoundErrorMother.create(domain, id, parameter);
		expect(expectedError.message).toBe(`${domain} with ${parameter} '${id}' was not found`);
		expect(expectedError.errorCode).toBe(404);
		expect(expectedError.code).toBe('HEX(404)');
		expect(expectedError.name).toBe('DomainNotFoundError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from domain, id, param and code', () => {
		const domain = 'User';
		const id = crypto.randomUUID();
		const parameter = 'code';
		const expectedError = DomainNotFoundErrorMother.create(domain, id, parameter, undefined, 'HEX(500404)');
		expect(expectedError.message).toBe(`${domain} with ${parameter} '${id}' was not found`);
		expect(expectedError.errorCode).toBe(500_404);
		expect(expectedError.code).toBe('HEX(500404)');
		expect(expectedError.name).toBe('DomainNotFoundError');
		expect(expectedError.stack).toBeDefined();
	});
});
