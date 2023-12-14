import { describe, expect, test } from 'bun:test';

import { EmptyBooleanValueError, InvalidBooleanValueTypeError } from './boolean.value-object.error';
import BooleanValueObjectMother from './boolean.value-object.mother';

describe('BooleanValueObject', () => {
	test('should create', () => {
		const vo = BooleanValueObjectMother.create(true);
		const compare = BooleanValueObjectMother.create(false);

		expect(vo).toBeDefined();
		expect(vo.value).toBe(true);
		expect(vo.toString()).toBe('true');
		expect(vo.isEqualsTo(compare)).toBeFalsy();
	});
	test('should throw an error if undefined', () => {
		const fn = () => BooleanValueObjectMother.invalidWithUndefined();
		expect(fn).toThrow(new EmptyBooleanValueError());
	});
	test('should throw an error if invalid type', () => {
		const fn = () => BooleanValueObjectMother.invalidWithString();
		expect(fn).toThrow(new InvalidBooleanValueTypeError());
	});
});
