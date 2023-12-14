import DomainEvent from '@hexadrop/event';
import type { Primitives } from '@hexadrop/types/primitives';

export default abstract class AggregateRoot {
	private domainEvents: DomainEvent[];

	protected constructor() {
		this.domainEvents = [];
	}

	pullDomainEvents(): DomainEvent[] {
		const domainEvents = this.domainEvents.slice();
		this.domainEvents = [];

		return domainEvents;
	}

	record(...event: DomainEvent[]): void {
		this.domainEvents.push(...event);
	}

	abstract toPrimitives(): Primitives<unknown>;
}
