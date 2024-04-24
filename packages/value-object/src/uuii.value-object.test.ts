import { describe, expect, test } from 'bun:test';

import UuiiValueObject from './uuii.value-object';
import InvalidUuiiValueError from './uuii.value-object.error';
import UuiiValueObjectMother from './uuii.value-object.mother';

describe('UuiiValueObject', () => {
	describe('constructor()', () => {
		test('should instantiate', () => {
			const uuid = 'f3cf177a-437b-408a-a967-607891add1df';
			const vo = UuiiValueObjectMother.create(uuid);

			expect(vo).toBeDefined();
			expect(vo.value).toBe(uuid);
			expect(vo.toString()).toBe('f3cf177a-437b-408a-a967-607891add1df');
		});
		test('should throw an error if invalid format', () => {
			const invalidIdentifierValueObjectFunction = () => UuiiValueObjectMother.invalid();
			expect(invalidIdentifierValueObjectFunction).toThrow(new InvalidUuiiValueError('s'));
		});
	});
	describe('isEqualsTo()', () => {
		test('should works as expected', () => {
			const uuid = 'f3cf177a-437b-408a-a967-607891add1df';
			const vo1 = UuiiValueObjectMother.create(uuid);
			const vo2 = UuiiValueObjectMother.create(uuid);
			const vo3 = UuiiValueObjectMother.random();

			expect(vo1.isEqualsTo(vo2)).toBeTruthy();
			expect(vo1.isEqualsTo(vo3)).toBeFalsy();
		});
	});
	describe('static random()', () => {
		test('should works as expected', () => {
			const random = UuiiValueObject.random();

			expect(random).toBeTruthy();
		});
	});
});
