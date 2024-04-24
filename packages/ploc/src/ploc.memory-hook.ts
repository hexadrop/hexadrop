import { useEffect, useState } from 'react';

import type InMemoryPloc from './ploc.memory';
/**
 * `usePlocState` is a custom React hook that manages the state of a given `InMemoryPloc`.
 *
 * @template S The type of the state that the `InMemoryPloc` manages.
 * @param {InMemoryPloc<S>} ploc The `InMemoryPloc` instance whose state is to be managed.
 * @returns {S} The current state of the `InMemoryPloc`.
 * @template S The type of the state that the `InMemoryPloc` manages.
 */
export default function usePlocState<S>(ploc: InMemoryPloc<S>): S {
	/**
	 * The current state of the `InMemoryPloc` and a function to update it.
	 * @type {[S, Dispatch<SetStateAction<S>>]}
	 * @template S The type of the state that the `InMemoryPloc` manages.
	 */
	const [
		state,
		setState,
	] = useState(ploc.state);

	/**
	 * A side effect that runs after render.
	 * It subscribes to state changes in the `InMemoryPloc` and updates the local state accordingly.
	 * It also cleans up by unsubscribing from the `InMemoryPloc` when the component unmounts or the `InMemoryPloc` changes.
	 */
	useEffect(() => {
		/**
		 * A function that updates the local state with the new state of the `InMemoryPloc`.
		 * @param {S} state The new state of the `InMemoryPloc`.
		 * @template S The type of the state that the `InMemoryPloc` manages.
		 */
		const stateSubscription = (state: S) => {
			setState(state);
		};

		ploc.subscribe(stateSubscription);

		/**
		 * A cleanup function that unsubscribes the `stateSubscription` from the `InMemoryPloc`.
		 */
		return () => ploc.unsubscribe(stateSubscription);
	}, [ploc]);

	/**
	 * Returns the current state of the `InMemoryPloc`.
	 */
	return state;
}
