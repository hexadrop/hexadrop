import { describe, expect, test } from 'bun:test';

import { EmptyErrorCodeError, InvalidErrorCodeError } from './domain-error';
import InvalidDomainErrorMother from './domain-error.mother';

describe('DomainError', () => {
	test('should throw an error if undefined code', () => {
		const fn = () => InvalidDomainErrorMother.undefinedErrorCode();
		expect(fn).toThrow(new EmptyErrorCodeError());
	});
	test('should throw an error if empty code', () => {
		const fn = () => InvalidDomainErrorMother.emptyErrorCode();
		expect(fn).toThrow(new EmptyErrorCodeError());
	});
	test('should throw an error if invaliKKd code', () => {
		const fn = () => InvalidDomainErrorMother.invalidErrorCode();
		expect(fn).toThrow(new InvalidErrorCodeError());
	});
	test('should throw an error if empty name', () => {
		const fn = () => InvalidDomainErrorMother.invalidErrorCode();
		expect(fn).toThrow(new InvalidErrorCodeError());
	});
	test('name should be equals to DomainError if empty name', () => {
		const error = InvalidDomainErrorMother.emptyName();
		expect(error.name).toBe('DomainError');
	});
	test('name should be equals to DomainError if undefined name', () => {
		const error = InvalidDomainErrorMother.undefinedName();
		expect(error.name).toBe('DomainError');
	});

	describe('EmptyErrorCodeError', () => {
		test('should create from string', () => {
			const expectedError = new EmptyErrorCodeError();
			expect(expectedError.message).toBe('DomainError code can not be null or empty');
			expect(expectedError.errorCode).toBe(400);
			expect(expectedError.code).toBe('HEX(400)');
			expect(expectedError.name).toBe('EmptyErrorCodeError');
			expect(expectedError.stack).toBeDefined();
		});
	});
	describe('InvalidErrorCodeError', () => {
		test('should create from string', () => {
			const expectedError = new InvalidErrorCodeError();
			expect(expectedError.message).toBe(
				`DomainError code must follow the next Regexp '/[A-Z][A-Z][A-Z]((d{3}|d{6}))/'`
			);
			expect(expectedError.errorCode).toBe(400);
			expect(expectedError.code).toBe('HEX(400)');
			expect(expectedError.name).toBe('InvalidErrorCodeError');
			expect(expectedError.stack).toBeDefined();
		});
	});
});
