import { describe, expect, test } from 'bun:test';

import {
	EmptyStringValueError,
	InvalidStringValueError,
	InvalidStringValueTypeError,
} from './string.value-object.error';
import StringValueObjectMother from './string.value-object.mother';

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
		expect(fn).toThrow(new EmptyStringValueError());
	});
	test('should throw an error if invalid type', () => {
		const fn = () => StringValueObjectMother.invalidWithNumber();
		expect(fn).toThrow(new InvalidStringValueTypeError());
	});
	test('should throw an error if invalid value', () => {
		const fn = () => StringValueObjectMother.invalidValue();
		expect(fn).toThrow(new InvalidStringValueError('melon'));
	});
});
