import { Command, CommandBus, CommandHandler, DomainError, Either } from '../../domain';
import { CommandHandlersInformation } from './CommandHandlersInformation';

export class InMemoryCommandBus implements CommandBus {
    constructor(private readonly commandHandlersInformation: CommandHandlersInformation) {
    }

    async dispatch<C extends Command = Command, E extends DomainError = DomainError>(command: C): Promise<Either<void, E>> {
        const handler = this.commandHandlersInformation.search(command) as CommandHandler<C, E>;
        return await handler.handle(command);
    }
}
