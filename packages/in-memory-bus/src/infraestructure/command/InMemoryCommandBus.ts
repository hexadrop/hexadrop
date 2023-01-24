import type { Command, CommandBus, DomainError, Either } from '@hexadrop/core';

import type { CommandHandlersInformation } from './CommandHandlersInformation';

export class InMemoryCommandBus implements CommandBus {
	constructor(private readonly info: CommandHandlersInformation) {}

	dispatch<C extends Command>(
		command: C
	): Either<void, DomainError> | Promise<Either<void, DomainError>> {
		const handler = this.info.search(command);

		return handler.handle(command);
	}
}
