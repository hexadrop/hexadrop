interface Left<L> {
	kind: 'left';
	leftValue: L;
}
interface Right<R> {
	kind: 'right';
	rightValue: R;
}

type EitherValue<L, R> = Left<L> | Right<R>;

interface EitherInterface<L, R> {
	value: EitherValue<L, R>;
}

export type { EitherInterface, EitherValue };
