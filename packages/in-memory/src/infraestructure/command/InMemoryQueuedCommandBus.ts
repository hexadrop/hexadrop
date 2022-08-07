import { Command, CommandBus, DomainError, Either } from '@hexadrop/core';
import PQueue, { Options, QueueAddOptions } from 'p-queue';
import PriorityQueue from 'p-queue/dist/priority-queue';
import { CommandHandlersInformation } from './CommandHandlersInformation';

export class InMemoryQueuedCommandBus implements CommandBus {
	private readonly q: PQueue;

	constructor(
		private readonly info: CommandHandlersInformation,
		queueOptions?: Omit<Options<PriorityQueue, QueueAddOptions>, 'autoStart'>
	) {
		const defaultOptions = {
			autoStart: true,
		};
		const options = queueOptions ? { ...queueOptions, ...defaultOptions } : defaultOptions;
		this.q = new PQueue(options);
	}

	async dispatch<C extends Command>(command: C): Promise<Either<void, DomainError>> {
		const handler = this.info.search(command);
		return await this.q.add(() => handler.handle(command));
	}
}
