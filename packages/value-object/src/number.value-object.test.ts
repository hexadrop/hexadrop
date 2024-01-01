import { describe, expect, test } from 'bun:test';

import { EmptyNumberValueError, InvalidNumberValueTypeError } from './number.value-object.error';
import NumberValueObjectMother from './number.value-object.mother';

describe('NumberValueObject', () => {
	describe('constructor()', () => {
		test('should instantiate', () => {
			const vo = NumberValueObjectMother.create(5);
			expect(vo).toBeDefined();
			expect(vo.value).toBe(5);
		});
		test('should throw an error if undefined', () => {
			const fn = () => NumberValueObjectMother.invalidWithUndefined();
			expect(fn).toThrow(new EmptyNumberValueError());
		});
		test('should throw an error if invalid type', () => {
			const fn = () => NumberValueObjectMother.invalidWithString();
			expect(fn).toThrow(new InvalidNumberValueTypeError());
		});
	});
	describe('isBiggerThan()', () => {
		test('should works as expected', () => {
			const vo1 = NumberValueObjectMother.create(5);
			const bigger = NumberValueObjectMother.create(10);
			const less = NumberValueObjectMother.create(2);
			expect(vo1.isBiggerThan(bigger)).toBeFalsy();
			expect(vo1.isBiggerThan(less)).toBeTruthy();
		});
	});
	describe('isLesserThan()', () => {
		test('should works as expected', () => {
			const vo1 = NumberValueObjectMother.create(5);
			const bigger = NumberValueObjectMother.create(10);
			const less = NumberValueObjectMother.create(2);
			expect(vo1.isLesserThan(bigger)).toBeTruthy();
			expect(vo1.isLesserThan(less)).toBeFalsy();
		});
	});
	describe('isEqualsTo()', () => {
		test('should works as expected', () => {
			const vo1 = NumberValueObjectMother.create(5);
			const vo2 = NumberValueObjectMother.create(5);
			const less = NumberValueObjectMother.create(2);
			expect(vo1.isEqualsTo(vo2)).toBeTruthy();
			expect(vo1.isEqualsTo(less)).toBeFalsy();
		});
	});
	describe('toString()', () => {
		test('should works as expected', () => {
			const vo = NumberValueObjectMother.create(5);
			expect(vo.toString()).toBe('5');
		});
	});
});
