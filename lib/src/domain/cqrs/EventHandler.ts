import { DomainEvent, DomainEventClass } from './DomainEvent';

export interface EventHandler<DTO, T extends DomainEvent<DTO>> {
	handle(event: T): Promise<void>;

	subscribedTo(): DomainEventClass<DTO, T>;
}
