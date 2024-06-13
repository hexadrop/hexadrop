import { describe, expect, test } from 'bun:test';

import InvalidEmailValueError from './email.value-object.error';
import EmailValueObjectMother from './email.value-object.mother';

describe('EmailValueObject', () => {
	describe('constructor()', () => {
		test('should instantiate', () => {
			const value = 'fake@domain.es';
			const vo = EmailValueObjectMother.create(value);
			const less = EmailValueObjectMother.random();

			expect(vo).toBeDefined();
			expect(vo.value).toBe('fake@domain.es');
			expect(vo.toString()).toBe('fake@domain.es');
			expect(vo.isEqualsTo(less)).toBeFalsy();
		});
		test('should throw an error if arg is invalid value', () => {
			const invalid = () => EmailValueObjectMother.invalidValue();
			expect(invalid).toThrow(new InvalidEmailValueError('melon'));
		});
	});
});
