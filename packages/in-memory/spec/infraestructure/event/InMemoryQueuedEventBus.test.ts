import { DomainEvent, DomainEventClass, EventHandler } from '@hexadrop/core';
import delay from 'delay';
import { describe, expect, test, vi } from 'vitest';
import { EventHandlersInformation } from '../../../src/infraestructure/event/EventHandlersInformation';
import { InMemoryQueuedEventBus } from '../../../src/queue';

const handler1Spy = vi.fn<[unknown], void>(() => undefined);
const handler2Spy = vi.fn<[unknown], void>(() => undefined);
const handler3Spy = vi.fn<[unknown], void>(() => undefined);
const handler4Spy = vi.fn<[unknown], Promise<void>>(() => Promise.resolve());

interface Event1DTO {
	id: string;
}

class Event1 extends DomainEvent<Event1DTO> {
	static readonly EVENT_NAME = 'Event1';

	constructor() {
		super(Event1.EVENT_NAME, 'id');
	}

	toPrimitive(): Event1DTO {
		return {
			id: this.aggregateId,
		};
	}
}

class Event1Handler implements EventHandler<Event1, Event1DTO> {
	handle(event: Event1): void {
		return handler1Spy(event);
	}

	subscribedTo(): DomainEventClass<Event1> {
		return Event1;
	}
}

class Event3Handler implements EventHandler<Event1, Event1DTO> {
	handle(event: Event1): void {
		return handler3Spy(event);
	}

	subscribedTo(): DomainEventClass<Event1> {
		return Event1;
	}
}

interface Event2DTO {
	id: string;
}

class Event2 extends DomainEvent<Event2DTO> {
	static readonly EVENT_NAME = 'Event2';

	constructor() {
		super(Event2.EVENT_NAME, 'id');
	}

	toPrimitive(): Event2DTO {
		return {
			id: this.aggregateId,
		};
	}
}

class Event2Handler implements EventHandler<Event2, Event2DTO> {
	async handle(event: Event2): Promise<void> {
		await delay(150);
		return handler2Spy(event);
	}

	subscribedTo(): DomainEventClass<Event2> {
		return Event2;
	}
}

interface Event4DTO {
	id: string;
}

class Event4 extends DomainEvent<Event4DTO> {
	static readonly EVENT_NAME = 'Event4';

	constructor() {
		super(Event4.EVENT_NAME, 'id');
	}

	toPrimitive(): Event4DTO {
		return {
			id: this.aggregateId,
		};
	}
}

class Event4Handler implements EventHandler<Event4, Event4DTO> {
	async handle(event: Event4): Promise<void> {
		await delay(150);
		return handler4Spy(event);
	}

	subscribedTo(): DomainEventClass<Event4> {
		return Event4;
	}
}

describe('InMemoryQueuedEventBus', () => {
	test('should works as expected', async () => {
		const event1 = new Event1();
		const event2 = new Event2();
		const event4 = new Event4();
		const handler1 = new Event1Handler();
		const handler2 = new Event2Handler();
		const handler3 = new Event3Handler();
		const handler4 = new Event4Handler();

		const info = new EventHandlersInformation(handler4);

		new InMemoryQueuedEventBus(info);
		const bus = new InMemoryQueuedEventBus(info, {
			concurrency: 1,
		});

		bus.subscribe(handler1);

		await bus.publish(event1, event2);

		expect(handler1Spy).toHaveBeenCalledWith(event1);
		expect(handler2Spy).toHaveBeenCalledTimes(0);
		expect(handler3Spy).toHaveBeenCalledTimes(0);
		expect(handler4Spy).toHaveBeenCalledTimes(0);

		bus.unsubscribe(handler1);

		await bus.publish(event1, event2);

		expect(handler1Spy).toHaveBeenCalledTimes(1);
		expect(handler2Spy).toHaveBeenCalledTimes(0);
		expect(handler3Spy).toHaveBeenCalledTimes(0);
		expect(handler4Spy).toHaveBeenCalledTimes(0);

		bus.subscribe(handler1);
		bus.subscribe(handler2);
		bus.subscribe(handler3);

		await bus.publish(event1, event2, event4);

		expect(handler1Spy).toHaveBeenCalledTimes(2);
		expect(handler2Spy).toHaveBeenCalledTimes(1);
		expect(handler3Spy).toHaveBeenCalledTimes(1);
		expect(handler4Spy).toHaveBeenCalledTimes(1);
	});
});
