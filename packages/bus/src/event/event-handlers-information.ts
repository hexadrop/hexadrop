import type { Handler } from '@hexadrop/bus';

import type { DomainEventClass } from './domain-event';
import { DomainEvent } from './domain-event';
import type { EventBusCallback } from './event-bus';

export class EventHandlersInformation {
	private readonly eventHandlersMap: Map<string, EventBusCallback<any>[]>;

	constructor(map?: Map<string, EventBusCallback[]>) {
		this.eventHandlersMap = map ?? new Map<string, EventBusCallback[]>();
	}

	public register<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handlerOrCallback: EventBusCallback<E> | Handler<E>
	): void {
		const callbacks: EventBusCallback<E>[] = this.eventHandlersMap.get(event.EVENT_NAME) ?? [];
		let handler: EventBusCallback<E>;
		if ('run' in handlerOrCallback) {
			// handler = handlerOrCallback.run.bind(handlerOrCallback);
			handler = handlerOrCallback.run;
		} else {
			handler = handlerOrCallback;
		}
		const exists = callbacks.find(v => v === handler);
		if (!exists) {
			callbacks.push(handler);
		}

		this.eventHandlersMap.set(event.EVENT_NAME, callbacks);
	}

	search<E extends DomainEvent>(event: DomainEventClass<E> | E): EventBusCallback<E>[] {
		let handler: EventBusCallback<E>[] = [];
		let eventName: string | undefined = undefined;
		if ('EVENT_NAME' in event) {
			eventName = event.EVENT_NAME;
		} else if ('eventName' in event) {
			eventName = event.eventName;
		}

		if (!eventName) {
			return handler;
		}

		handler = this.eventHandlersMap.get(eventName) ?? [];

		return handler;
	}

	public unregister<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handlerOrCallback: EventBusCallback<E> | Handler<E>
	): void {
		let callbacks: EventBusCallback<E>[] = this.eventHandlersMap.get(event.EVENT_NAME) ?? [];
		if (callbacks.length === 0) {
			return;
		}

		let handler: EventBusCallback<E>;
		if ('run' in handlerOrCallback) {
			// handler = handlerOrCallback.run.bind(handlerOrCallback);
			handler = handlerOrCallback.run;
		} else {
			handler = handlerOrCallback;
		}
		callbacks = callbacks.filter(v => v !== handler);

		this.eventHandlersMap.set(event.EVENT_NAME, callbacks);
	}
}
