import { describe, expect, test } from 'bun:test';

import InvalidSpanishDocumentNumberValueObjectError from './spanish-document-number.value-object.error';
import SpanishDocumentNumberValueObjectMother from './spanish-document-number.value-object.mother';

describe('InvalidSpanishDocumentNumberValue', () => {
	describe('constructor()', () => {
		test('should instantiate', () => {
			const value = '42874279W';
			const vo = SpanishDocumentNumberValueObjectMother.create(value);

			expect(vo).toBeDefined();
			expect(vo.value).toBe('42874279W');
			expect(vo.toString()).toBe('42874279W');
		});
		test('should throw an error if arg is invalid value', () => {
			const invalid = () => SpanishDocumentNumberValueObjectMother.invalidValue();
			expect(invalid).toThrow(new InvalidSpanishDocumentNumberValueObjectError('0000MELON'));
		});
	});
});
