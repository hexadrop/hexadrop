/**
 * Type definition for a subscription to changes in the Ploc state.
 * @param {S} state The new state.
 * @template S The type of the state.
 */
type ChangePlocStateSubscription<S> = (state: S) => void;

/**
 * Interface for the Ploc class.
 * @template S The type of the state.
 */
interface PlocInterface<S> {
	/**
	 * The current state.
	 * @type {S}
	 * @template S The type of the state.
	 */
	readonly state: S;

	/**
	 * Changes the current state.
	 * @param {S} state The new state.
	 */
	changeState(state: S): void;
}

/**
 * Abstract class representing a Ploc.
 * @template S The type of the state.
 * @implements {PlocInterface<S>}
 */
abstract class Ploc<S> implements PlocInterface<S> {
	/**
	 * The current state.
	 * @abstract
	 * @type {S}
	 */
	abstract readonly state: S;

	/**
	 * Changes the current state.
	 * @abstract
	 * @param {S} state The new state.
	 */
	abstract changeState(state: S): void;
}

export type { ChangePlocStateSubscription, PlocInterface };

export default Ploc;
