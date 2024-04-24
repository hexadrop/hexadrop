import type { EitherValue } from './either.types';

/**
 * The `Either` class represents a value of one of two possible types (a disjoint union).
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * `Either` is often used as an alternative to `Option` for dealing with possible missing values.
 * In this usage, `Nothing` is replaced with a `Left` which can contain useful information.
 * `Right` takes the place of `Just` and represents the result of computations that do not fail.
 *
 * @template L The type of the left value.
 * @template R The type of the right value.
 */
export default class Either<L, R> {
	private constructor(private readonly value: EitherValue<L, R>) {}

	/**
	 * Creates a new `Either` instance representing a left value.
	 *
	 * @static
	 * @param {L} value The left value.
	 * @returns {Either<L, R>} A new `Either` instance encapsulating the left value.
	 * @template L The type of the left value.
	 * @template R The type of the right value.
	 */
	static left<L, R>(value: L): Either<L, R> {
		return new Either<L, R>({ kind: 'left', leftValue: value });
	}

	/**
	 * Creates a new `Either` instance representing a right value.
	 *
	 * @static
	 * @param {R} value The right value.
	 * @returns {Either<L, R>} A new `Either` instance encapsulating the right value.
	 * @template L The type of the left value.
	 * @template R The type of the right value.
	 */
	static right<L, R>(value: R): Either<L, R> {
		return new Either<L, R>({ kind: 'right', rightValue: value });
	}

	/**
	 * Transforms the left value of the `Either` instance by applying a provided function and returns a new `Either` instance.
	 * If the `Either` instance represents a right value, the original `Either` instance is returned.
	 *
	 * @param {(left: L) => Either<T, R>} leftFunction The function to apply to the left value.
	 * @returns {Either<T, R>} A new `Either` instance with the transformed left value and the original right value, or the original `Either` instance if it represents a right value.
	 * @template L - The type of the 'left' value.
	 * @template R - The type of the 'right' value.
	 * @template T The type of the transformed right value.
	 */
	flatMapLeft<T>(leftFunction: (left: L) => Either<T, R>): Either<T, R> {
		return this.fold(
			leftValue => leftFunction(leftValue),
			rightValue => Either.right(rightValue),
		);
	}

	/**
	 * Transforms the right value of the `Either` instance by applying a provided function and returns a new `Either` instance.
	 * If the `Either` instance represents a left value, the original `Either` instance is returned.
	 *
	 * @param {(right: R) => Either<L, T>} rightFunction The function to apply to the right value.
	 * @returns {Either<L, T>} A new `Either` instance with the original left value and the transformed right value, or the original `Either` instance if it represents a left value.
	 * @template L - The type of the 'left' value.
	 * @template R - The type of the 'right' value.
	 * @template T The type of the transformed right value.
	 */
	flatMapRight<T>(rightFunction: (right: R) => Either<L, T>): Either<L, T> {
		return this.fold(
			leftValue => Either.left(leftValue),
			rightValue => rightFunction(rightValue),
		);
	}

	/**
	 * Applies a function to the encapsulated value and returns the result.
	 * The function to apply is determined by the kind of the value.
	 *
	 * @param {(left: L) => T} leftFunction The function to apply if the value is of kind 'left'.
	 * @param {(right: R) => T} rightFunction The function to apply if the value is of kind 'right'.
	 * @returns {T} The result of applying the appropriate function to the encapsulated value.
	 * @template L - The type of the 'left' value.
	 * @template R - The type of the 'right' value.
	 * @template T The type of the result.
	 */
	fold<T>(leftFunction: (left: L) => T, rightFunction: (right: R) => T): T {
		switch (this.value.kind) {
			case 'left': {
				return leftFunction(this.value.leftValue);
			}
			case 'right': {
				return rightFunction(this.value.rightValue);
			}
		}
	}

	/**
	 * Returns the left value if the `Either` instance represents a left value.
	 * Throws an error if the `Either` instance represents a right value.
	 *
	 * @param {string} [errorMessage] The error message to throw if the `Either` instance represents a right value.
	 * If not provided, a default error message is used.
	 * @returns {L} The left value.
	 * @throws {Error} If the `Either` instance represents a right value.
	 * @template L - The type of the 'left' value.
	 */
	getLeft(errorMessage?: string): L {
		const throwFunction = () => {
			if (errorMessage) {
				throw new Error(errorMessage);
			}
			throw new Error(`The value is right: ${JSON.stringify(this.value)}`);
		};

		return this.fold(
			leftValue => leftValue,
			() => throwFunction(),
		);
	}

	/**
	 * Returns the left value if the `Either` instance represents a left value.
	 * Returns the provided default value if the `Either` instance represents a right value.
	 *
	 * @param {L} defaultValue The default value to return if the `Either` instance represents a right value.
	 * @returns {L} The left value or the default value.
	 * @template L - The type of the 'left' value.
	 */
	getLeftOrElse(defaultValue: L): L {
		return this.fold(
			someValue => someValue,
			() => defaultValue,
		);
	}

	/**
	 * Returns the right value if the `Either` instance represents a right value.
	 * Throws an error if the `Either` instance represents a left value.
	 *
	 * @param {string} [errorMessage] The error message to throw if the `Either` instance represents a left value.
	 * If not provided, a default error message is used.
	 * @returns {R} The right value.
	 * @throws {Error} If the `Either` instance represents a left value.
	 * @template R - The type of the 'right' value.
	 */
	getRight(errorMessage?: string): R {
		const throwFunction = () => {
			if (errorMessage) {
				throw new Error(errorMessage);
			}

			throw new Error(`The value is left: ${JSON.stringify(this.value)}`);
		};

		return this.fold(
			() => throwFunction(),
			rightValue => rightValue,
		);
	}

	/**
	 * Returns the right value if the `Either` instance represents a right value.
	 * Returns the provided default value if the `Either` instance represents a left value.
	 *
	 * @param {R} defaultValue The default value to return if the `Either` instance represents a left value.
	 * @returns {R} The right value or the default value.
	 * @template R - The type of the 'right' value.
	 */
	getRightOrElse(defaultValue: R): R {
		return this.fold(
			() => defaultValue,
			someValue => someValue,
		);
	}

	/**
	 * Checks if the `Either` instance represents a left value.
	 *
	 * @returns {boolean} `true` if the `Either` instance represents a left value, `false` otherwise.
	 */
	isLeft(): boolean {
		return this.value.kind === 'left';
	}

	/**
	 * Checks if the `Either` instance represents a right value.
	 *
	 * @returns {boolean} `true` if the `Either` instance represents a right value, `false` otherwise.
	 */
	isRight(): boolean {
		return this.value.kind === 'right';
	}

	/**
	 * Transforms the left value of the `Either` instance by applying a provided function.
	 * Returns a new `Either` instance with the transformed left value and the original right value.
	 *
	 * @param {(l: L) => T} leftFunction The function to apply to the left value.
	 * @returns {Either<T, R>} A new `Either` instance with the transformed left value and the original right value.
	 * @template L - The type of the 'left' value.
	 * @template R - The type of the 'right' value.
	 * @template T The type of the transformed left value.
	 */
	mapLeft<T>(leftFunction: (l: L) => T): Either<T, R> {
		return this.flatMapLeft(l => Either.left(leftFunction(l)));
	}

	/**
	 * Transforms the right value of the `Either` instance by applying a provided function.
	 * Returns a new `Either` instance with the original left value and the transformed right value.
	 *
	 * @param {(r: R) => T} rightFunction The function to apply to the right value.
	 * @returns {Either<L, T>} A new `Either` instance with the original left value and the transformed right value.
	 * @template L - The type of the 'left' value.
	 * @template R - The type of the 'right' value.
	 * @template T The type of the transformed right value.
	 */
	mapRight<T>(rightFunction: (r: R) => T): Either<L, T> {
		return this.flatMapRight(r => Either.right(rightFunction(r)));
	}
}
