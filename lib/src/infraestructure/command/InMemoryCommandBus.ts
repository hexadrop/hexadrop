import { Command, CommandBus, DomainError, Either } from '../../domain';
import { CommandHandlersInformation } from './CommandHandlersInformation';

export class InMemoryCommandBus implements CommandBus {
	constructor(private readonly commandHandlersInformation: CommandHandlersInformation) {
	}

	dispatch<C extends Command>(
		command: C,
	): Either<void, DomainError> | Promise<Either<void, DomainError>> {
		const handler = this.commandHandlersInformation.search(command);
		return handler.handle(command);
	}
}
