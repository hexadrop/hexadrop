import { describe, expect, test } from 'bun:test';

import UlidValueObject from './ulid.value-object';
import InvalidUlidValueError from './ulid.value-object.error';
import UlidValueObjectMother from './ulid.value-object.mother';

describe('UlidValueObject', () => {
	describe('constructor()', () => {
		test('should instantiate', () => {
			const uuid = '0000004JFG1173F69NQYBPC4QN';
			const vo = UlidValueObjectMother.create(uuid);

			expect(vo).toBeDefined();
			expect(vo.value).toBe(uuid);
			expect(vo.toString()).toBe('0000004JFG1173F69NQYBPC4QN');
		});
		test('should throw an error if invalid format', () => {
			const invalid = () => UlidValueObjectMother.invalid();
			expect(invalid).toThrow(new InvalidUlidValueError('s'));
		});
	});
	describe('isEqualsTo()', () => {
		test('should works as expected', () => {
			const uuid = '0000004JFG9XSC4CNNSC8K65MG';
			const vo1 = UlidValueObjectMother.create(uuid);
			const vo2 = UlidValueObjectMother.create(uuid);
			const vo3 = UlidValueObjectMother.random();

			expect(vo1.isEqualsTo(vo2)).toBeTruthy();
			expect(vo1.isEqualsTo(vo3)).toBeFalsy();
		});
	});
	describe('static random()', () => {
		test('should works as expected', () => {
			const random = UlidValueObject.random();

			expect(random).toBeTruthy();
		});
	});
});
