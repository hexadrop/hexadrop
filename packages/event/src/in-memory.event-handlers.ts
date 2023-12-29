import type { EventBusCallback, EventHandler } from './bus';
import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';
import type { EventHandlers } from './event-handlers';

export default class InMemoryEventHandlers implements EventHandlers {
	private readonly map: Map<string, (EventBusCallback<any> | EventHandler<any>)[]>;

	constructor(map?: Map<string, EventBusCallback[]>) {
		this.map = map ?? new Map<string, EventBusCallback[]>();
	}

	register<E extends DomainEvent>(event: DomainEventClass<E>, handler: EventBusCallback<E> | EventHandler<E>): void {
		const callbacks: (EventBusCallback<E> | EventHandler<E>)[] = this.map.get(event.EVENT_NAME) ?? [];
		const exists = callbacks.find(v => v === handler);
		if (!exists) {
			callbacks.push(handler);
		}

		this.map.set(event.EVENT_NAME, callbacks);
	}

	search<E extends DomainEvent>(event: DomainEventClass<E> | E): EventBusCallback<E>[] {
		let handler: (EventBusCallback<E> | EventHandler<E>)[] = [];
		let eventName: string | undefined = undefined;
		if ('EVENT_NAME' in event) {
			eventName = event.EVENT_NAME;
		} else if ('eventName' in event) {
			eventName = event.eventName;
		}

		if (!eventName) {
			return [];
		}

		handler = this.map.get(eventName) ?? [];

		return handler.map(ch => {
			if ('run' in ch) {
				return ch.run.bind(ch);
			}

			return ch;
		});
	}

	unregister<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handler: EventBusCallback<E> | EventHandler<E>
	): void {
		let callbacks: (EventBusCallback<E> | EventHandler<E>)[] = this.map.get(event.EVENT_NAME) ?? [];
		if (callbacks.length === 0) {
			return;
		}
		callbacks = callbacks.filter(v => v !== handler);

		this.map.set(event.EVENT_NAME, callbacks);
	}
}
