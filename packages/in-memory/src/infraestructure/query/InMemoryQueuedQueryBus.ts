import { DomainError, Either, Query, QueryBus } from '@hexadrop/core';
import PQueue, { Options, QueueAddOptions } from 'p-queue';
import PriorityQueue from 'p-queue/dist/priority-queue';
import { QueryHandlersInformation } from './QueryHandlersInformation';

export class InMemoryQueuedQueryBus implements QueryBus {
	private readonly q: PQueue;

	constructor(
		private readonly map: QueryHandlersInformation,
		queueOptions?: Omit<Options<PriorityQueue, QueueAddOptions>, 'autoStart'>
	) {
		const defaultOptions = {
			autoStart: true,
		};
		const options = queueOptions ? { ...queueOptions, ...defaultOptions } : defaultOptions;
		this.q = new PQueue(options);
	}

	async ask<Q extends Query, R>(query: Q): Promise<Either<R, DomainError>> {
		const handler = this.map.search<Q, R>(query);
		return await this.q.add(() => handler.handle(query));
	}
}
