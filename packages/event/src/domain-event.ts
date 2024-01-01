import type { Class } from '@hexadrop/types/class';
import type { Nullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';

/**
 * Interface for the constructor parameters of DomainEvent
 * @interface
 * @property {string} aggregateId - The aggregate ID
 * @property {Nullable<string>} eventId - The event ID (optional)
 * @property {Nullable<Date>} occurredOn - The date the event occurred on (optional)
 * @property {Nullable<string>} relatedId - The related ID (optional)
 */
interface DomainEventConstructorParams {
	readonly aggregateId: string;
	readonly eventId?: Nullable<string>;
	readonly occurredOn?: Nullable<Date>;
	readonly relatedId?: Nullable<string>;
}

/**
 * Abstract class for DomainEvent
 * @abstract
 * @property {string} EVENT_NAME - The static event name
 * @property {string} aggregateId - The aggregate ID
 * @property {string} eventId - The event ID
 * @property {string} eventName - The event name
 * @property {Date} occurredOn - The date the event occurred on
 * @property {Nullable<string>} relatedId - The related ID (optional)
 */
abstract class DomainEvent {
	static EVENT_NAME: string;
	readonly aggregateId: string;
	readonly eventId: string;
	readonly eventName: string;
	readonly occurredOn: Date;
	readonly relatedId: Nullable<string>;

	/**
	 * Constructor for DomainEvent
	 * @constructor
	 * @param {string} eventName - The event name
	 * @param {DomainEventConstructorParams} params - The constructor parameters
	 */
	protected constructor(
		eventName: string,
		{ aggregateId, eventId, occurredOn, relatedId }: DomainEventConstructorParams
	) {
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
