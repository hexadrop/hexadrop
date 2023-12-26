import type { CommandBusCallback, CommandHandler } from './bus';
import Command, { type CommandClass } from './command';
import { CommandNotRegisteredError, InvalidCommandError } from './error';

export default class CommandHandlers {
	private readonly commandHandlersMap: Map<string, CommandBusCallback<any>[]>;

	constructor(map?: Map<string, CommandBusCallback[]>) {
		this.commandHandlersMap = map ?? new Map<string, CommandBusCallback[]>();
	}

	public register<C extends Command>(
		command: CommandClass<C>,
		handlerOrCallback: CommandBusCallback<C> | CommandHandler<C>
	): void {
		const callbacks: CommandBusCallback<C>[] = this.commandHandlersMap.get(command.COMMAND_NAME) ?? [];
		let handler: CommandBusCallback<C>;
		if ('run' in handlerOrCallback) {
			handler = handlerOrCallback.run.bind(handlerOrCallback);
		} else {
			handler = handlerOrCallback;
		}

		const exists = callbacks.find(v => v === handler);
		if (!exists) {
			callbacks.push(handler);
		}

		this.commandHandlersMap.set(command.COMMAND_NAME, callbacks);
	}

	public search<C extends Command>(command: C | CommandClass<C>): CommandBusCallback<C>[] {
		let handler: CommandBusCallback<C>[] | undefined = [];
		let commandName: string | undefined = undefined;
		if ('COMMAND_NAME' in command) {
			commandName = command.COMMAND_NAME;
		} else if ('commandName' in command) {
			commandName = command.commandName;
		}

		if (!commandName) {
			throw new InvalidCommandError();
		}

		handler = this.commandHandlersMap.get(commandName);

		if (!handler) {
			throw new CommandNotRegisteredError(commandName);
		}

		return handler;
	}

	public unregister<C extends Command>(command: CommandClass<C>): void {
		this.commandHandlersMap.delete(command.COMMAND_NAME);
	}
}
