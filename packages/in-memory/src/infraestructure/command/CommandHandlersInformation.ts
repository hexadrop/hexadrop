import { Command, CommandClass, CommandHandler } from '@hexadrop/core';
import { CommandNotRegisteredError } from '../../error';

export class CommandHandlersInformation {
	private commandHandlersMap: Map<string, CommandHandler<Command>>;

	constructor(...handlers: CommandHandler<Command>[]) {
		this.commandHandlersMap = this.formatHandlers(...handlers);
	}

	public addCommandHandler(...handler: CommandHandler<Command>[]) {
		handler.forEach(commandHandler => {
			const arr: CommandClass<Command>[] = [];
			if (Array.isArray(commandHandler.subscribedTo())) {
				(commandHandler.subscribedTo() as CommandClass<Command>[]).forEach(c => arr.push(c));
			} else {
				arr.push(commandHandler.subscribedTo() as CommandClass<Command>);
			}
			arr.forEach(c => this.commandHandlersMap.set(c.COMMAND_NAME, commandHandler));
		});
	}

	public search(command: Command): CommandHandler<Command> {
		const commandHandler = this.commandHandlersMap.get(command.commandName);

		if (!commandHandler) {
			throw new CommandNotRegisteredError(command.commandName);
		}

		return commandHandler;
	}

	private formatHandlers(...handlers: CommandHandler<Command>[]): Map<string, CommandHandler<Command>> {
		const map = new Map<string, CommandHandler<Command>>();

		for (const handler of handlers) {
			const arr: CommandClass<Command>[] = [];
			if (Array.isArray(handler.subscribedTo())) {
				(handler.subscribedTo() as CommandClass<Command>[]).forEach(c => arr.push(c));
			} else {
				arr.push(handler.subscribedTo() as CommandClass<Command>);
			}
			arr.forEach(c => map.set(c.COMMAND_NAME, handler));
		}

		return map;
	}
}
