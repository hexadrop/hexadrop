import type { Handler } from '@hexadrop/bus';

import type { DomainEventClass } from './domain-event';
import { DomainEvent } from './domain-event';
import type { EventBusCallback } from './event-bus';

export class EventHandlersInformation {
	private readonly eventHandlersMap: Map<string, (EventBusCallback<any> | Handler<any>)[]>;

	constructor(map?: Map<string, EventBusCallback[]>) {
		this.eventHandlersMap = map ?? new Map<string, EventBusCallback[]>();
	}

	public register<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handler: EventBusCallback<E> | Handler<E>
	): void {
		const callbacks: (EventBusCallback<E> | Handler<E>)[] =
			this.eventHandlersMap.get(event.EVENT_NAME) ?? [];
		const exists = callbacks.find(v => v === handler);
		if (!exists) {
			callbacks.push(handler);
		}

		this.eventHandlersMap.set(event.EVENT_NAME, callbacks);
	}

	search<E extends DomainEvent>(event: DomainEventClass<E> | E): EventBusCallback<E>[] {
		let handler: (EventBusCallback<E> | Handler<E>)[] = [];
		let eventName: string | undefined = undefined;
		if ('EVENT_NAME' in event) {
			eventName = event.EVENT_NAME;
		} else if ('eventName' in event) {
			eventName = event.eventName;
		}

		if (!eventName) {
			return [];
		}

		handler = this.eventHandlersMap.get(eventName) ?? [];

		return handler.map(ch => {
			if ('run' in ch) {
				return ch.run.bind(ch);
			}

			return ch;
		});
	}

	public unregister<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handler: EventBusCallback<E> | Handler<E>
	): void {
		let callbacks: (EventBusCallback<E> | Handler<E>)[] =
			this.eventHandlersMap.get(event.EVENT_NAME) ?? [];
		if (callbacks.length === 0) {
			return;
		}
		callbacks = callbacks.filter(v => v !== handler);

		this.eventHandlersMap.set(event.EVENT_NAME, callbacks);
	}
}
