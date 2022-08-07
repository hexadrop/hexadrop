import { DomainEvent } from './cqrs/DomainEvent';
import { VoidDomainEvent } from './cqrs/VoidDomainEvent';

export abstract class AggregateRoot<DTO = unknown, D extends DomainEvent = VoidDomainEvent> {
	static fromPrimitives: (...args: any[]) => any;
	private domainEvents: Array<D>;

	protected constructor() {
		this.domainEvents = [];
	}

	pullDomainEvents(): Array<D> {
		const domainEvents = this.domainEvents.slice();
		this.domainEvents = [];

		return domainEvents;
	}

	record(...event: D[]): void {
		this.domainEvents.push(...event);
	}

	abstract toPrimitives(): DTO;
}
