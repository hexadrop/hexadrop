type Left<L> = { kind: 'left'; leftValue: L };
type Right<R> = { kind: 'right'; rightValue: R };

type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
	private constructor(private readonly value: EitherValue<L, R>) {}

	static left<L, R>(value: L): Either<L, R> {
		return new Either<L, R>({ kind: 'left', leftValue: value });
	}

	static right<L, R>(value: R): Either<L, R> {
		return new Either<L, R>({ kind: 'right', rightValue: value });
	}

	flatMapLeft<T>(fn: (left: L) => Either<T, R>): Either<T, R> {
		return this.fold(
			leftValue => fn(leftValue),
			rightValue => Either.right(rightValue)
		);
	}

	flatMapRight<T>(fn: (right: R) => Either<L, T>): Either<L, T> {
		return this.fold(
			leftValue => Either.left(leftValue),
			rightValue => fn(rightValue)
		);
	}

	fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
		switch (this.value.kind) {
			case 'left':
				return leftFn(this.value.leftValue);
			case 'right':
				return rightFn(this.value.rightValue);
		}
	}

	getLeft(errorMessage?: string): L {
		const throwFn = () => {
			throw Error(
				errorMessage ? errorMessage : `The value is right: ${JSON.stringify(this.value)}`
			);
		};

		return this.fold(
			leftValue => leftValue,
			() => throwFn()
		);
	}

	getLeftOrElse(defaultValue: L): L {
		return this.fold(
			someValue => someValue,
			() => defaultValue
		);
	}

	getRight(errorMessage?: string): R {
		const throwFn = () => {
			throw Error(
				errorMessage ? errorMessage : `The value is left: ${JSON.stringify(this.value)}`
			);
		};

		return this.fold(
			() => throwFn(),
			rightValue => rightValue
		);
	}

	getRightOrElse(defaultValue: R): R {
		return this.fold(
			() => defaultValue,
			someValue => someValue
		);
	}

	isLeft(): boolean {
		return this.value.kind === 'left';
	}

	isRight(): boolean {
		return this.value.kind === 'right';
	}

	mapLeft<T>(fn: (l: L) => T): Either<T, R> {
		return this.flatMapLeft(l => Either.left(fn(l)));
	}

	mapRight<T>(fn: (r: R) => T): Either<L, T> {
		return this.flatMapRight(r => Either.right(fn(r)));
	}
}
