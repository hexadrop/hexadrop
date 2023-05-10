import type { Nullable } from '../nullable';
import { IdentifierValueObject } from '../value-object';

export abstract class DomainEvent<DTO = unknown> {
	readonly aggregateId: string;
	readonly eventId: string;
	readonly eventName: string;
	readonly occurredOn: Date;
	readonly relatedId: Nullable<string>;

	protected constructor(
		eventName: string,
		aggregateId: string,
		eventId?: Nullable<string>,
		occurredOn?: Nullable<Date>,
		relatedId?: Nullable<string>
	) {
		this.aggregateId = aggregateId;
		this.eventId = eventId ?? IdentifierValueObject.random().value;
		this.occurredOn = occurredOn ?? new Date();
		this.eventName = eventName;
		this.relatedId = relatedId;
	}

	abstract toPrimitive(): DTO;
}

export type DomainEventClass<D extends DomainEvent<DTO>, DTO = unknown> = {
	EVENT_NAME: string;
	new (...args: any[]): D;
	fromPrimitives(dto: DTO): D;
};
