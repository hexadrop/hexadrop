import type { DomainEvent, DomainEventClass } from './domain-event';
import type { EventBusCallback } from './event-bus';

export interface EventHandler<T extends DomainEvent<DTO>, DTO> {
	handle: EventBusCallback<DTO>;

	subscribedTo(): DomainEventClass<T, DTO>;
}
