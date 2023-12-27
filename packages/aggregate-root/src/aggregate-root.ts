import type DomainEvent from '@hexadrop/event';
import type { Primitives } from '@hexadrop/types/primitives';

/**
 * Abstract class representing an Aggregate Root in Domain-Driven Design.
 * This class is responsible for recording and pulling domain events.
 */
export default abstract class AggregateRoot {
	/**
	 * Private field to store domain events.
	 */
	readonly #domainEvents: DomainEvent[];

	/**
	 * Constructor for the AggregateRoot class.
	 * Initializes the domainEvents array.
	 */
	protected constructor() {
		this.#domainEvents = [];
	}

	/**
	 * Method to pull all domain events.
	 * This method removes all events from the domainEvents array and returns them.
	 * @returns {DomainEvent[]} An array of DomainEvent objects.
	 */
	pullDomainEvents(): DomainEvent[] {
		const length = this.#domainEvents.length;

		return this.#domainEvents.splice(0, length);
	}

	/**
	 * Method to record domain events.
	 * This method adds new events to the domainEvents array.
	 * @param {...DomainEvent[]} event - The domain events to record.
	 */
	record(...event: DomainEvent[]): void {
		this.#domainEvents.push(...event);
	}

	/**
	 * Abstract method to convert the AggregateRoot to primitives.
	 * This method must be implemented by subclasses.
	 * @returns {Primitives<unknown>} The primitive representation of the AggregateRoot.
	 */
	abstract toPrimitives(): Primitives<unknown>;
}
