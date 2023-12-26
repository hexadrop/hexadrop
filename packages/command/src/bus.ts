import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import type { CommandClass } from './command';
import type Command from './command';

type CommandBusCallback<CommandType extends Command = Command> = (
	command: CommandType
) => Either<void, DomainError> | Promise<Either<void, DomainError>>;

interface CommandHandler<CommandType extends Command = Command> {
	run: CommandBusCallback<CommandType>;
}

abstract class CommandBus {
	abstract dispatch(command: Command): Either<void, DomainError> | Promise<Either<void, DomainError>>;

	abstract register<CommandType extends Command>(
		command: CommandClass<CommandType>,
		useCase: CommandHandler<CommandType>
	): void;

	abstract register<CommandType extends Command>(
		command: CommandClass<CommandType>,
		callback: CommandBusCallback<CommandType>
	): void;

	abstract unregister<CommandType extends Command>(
		command: CommandClass<CommandType>,
		callback: CommandBusCallback<CommandType> | CommandHandler<CommandType>
	): void;
}

export type { CommandBusCallback, CommandHandler };

export default CommandBus;
