import { WordMother } from '@hexadrop/mother';
import { describe, expect, test } from 'vitest';

import { QueryNotRegisteredErrorMother } from './mother/QueryNotRegisteredErrorMother';

describe('QueryNotRegisteredError', () => {
	test('should create from string', () => {
		const query = WordMother.random();
		const expectedError = QueryNotRegisteredErrorMother.create(query);
		expect(expectedError.message).toBe(
			`The query '${query}' hasn't a query handler associated`
		);
		expect(expectedError.errorCode).toBe(500);
		expect(expectedError.code).toBe('HEX(500)');
		expect(expectedError.name).toBe('QueryNotRegisteredError');
		expect(expectedError.stack).toBeDefined();
	});
});
