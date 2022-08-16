import { DomainEvent } from './DomainEvent';

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
