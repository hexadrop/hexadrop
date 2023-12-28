import { faker } from '@faker-js/faker';
import { describe, expect, test } from 'bun:test';

import { EmptyDateValueError, InvalidDateValueTypeError } from './date.value-object.error';
import DateValueObjectMother from './date.value-object.mother';

describe('DateValueObject', () => {
	describe('constructor()', () => {
		test('should instantiate', () => {
			const voValue = new Date(1659011272040);
			const vo = DateValueObjectMother.create(voValue);

			expect(vo).toBeDefined();
			expect(vo.value).toBe(voValue);
		});
		test('should throw an error if arg is undefined', () => {
			const fn = () => DateValueObjectMother.invalidWithUndefined();
			expect(fn).toThrow(new EmptyDateValueError());
		});
		test('should throw an error if arg is invalid value', () => {
			const fn = () => DateValueObjectMother.invalidWithString();
			expect(fn).toThrow(new InvalidDateValueTypeError());
		});
	});
	describe('isAfterThan()', () => {
		test('should return true if value object is after that', () => {
			const voValue = new Date(1659011272040);
			const soonValue = faker.date.soon(undefined, voValue);
			const recentValue = faker.date.recent(undefined, voValue);
			const vo = DateValueObjectMother.create(voValue);
			const recent = DateValueObjectMother.create(recentValue);
			const soon = DateValueObjectMother.create(soonValue);

			expect(vo.isAfterThan(recent)).toBeTruthy();
			expect(vo.isAfterThan(soon)).toBeFalsy();
		});
	});
	describe('isBeforeThan()', () => {
		test('should return true if value object is before that', () => {
			const voValue = new Date(1659011272040);
			const soonValue = faker.date.soon(undefined, voValue);
			const recentValue = faker.date.recent(undefined, voValue);
			const vo = DateValueObjectMother.create(voValue);
			const recent = DateValueObjectMother.create(recentValue);
			const soon = DateValueObjectMother.create(soonValue);

			expect(vo.isBeforeThan(recent)).toBeFalsy();
			expect(vo.isBeforeThan(soon)).toBeTruthy();
		});
	});
	describe('isEqualsTo()', () => {
		test('should return true if value object is equals', () => {
			const voValue = new Date(1659011272040);
			const vo1 = DateValueObjectMother.create(voValue);
			const vo2 = DateValueObjectMother.create(voValue);

			expect(vo1.isEqualsTo(vo2)).toBeTruthy();
		});
		test('should return false if value object is equals', () => {
			const vo1Value = new Date(1659011272040);
			const vo2Value = new Date(1659011273040);
			const vo1 = DateValueObjectMother.create(vo1Value);
			const vo2 = DateValueObjectMother.create(vo2Value);

			expect(vo1.isEqualsTo(vo2)).toBeFalsy();
		});
	});
	describe('toString()', () => {
		test('should works as expected', () => {
			const voValue = new Date(1659011272040);
			const vo = DateValueObjectMother.create(voValue);
			expect(vo.toString()).toBe('2022-07-28T12:27:52.040Z');
		});
	});
});
