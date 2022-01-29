import { DomainEvent, DomainEventClass } from './DomainEvent';

export interface EventBus {
	publish(events: Array<DomainEvent<any>>): Promise<void> | void;

	subscribe<DTO, D extends DomainEvent<DTO>>(
		event: DomainEventClass<DTO, D>,
		callback: (dto: DTO) => Promise<void> | void,
		topicName?: string
	): void;

	unsubscribe<DTO, D extends DomainEvent<DTO>>(
		event: DomainEventClass<DTO, D>,
		callback: (dto: DTO) => Promise<void> | void
	): void;
}
