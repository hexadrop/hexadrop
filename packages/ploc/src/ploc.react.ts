import type { Dispatch, SetStateAction } from 'react';

import type { PlocInterface } from './ploc';

export default abstract class ReactPloc<S> implements PlocInterface<S> {
	readonly changeState: Dispatch<SetStateAction<S>>;
	private readonly internalState: S;

	constructor([initialState, dispatch]: [S, Dispatch<SetStateAction<S>>]) {
		this.internalState = initialState;
		this.changeState = dispatch;
	}

	get state(): S {
		return this.internalState;
	}
}
