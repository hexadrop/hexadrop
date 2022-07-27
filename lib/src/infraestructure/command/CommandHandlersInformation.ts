import { Command, CommandCtor, CommandHandler } from '../../domain';
import { CommandNotRegisteredError } from '../../domain/error/CommandNotRegisteredError';

export class CommandHandlersInformation {
	private commandHandlersMap: Map<CommandCtor<Command>, CommandHandler<Command>>;

	constructor(commandHandlers: Array<CommandHandler<Command>>) {
		this.commandHandlersMap = this.formatHandlers(commandHandlers);
	}

	public search(command: Command): CommandHandler<Command> {
		const commandHandler = this.commandHandlersMap.get(command.constructor as CommandCtor<Command>);

		if (!commandHandler) {
			throw new CommandNotRegisteredError(command.constructor.name);
		}

		return commandHandler;
	}

	public addCommandHandler(...handler: CommandHandler<Command>[]) {
		handler.forEach(commandHandler => {
			const arr: CommandCtor<Command>[] = [];
			if (Array.isArray(commandHandler.subscribedTo())) {
				(commandHandler.subscribedTo() as CommandCtor<Command>[]).forEach(c => arr.push(c));
			} else {
				arr.push(commandHandler.subscribedTo() as CommandCtor<Command>);
			}
			arr.forEach(c => this.commandHandlersMap.set(c, commandHandler));
		});
	}

	private formatHandlers(
		commandHandlers: Array<CommandHandler<Command>>
	): Map<CommandCtor<Command>, CommandHandler<Command>> {
		const handlersMap = new Map<CommandCtor<Command>, CommandHandler<Command>>();

		commandHandlers.forEach(commandHandler => {
			const arr: CommandCtor<Command>[] = [];
			if (Array.isArray(commandHandler.subscribedTo())) {
				(commandHandler.subscribedTo() as CommandCtor<Command>[]).forEach(c => arr.push(c));
			} else {
				arr.push(commandHandler.subscribedTo() as CommandCtor<Command>);
			}
			arr.forEach(c => handlersMap.set(c, commandHandler));
		});

		return handlersMap;
	}
}
