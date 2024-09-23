import { PubSub, Topic } from '@google-cloud/pubsub';
import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';

import type { EventBusCallback, EventHandler } from './bus';
import EventBus from './bus';
import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';

/**
 * PubSubEventBus is a class that extends the abstract EventBus class.
 * It provides PubSub implementation of the EventBus.
 *
 * @class
 * @extends {EventBus}
 */
export default class PubSubEventBus extends EventBus {
	private readonly topics = new Map<string, Topic>();

	/**
	 * Creates an instance of PubSubEventBus.
	 *
	 * @param {PubSub} pubSub - The PubSub instance to use.
	 */
	constructor(readonly pubSub: PubSub) {
		super();
	}

	/**
	 * @pubSub
	 * @param {...DomainEvent[]} events - The domain events to publish.
	 * @returns {Promise<Either<DomainError, void>>}
	 */
	async publish(...events: DomainEvent[]): Promise<Either<DomainError, void>> {
		const promises: Promise<string | void>[] = [];
		for (const event of events) {
			const invalid = async () => {
				const topic = await this.getTopic(event);
				const data = JSON.stringify(event);

				return topic.publishMessage({ data });
			};
			promises.push(invalid());
		}

		await Promise.all(promises);

		return Either.right();
	}

	/*
	 * Subscribes to a domain event.
	 *
	 * @abstract
	 * @param {DomainEventClass<Event>} _event - The domain event to subscribe to.
	 * @param {EventBusCallback<Event> | EventHandler<Event>} _useCaseOrCallback - The use case or callback to be executed when the event is triggered.
	 */
	subscribe<Event extends DomainEvent>(
		_event: DomainEventClass<Event>,
		_useCaseOrCallback: EventBusCallback<Event> | EventHandler<Event>
	): void {
		throw new Error('Method not implemented.');
	}

	private async getTopic(event: DomainEvent): Promise<Topic> {
		const eventName = event.eventName;
		let topic = this.topics.get(eventName);
		if (topic) {
			return topic;
		}
		topic = this.pubSub.topic(eventName);
		const [exists] = await topic.exists();
		if (!exists) {
			await topic.create();
		}

		this.topics.set(eventName, topic);

		return topic;
	}
}
