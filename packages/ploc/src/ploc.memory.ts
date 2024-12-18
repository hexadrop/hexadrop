import type { ChangePlocStateSubscription, PlocInterface } from './ploc';

/**
 * `InMemoryPloc` is an abstract class that implements the `PlocInterface`.
 * It manages state in memory and allows for state change subscriptions.
 *
 * @template S The type of the state that this `InMemoryPloc` will manage.
 */
export default abstract class InMemoryPloc<S> implements PlocInterface<S> {
	/**
	 * The internal state of the `InMemoryPloc`.
	 *
	 * @type {S}
	 * @private
	 * @template S The type of the state that this `InMemoryPloc` will manage.
	 */
	private internalState: S;
	/**
	 * A list of listeners that are subscribed to state changes.
	 *
	 * @type {ChangePlocStateSubscription<S>[]}
	 * @private
	 */
	private readonly listeners: ChangePlocStateSubscription<S>[];

	/**
	 * Constructs a new instance of `InMemoryPloc`.
	 *
	 * @param {S} initialState The initial state.
	 */
	constructor(initialState: S) {
		this.internalState = initialState;
		this.listeners = [];
	}

	/**
	 * Gets the current state of the `InMemoryPloc`.
	 *
	 * @returns {S} The current state.
	 */
	get state(): S {
		return this.internalState;
	}

	/**
	 * Changes the state of the `InMemoryPloc` and notifies all listeners.
	 *
	 * @param {S} state The new state.
	 */
	changeState(state: S): void {
		this.internalState = state;

		if (this.listeners.length > 0) {
			for (const listener of this.listeners) {
				listener(this.state);
			}
		}
	}

	/**
	 * Subscribes a listener to state changes.
	 *
	 * @param {ChangePlocStateSubscription<S>} listener The listener to subscribe.
	 */
	subscribe(listener: ChangePlocStateSubscription<S>): void {
		this.listeners.push(listener);
	}

	/**
	 * Unsubscribes a listener from state changes.
	 *
	 * @param {ChangePlocStateSubscription<S>} listener The listener to unsubscribe.
	 */
	unsubscribe(listener: ChangePlocStateSubscription<S>): void {
		const index = this.listeners.indexOf(listener);
		if (index !== -1) {
			this.listeners.splice(index, 1);
		}
	}
}
