import { describe, expect, test } from 'vitest';
import { InvalidIdentifierValueError } from '../../src/error/InvalidIdentifierValueError';
import { IdentifierValueObjectMother } from './mother/IdentifierValueObjectMother';

describe('IdentifierValueObject', () => {
	test('should create', () => {
		const uuid = 'f3cf177a-437b-408a-a967-607891add1df';
		const vo = IdentifierValueObjectMother.create(uuid);
		const other = IdentifierValueObjectMother.random();

		expect(vo).toBeDefined();
		expect(vo.value).toBe(uuid);
		expect(vo.toString()).toBe('f3cf177a-437b-408a-a967-607891add1df');
		expect(vo.isEqualsTo(other)).toBeFalsy();
	});
	test('should throw an error if invalid', () => {
		const fn = () => IdentifierValueObjectMother.invalid();
		expect(fn).toThrow(InvalidIdentifierValueError);
	});
});
