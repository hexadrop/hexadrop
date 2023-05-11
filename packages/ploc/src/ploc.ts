export type ChangePlocStateSubscription<S> = (state: S) => void;

export interface Ploc<S> {
	readonly state: S;

	changeState(state: S): void;

	subscribe(listener: ChangePlocStateSubscription<S>): void;

	unsubscribe(listener: ChangePlocStateSubscription<S>): void;
}
