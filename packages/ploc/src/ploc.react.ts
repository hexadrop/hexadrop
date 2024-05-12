import type { Dispatch, SetStateAction } from 'react';

import type { PlocInterface } from './ploc';

/**
 * `ReactPloc` is an abstract class that implements the `PlocInterface`.
 * It is designed to manage state in a React context.
 *
 * @template S The type of the state that this `ReactPloc` will manage.
 */
export default abstract class ReactPloc<S> implements PlocInterface<S> {
	/**
	 * A dispatch function from the `useState` hook in React.
	 * This function is used to change the state.
	 *
	 * @type {Dispatch<SetStateAction<S>>}
	 */
	readonly changeState: Dispatch<SetStateAction<S>>;
	/**
	 * The internal state of the `ReactPloc`.
	 *
	 * @type {S}
	 * @private
	 */
	private readonly internalState: S;

	/**
	 * Constructs a new instance of `ReactPloc`.
	 *
	 * @param {[S, Dispatch<SetStateAction<S>>]} parameters The initial state and dispatch function.
	 */
	constructor(parameters: [S, Dispatch<SetStateAction<S>>]) {
		const [initialState, dispatch] = parameters;
		this.internalState = initialState;
		this.changeState = dispatch;
	}

	/**
	 * Gets the current state of the `ReactPloc`.
	 *
	 * @returns {S} The current state.
	 */
	get state(): S {
		return this.internalState;
	}
}
