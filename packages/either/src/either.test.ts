import { describe, expect, test } from 'bun:test';

import Either from './either';

describe('Either', () => {
	describe('flatMapLeft()', () => {
		test('should works as expected', () => {
			const either = Either.right<number, boolean>(true);

			const map = either.flatMapLeft(v => Either.left(JSON.stringify(v)));

			expect(map.isLeft()).toBeFalsy();
			expect(map.isRight()).toBeTruthy();
			expect(map.getRight()).toBe(true);

			const either2 = Either.left<number, string>(1);

			const map2 = either2.flatMapLeft(v => Either.right(JSON.stringify(v)));

			expect(map2.isLeft()).toBeFalsy();
			expect(map2.isRight()).toBeTruthy();
			expect(map2.getRight()).toBe('1');
		});
	});

	describe('flatMapRight()', () => {
		test('should works as expected', () => {
			const either = Either.right<number, boolean>(true);

			const map = either.flatMapRight(v => Either.right(JSON.stringify(v)));

			expect(map.isLeft()).toBeFalsy();
			expect(map.isRight()).toBeTruthy();
			expect(map.getRight()).toBe('true');

			const either2 = Either.left<number, boolean>(1);

			const map2 = either2.flatMapRight(v => Either.right(JSON.stringify(v)));

			expect(map2.isLeft()).toBeTruthy();
			expect(map2.isRight()).toBeFalsy();
			expect(map2.getLeft()).toBe(1);
		});
	});

	describe('fold()', () => {
		test('should works as expected', () => {
			const either = Either.right<Error, boolean>(true);
			const fold = either.fold(
				v => v.message,
				() => 'true'
			);
			expect(fold).toBe('true');
			const either2 = Either.left<Error, boolean>(new Error('MSG'));
			const fold2 = either2.fold(
				v => v.message,
				() => 'true'
			);
			expect(fold2).toBe('MSG');
		});
	});

	describe('getLeft()', () => {
		test('should works as expected', () => {
			const either = Either.left<number, boolean>(1);
			expect(either.getLeft()).toBe(1);

			const either2 = Either.right<number, boolean>(true);
			expect(() => either2.getLeft()).toThrow('The value is right: {"kind":"right","rightValue":true}');

			const either3 = Either.right<number, boolean>(true);
			expect(() => either3.getLeft('MSG')).toThrow('MSG');
		});
	});

	describe('getRight()', () => {
		test('should works as expected', () => {
			const either = Either.right<number, boolean>(true);
			expect(either.getRight()).toBe(true);

			const either2 = Either.left<number, boolean>(1);
			expect(() => either2.getRight()).toThrow('The value is left: {"kind":"left","leftValue":1}');

			const either3 = Either.left<number, boolean>(1);
			expect(() => either3.getRight('MSG')).toThrow('MSG');
		});
	});

	describe('isLeft()', () => {
		test('should works as expected', () => {
			const either = Either.left(true);
			expect(either.isLeft()).toBe(true);
			const either2 = Either.right(true);
			expect(either2.isLeft()).toBe(false);
		});
	});

	describe('isRight()', () => {
		test('should works as expected', () => {
			const either = Either.right(true);
			expect(either.isRight()).toBe(true);
			const either2 = Either.left(true);
			expect(either2.isRight()).toBe(false);
		});
	});

	describe('mapLeft()', () => {
		test('should works as expected', () => {
			const either = Either.right<number, boolean>(true);

			const map = either.mapLeft(v => JSON.stringify(v));

			expect(map.isLeft()).toBeFalsy();
			expect(map.isRight()).toBeTruthy();
			expect(map.getRight()).toBe(true);

			const either2 = Either.left<number, boolean>(1);

			const map2 = either2.mapLeft(v => JSON.stringify(v));

			expect(map2.isLeft()).toBeTruthy();
			expect(map2.isRight()).toBeFalsy();
			expect(map2.getLeft()).toBe('1');
		});
	});

	describe('mapRight()', () => {
		test('should works as expected', () => {
			const either = Either.right<number, boolean>(true);

			const map = either.mapRight(v => JSON.stringify(v));

			expect(map.isLeft()).toBeFalsy();
			expect(map.isRight()).toBeTruthy();
			expect(map.getRight()).toBe('true');

			const either2 = Either.left<number, boolean>(1);

			const map2 = either2.mapRight(v => JSON.stringify(v));

			expect(map2.isLeft()).toBeTruthy();
			expect(map2.isRight()).toBeFalsy();
			expect(map2.getLeft()).toBe(1);
		});
	});

	describe('getLeftOrElse()', () => {
		test('should works as expected', () => {
			const either = Either.left<number, boolean>(1);
			expect(either.getLeftOrElse(2)).toBe(1);

			const either2 = Either.right<number, boolean>(true);
			expect(either2.getLeftOrElse(1)).toBe(1);
		});
	});

	describe('getRightOrElse()', () => {
		test('should works as expected', () => {
			const either = Either.left<number, boolean>(1);
			expect(either.getRightOrElse(true)).toBe(true);

			const either2 = Either.right<number, boolean>(true);
			expect(either2.getRightOrElse(false)).toBe(true);
		});
	});

	describe('should 0 works as expected', () => {
		test('with left', () => {
			const expected = Either.left(0);
			expect(expected.isLeft()).toBeTruthy();
			expect(expected.isRight()).toBeFalsy();
			expect(expected.getLeft()).toBe(0);
		});
		test('with right', () => {
			const expected = Either.right(0);
			expect(expected.isLeft()).toBeFalsy();
			expect(expected.isRight()).toBeTruthy();
			expect(expected.getRight()).toBe(0);
		});
	});
});
