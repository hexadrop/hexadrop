import { IdentifierValueObject } from '../value-object';

export abstract class DomainEvent<DTO = unknown> {
	readonly aggregateId: string;
	readonly eventId: string;
	readonly eventName: string;
	readonly relatedId?: string;
	readonly occurredOn: Date;

	protected constructor(
		eventName: string,
		aggregateId: string,
		eventId?: string,
		occurredOn?: Date,
		relatedId?: string
	) {
		this.aggregateId = aggregateId;
		this.eventId = eventId || IdentifierValueObject.random().value;
		this.occurredOn = occurredOn || new Date();
		this.eventName = eventName;
		this.relatedId = relatedId;
	}

	abstract toPrimitive(): DTO;
}

export type DomainEventClass<D extends DomainEvent<DTO>, DTO = unknown> = {
	EVENT_NAME: string;
	fromPrimitives(dto: DTO): D;
	new (...args: any[]): D;
};
