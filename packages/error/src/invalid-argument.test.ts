import { faker } from '@faker-js/faker';
import { describe, expect, test } from 'bun:test';

import InvalidArgumentErrorMother from './invalid-argument.mother';

describe('InvalidArgumentError', () => {
	test('should create from message', () => {
		const message = faker.lorem.word();
		const expectedError = InvalidArgumentErrorMother.create(message);
		expect(expectedError.message).toBe(message);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidArgumentError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from message and name', () => {
		const message = faker.lorem.word();
		const name = faker.lorem.word();
		const expectedError = InvalidArgumentErrorMother.create(message, name);
		expect(expectedError.message).toBe(message);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe(name);
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from message, name and code', () => {
		const message = faker.lorem.word();
		const name = faker.lorem.word();
		const code = 'TTT(123)';
		const expectedError = InvalidArgumentErrorMother.create(message, name, code);
		expect(expectedError.message).toBe(message);
		expect(expectedError.errorCode).toBe(123);
		expect(expectedError.code).toBe('TTT(123)');
		expect(expectedError.name).toBe(name);
		expect(expectedError.stack).toBeDefined();
	});
});
