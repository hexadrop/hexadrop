import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

export interface EventBus {
	publish(...events: DomainEvent[]): Promise<void> | void;

	subscribe<D extends DomainEvent<DTO>, DTO = unknown>(handler: EventHandler<D, DTO>): Promise<void> | void;

	unsubscribe<D extends DomainEvent<DTO>, DTO>(handler: EventHandler<D, DTO>): Promise<void> | void;
}
