import { describe, expect, test } from 'vitest';

import { EmptyErrorCodeError, InvalidErrorCodeError } from '../../src';
import { InvalidDomainErrorMother } from './mother/invalid-domain.error.mother';

describe('DomainError', () => {
	test('should throw an error if undefined code', () => {
		const fn = () => InvalidDomainErrorMother.undefinedErrorCode();
		expect(fn).toThrow(EmptyErrorCodeError);
	});
	test('should throw an error if empty code', () => {
		const fn = () => InvalidDomainErrorMother.emptyErrorCode();
		expect(fn).toThrow(EmptyErrorCodeError);
	});
	test('should throw an error if invaliKKd code', () => {
		const fn = () => InvalidDomainErrorMother.invalidErrorCode();
		expect(fn).toThrow(InvalidErrorCodeError);
	});
	test('should throw an error if empty name', () => {
		const fn = () => InvalidDomainErrorMother.invalidErrorCode();
		expect(fn).toThrow(InvalidErrorCodeError);
	});
	test('name should be equals to DomainError if empty name', () => {
		const error = InvalidDomainErrorMother.emptyName();
		expect(error.name).toBe('DomainError');
	});
	test('name should be equals to DomainError if undefined name', () => {
		const error = InvalidDomainErrorMother.undefinedName();
		expect(error.name).toBe('DomainError');
	});
});
