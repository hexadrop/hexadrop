import type { DomainEvent, EventHandler } from '@hexadrop/core';

export class EventHandlersInformation {
	private readonly subscriptions: Map<string, EventHandler<any, unknown>[]>;

	constructor(...handlers: EventHandler<any, unknown>[]) {
		this.subscriptions = new Map<string, EventHandler<any, unknown>[]>();
		handlers?.forEach(h => this.addEventHandler(h));
	}

	addEventHandler<D extends DomainEvent<DTO>, DTO = unknown>(handler: EventHandler<D, DTO>): void {
		const event = handler.subscribedTo();
		const c = this.subscriptions.get(event.EVENT_NAME);
		if (c) {
			this.subscriptions.set(event.EVENT_NAME, [...c, handler]);
		} else {
			this.subscriptions.set(event.EVENT_NAME, [handler]);
		}
	}

	removeEventHandler<D extends DomainEvent<DTO>, DTO = unknown>(handler: EventHandler<D, DTO>): void {
		const event = handler.subscribedTo();
		const c = this.subscriptions.get(event.EVENT_NAME);
		if (c) {
			this.subscriptions.set(
				event.EVENT_NAME,
				c.filter(e => e !== handler)
			);
		}
	}

	search<E extends DomainEvent<DTO>, DTO>(command: E): EventHandler<E, DTO>[] {
		const commandHandler = this.subscriptions.get(command.eventName);

		if (!commandHandler) {
			return [];
		}

		return commandHandler;
	}
}
