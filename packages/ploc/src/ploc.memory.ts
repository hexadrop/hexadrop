import type { ChangePlocStateSubscription, PlocInterface } from './ploc';

export default abstract class InMemoryPloc<S> implements PlocInterface<S> {
	private internalState: S;
	private readonly listeners: ChangePlocStateSubscription<S>[];

	constructor(initialState: S) {
		this.internalState = initialState;
		this.listeners = [];
	}

	get state(): S {
		return this.internalState;
	}

	changeState(state: S): void {
		this.internalState = state;

		if (this.listeners.length > 0) {
			for (const listener of this.listeners) {
				listener(this.state);
			}
		}
	}

	subscribe(listener: ChangePlocStateSubscription<S>): void {
		this.listeners.push(listener);
	}

	unsubscribe(listener: ChangePlocStateSubscription<S>): void {
		const index = this.listeners.indexOf(listener);
		if (index > -1) {
			this.listeners.splice(index, 1);
		}
	}
}
