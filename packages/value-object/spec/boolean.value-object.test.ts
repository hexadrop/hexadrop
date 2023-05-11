import { EmptyBooleanValueError, InvalidBooleanValueTypeError } from '@hexadrop/value-object';
import { describe, expect, test } from 'vitest';

import { BooleanValueObjectMother } from './mother/boolean.value-object.mother';

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
		expect(fn).toThrow(EmptyBooleanValueError);
	});
	test('should throw an error if invalid type', () => {
		const fn = () => BooleanValueObjectMother.invalidWithString();
		expect(fn).toThrow(InvalidBooleanValueTypeError);
	});
});
