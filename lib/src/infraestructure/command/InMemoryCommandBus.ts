import { Command, CommandBus } from '../../domain';
import { CommandHandlersInformation } from './CommandHandlersInformation';

export class InMemoryCommandBus implements CommandBus {
	constructor(private readonly commandHandlersInformation: CommandHandlersInformation) {}

	async dispatch(command: Command): Promise<void> {
		const handler = this.commandHandlersInformation.search(command);
		await handler.handle(command);
	}
}
