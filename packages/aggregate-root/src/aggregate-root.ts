import type DomainEvent from '@hexadrop/event';
import type { Primitives } from '@hexadrop/types/primitives';

export default abstract class AggregateRoot {
	readonly #domainEvents: DomainEvent[];

	protected constructor() {
		this.#domainEvents = [];
	}

	pullDomainEvents(): DomainEvent[] {
		const length = this.#domainEvents.length;
		return this.#domainEvents.splice(0, length);
	}

	record(...event: DomainEvent[]): void {
		this.#domainEvents.push(...event);
	}

	abstract toPrimitives(): Primitives<unknown>;
}
