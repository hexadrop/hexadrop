import type { DomainEvent, DomainEventClass, EventBusCallback, EventHandler } from '@hexadrop/core';

export class EventHandlersInformation {
	private readonly subscriptions: Map<string, EventBusCallback[]>;

	constructor(...handlers: EventHandler<any, any>[]) {
		this.subscriptions = new Map<string, EventBusCallback[]>();
		handlers.forEach(h => {
			this.addEventHandler(h);
		});
	}

	addCallBack<D extends DomainEvent<DTO>, DTO>(
		event: DomainEventClass<D, DTO>,
		callback: EventBusCallback<DTO>
	): void {
		const c = this.subscriptions.get(event.EVENT_NAME);
		if (c) {
			this.subscriptions.set(event.EVENT_NAME, [...c, callback]);
		} else {
			this.subscriptions.set(event.EVENT_NAME, [callback]);
		}
	}

	addEventHandler<D extends DomainEvent<DTO>, DTO>(handler: EventHandler<D, DTO>): void {
		const event = handler.subscribedTo();
		this.addCallBack(event, handler.handle);
	}

	removeCallBack<D extends DomainEvent<DTO>, DTO>(
		event: DomainEventClass<D, DTO>,
		callback: EventBusCallback<DTO>
	): void {
		const c = this.subscriptions.get(event.EVENT_NAME);
		if (c) {
			this.subscriptions.set(
				event.EVENT_NAME,
				c.filter(e => e !== callback)
			);
		}
	}

	removeEventHandler<D extends DomainEvent<DTO>, DTO>(handler: EventHandler<D, DTO>): void {
		const event = handler.subscribedTo();
		this.removeCallBack(event, handler.handle);
	}

	search<E extends DomainEvent<DTO>, DTO>(command: E): EventBusCallback<DTO>[] {
		const commandHandler = this.subscriptions.get(command.eventName);

		if (!commandHandler) {
			return [];
		}

		return commandHandler;
	}
}
