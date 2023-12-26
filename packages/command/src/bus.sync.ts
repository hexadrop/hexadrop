import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import CommandBus, { type CommandBusCallback, type CommandHandler } from './bus';

import Command, { type CommandClass } from './command';
import CommandHandlers from './command-handlers';

export class SyncCommandBus extends CommandBus {
	private readonly info: CommandHandlers;
	constructor(info?: CommandHandlers) {
		super();
		this.info = info ?? new CommandHandlers();
	}

	async dispatch<C extends Command>(command: C): Promise<Either<void, DomainError>> {
		const promises = [];
		const callbacks = this.info.search(command);
		for (const handler of callbacks) {
			promises.push(
				new Promise<void>((resolve, reject) => {
					try {
						const returnValue = handler(command);
						if (returnValue instanceof Promise) {
							void returnValue.then(e => (e.isRight() ? reject(e.getRight()) : resolve())).catch(e => reject(e));
						} else {
							returnValue.isRight() ? reject(returnValue.getRight()) : resolve();
						}
					} catch (e) {
						reject(e);
					}
				})
			);
		}

		return Promise.all(promises)
			.then(() => Either.left<void, DomainError>(undefined))
			.catch(e => Either.right(e));
	}

	register<C extends Command>(command: CommandClass<C>, useCase: CommandHandler<C>): void;
	register<C extends Command>(command: CommandClass<C>, callback: CommandBusCallback<C>): void;
	register<C extends Command>(
		command: CommandClass<C>,
		useCaseOrCallback: CommandBusCallback<C> | CommandHandler<C>
	): void {
		this.info.register(command, useCaseOrCallback);
	}

	unregister<C extends Command>(command: CommandClass<C>): void {
		this.info.unregister(command);
	}
}
