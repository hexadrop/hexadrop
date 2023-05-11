import type { Clazz, Nullable, Primitives } from '@hexadrop/types';

export abstract class DomainEvent {
	static EVENT_NAME: string;
	readonly aggregateId: string;
	readonly eventId: string;
	readonly eventName: string;
	readonly occurredOn: Date;
	readonly relatedId: Nullable<string>;

	constructor(
		eventName: string,
		eventId: string,
		aggregateId: string,
		occurredOn?: Nullable<Date>,
		relatedId?: Nullable<string>
	) {
		this.aggregateId = aggregateId;
		this.eventId = eventId;
		this.occurredOn = occurredOn ?? new Date();
		this.eventName = eventName;
		this.relatedId = relatedId;
	}
}

export type DomainEventClass<D extends DomainEvent> = Clazz<D> & {
	EVENT_NAME: string;
};

export type DomainEventParams<D extends DomainEvent> = Omit<
	Primitives<D>,
	'aggregateId' | 'eventId' | 'eventName' | 'occurredOn' | 'relatedId'
> &
	Partial<Pick<D, 'occurredOn' | 'relatedId'>> &
	Pick<D, 'aggregateId' | 'eventId'>;
