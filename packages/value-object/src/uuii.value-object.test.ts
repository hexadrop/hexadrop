import { describe, expect, test } from 'bun:test';

import InvalidUuiiValueError from './uuii.value-object.error';
import UuiiValueObjectMother from './uuii.value-object.mother';

describe('UuiiValueObject', () => {
	test('should create', () => {
		const uuid = 'f3cf177a-437b-408a-a967-607891add1df';
		const vo = UuiiValueObjectMother.create(uuid);
		const other = UuiiValueObjectMother.random();

		expect(vo).toBeDefined();
		expect(vo.value).toBe(uuid);
		expect(vo.toString()).toBe('f3cf177a-437b-408a-a967-607891add1df');
		expect(vo.isEqualsTo(other)).toBeFalsy();
	});
	test('should throw an error if invalid', () => {
		const fn = () => UuiiValueObjectMother.invalid();
		expect(fn).toThrow(new InvalidUuiiValueError('s'));
	});
});
