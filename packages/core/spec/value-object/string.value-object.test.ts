import { describe, expect, test } from 'vitest';

import { EmptyStringValueError } from '../../src/error/empty-string-value.error';
import { InvalidStringValueError } from '../../src/error/invalid-string-value.error';
import { InvalidStringValueTypeError } from '../../src/error/invalid-string-value-type.error';
import { StringValueObjectMother } from './mother/string.value-object.mother';

describe('StringValueObject', () => {
	test('should create', () => {
		const value = 'as';
		const vo = StringValueObjectMother.create(value);
		const less = StringValueObjectMother.random();

		expect(vo).toBeDefined();
		expect(vo.value).toBe('as');
		expect(vo.toString()).toBe('as');
		expect(vo.isEqualsTo(less)).toBeFalsy();
	});
	test('should throw an error if undefined', () => {
		const fn = () => StringValueObjectMother.invalidWithUndefined();
		expect(fn).toThrow(EmptyStringValueError);
	});
	test('should throw an error if invalid type', () => {
		const fn = () => StringValueObjectMother.invalidWithNumber();
		expect(fn).toThrow(InvalidStringValueTypeError);
	});
	test('should throw an error if invalid value', () => {
		const fn = () => StringValueObjectMother.invalidValue();
		expect(fn).toThrow(InvalidStringValueError);
	});
});
