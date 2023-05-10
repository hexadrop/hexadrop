type Subscription<S> = (state: S) => void;

export abstract class Ploc<S> {
	private internalState: S;
	private readonly listeners: Subscription<S>[];

	constructor(initialState: S) {
		this.internalState = initialState;
		this.listeners = [];
	}

	public get state(): S {
		return this.internalState;
	}

	subscribe(listener: Subscription<S>): void {
		this.listeners.push(listener);
	}

	unsubscribe(listener: Subscription<S>): void {
		const index = this.listeners.indexOf(listener);
		if (index > -1) {
			this.listeners.splice(index, 1);
		}
	}

	protected changeState(state: S): void {
		this.internalState = state;

		if (this.listeners.length > 0) {
			this.listeners.forEach(listener => {
				listener(this.state);
			});
		}
	}
}
