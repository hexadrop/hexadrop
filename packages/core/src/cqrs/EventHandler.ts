import type { DomainEvent, DomainEventClass } from './DomainEvent';
import type { EventBusCallback } from './EventBus';

export interface EventHandler<T extends DomainEvent<DTO>, DTO> {
	handle: EventBusCallback<DTO>;

	subscribedTo(): DomainEventClass<T, DTO>;
}
