import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';

import type { Handler } from '../handler';
import type { Command, CommandClass } from './command';
import type { CommandBus, CommandBusCallback } from './command-bus';
import { CommandHandlersInformation } from './command-handlers-information';

export class InMemoryCommandBus implements CommandBus {
	private readonly info: CommandHandlersInformation;
	constructor(info?: CommandHandlersInformation) {
		this.info = info ?? new CommandHandlersInformation();
	}

	async dispatch<C extends Command>(command: C): Promise<Either<void, DomainError>> {
		const promises = [];
		const callbacks = this.info.search(command);
		for (const handler of callbacks) {
			promises.push(
				new Promise<void>((resolve, reject) => {
					const returnValue = handler(command);
					if (returnValue instanceof Promise) {
						void returnValue.then(e =>
							e.isRight() ? reject(e.getRight()) : resolve()
						);
					} else {
						returnValue.isRight() ? reject(returnValue.getRight()) : resolve();
					}
				})
			);
		}

		return Promise.all(promises)
			.then(() => Either.left<void, DomainError>(undefined))
			.catch(e => Either.right(e));
	}

	register<C extends Command>(command: CommandClass<C>, useCase: Handler<C>): void;
	register<C extends Command>(command: CommandClass<C>, callback: CommandBusCallback<C>): void;
	register<C extends Command>(
		command: CommandClass<C>,
		useCaseOrCallback: CommandBusCallback<C> | Handler<C>
	): void {
		this.info.register(command, useCaseOrCallback);
	}

	unregister<C extends Command>(command: CommandClass<C>): void {
		this.info.unregister(command);
	}
}
