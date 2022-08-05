import { IdentifierValueObject } from '../value-object';

export abstract class DomainEvent<DTO = unknown> {
	static EVENT_NAME: string;
	static fromPrimitives: <E extends DomainEvent<D>, D>(dto: D) => E;
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
};

export abstract class VoidDomainEvent extends DomainEvent<void> {
	static readonly EVENT_NAME = 'void';
	protected constructor() {
		super(VoidDomainEvent.EVENT_NAME, '');
		throw new Error(`Invalid event`);
	}
	toPrimitive(): void {
		return;
	}
}
