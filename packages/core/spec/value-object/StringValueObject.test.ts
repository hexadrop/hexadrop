import { describe, expect, test } from 'vitest';
import { EmptyStringValueError } from '../../src/error/EmptyStringValueError';
import { InvalidStringValueError } from '../../src/error/InvalidStringValueError';
import { InvalidStringValueTypeError } from '../../src/error/InvalidStringValueTypeError';
import { StringValueObjectMother } from './mother/StringValueObjectMother';

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
