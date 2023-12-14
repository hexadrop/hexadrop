type ChangePlocStateSubscription<S> = (state: S) => void;

interface PlocInterface<S> {
	readonly state: S;

	changeState(state: S): void;
}

abstract class Ploc<S> implements PlocInterface<S> {
	abstract readonly state: S;

	abstract changeState(state: S): void;
}

export type { ChangePlocStateSubscription, PlocInterface };

export default Ploc;
