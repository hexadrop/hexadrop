import type { ChangePlocStateSubscription, Ploc } from '@hexadrop/core';

export abstract class InMemoryPloc<S> implements Ploc<S> {
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
			this.listeners.forEach(listener => {
				listener(this.state);
			});
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
