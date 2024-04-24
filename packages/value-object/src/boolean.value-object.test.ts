import { describe, expect, test } from 'bun:test';

import { EmptyBooleanValueError, InvalidBooleanValueTypeError } from './boolean.value-object.error';
import BooleanValueObjectMother from './boolean.value-object.mother';

describe('BooleanValueObject', () => {
	describe('constructor()', () => {
		test('should instantiate', () => {
			const vo = BooleanValueObjectMother.create(true);
			expect(vo).toBeDefined();
			expect(vo.value).toBe(true);
		});
		test('should throw an error if undefined', () => {
			const invalid = () => BooleanValueObjectMother.invalidWithUndefined();
			expect(invalid).toThrow(new EmptyBooleanValueError());
		});
		test('should throw an error if invalid type', () => {
			const invalid = () => BooleanValueObjectMother.invalidWithString();
			expect(invalid).toThrow(new InvalidBooleanValueTypeError());
		});
	});
	describe('isEqualsTo()', () => {
		test('should works as expected', () => {
			const vo = BooleanValueObjectMother.create(true);
			const compare1 = BooleanValueObjectMother.create(false);
			const compare2 = BooleanValueObjectMother.create(true);
			expect(vo.isEqualsTo(compare1)).toBeFalsy();
			expect(vo.isEqualsTo(compare2)).toBeTruthy();
		});
	});
	describe('toString()', () => {
		test('should works as expected', () => {
			const vo = BooleanValueObjectMother.create(true);
			expect(vo.toString()).toBe('true');
		});
	});
});
