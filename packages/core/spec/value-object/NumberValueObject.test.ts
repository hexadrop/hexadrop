import { describe, expect, test } from 'vitest';
import { InvalidNumberValueTypeError } from '../../src/error/InvalidNumberValueTypeError';
import { NumberValueObjectMother } from './mother/NumberValueObjectMother';

describe('NumberValueObject', () => {
	test('should create', () => {
		const vo = NumberValueObjectMother.create(5);
		const less = NumberValueObjectMother.create(2);
		const bigger = NumberValueObjectMother.create(10);

		expect(vo).toBeDefined();
		expect(vo.value).toBe(5);
		expect(vo.toString()).toBe('5');
		expect(vo.isEqualsTo(less)).toBeFalsy();
		expect(vo.isLesserThan(less)).toBeFalsy();
		expect(vo.isBiggerThan(bigger)).toBeFalsy();
	});
	test('should throw an error if undefined', () => {
		const fn = () => NumberValueObjectMother.invalidWithUndefined();
		expect(fn).toThrow(InvalidNumberValueTypeError);
	});
	test('should throw an error if invalid type', () => {
		const fn = () => NumberValueObjectMother.invalidWithString();
		expect(fn).toThrow(InvalidNumberValueTypeError);
	});
});
