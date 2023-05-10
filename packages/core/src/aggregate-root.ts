import type { DomainEvent } from './cqrs/domain-event';
import type { Primitives } from './types';

export abstract class AggregateRoot {
	private domainEvents: Array<DomainEvent>;

	protected constructor() {
		this.domainEvents = [];
	}

	pullDomainEvents(): Array<DomainEvent> {
		const domainEvents = this.domainEvents.slice();
		this.domainEvents = [];

		return domainEvents;
	}

	record(...event: DomainEvent[]): void {
		this.domainEvents.push(...event);
	}

	abstract toPrimitives(): Primitives<unknown>;
}
