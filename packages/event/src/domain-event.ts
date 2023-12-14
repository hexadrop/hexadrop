import type { Class } from '@hexadrop/types/class';
import type { Nullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';

interface DomainEventConstructorParams {
	readonly aggregateId: string;
	readonly eventId?: Nullable<string>;
	readonly occurredOn?: Nullable<Date>;
	readonly relatedId?: Nullable<string>;
}

abstract class DomainEvent {
	static EVENT_NAME: string;
	readonly aggregateId: string;
	readonly eventId: string;
	readonly eventName: string;
	readonly occurredOn: Date;
	readonly relatedId: Nullable<string>;

	constructor(eventName: string, { aggregateId, eventId, occurredOn, relatedId }: DomainEventConstructorParams) {
		this.aggregateId = aggregateId;
		this.eventId = eventId ?? crypto.randomUUID();
		this.occurredOn = occurredOn ?? new Date();
		this.eventName = eventName;
		this.relatedId = relatedId;
	}
}

type DomainEventParams<D extends DomainEvent> = Omit<
	Primitives<D>,
	'aggregateId' | 'eventId' | 'eventName' | 'occurredOn' | 'relatedId'
> &
	Partial<Pick<D, 'occurredOn' | 'relatedId' | 'eventId'>> &
	Pick<D, 'aggregateId'>;

type DomainEventClass<
	DomainInstanceType extends DomainEvent = DomainEvent,
	CtorArgs extends any[] = [DomainEventParams<DomainInstanceType>],
> = Class<
	CtorArgs,
	DomainInstanceType,
	{
		EVENT_NAME: string;
	}
>;

export type { DomainEventClass, DomainEventParams };

export default DomainEvent;
