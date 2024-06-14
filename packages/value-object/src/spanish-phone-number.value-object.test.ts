import { describe, expect, test } from 'bun:test';

import InvalidSpanishPhoneNumberValueObjectError from './spanish-phone-number.value-object.error';
import SpanishPhoneNumberValueObjectMother from './spanish-phone-number.value-object.mother';

describe('InvalidSpanishPhoneNumberValue', () => {
	describe('constructor()', () => {
		test('should instantiate', () => {
			const value = '657890543';
			const vo = SpanishPhoneNumberValueObjectMother.create(value);
			const less = SpanishPhoneNumberValueObjectMother.random();

			expect(vo).toBeDefined();
			expect(vo.value).toBe('657890543');
			expect(vo.toString()).toBe('657890543');
			expect(vo.isEqualsTo(less)).toBeFalsy();
		});
		test('should throw an error if arg is invalid value', () => {
			const invalid = () => SpanishPhoneNumberValueObjectMother.invalidValue();
			expect(invalid).toThrow(new InvalidSpanishPhoneNumberValueObjectError('melon'));
		});
	});
});
