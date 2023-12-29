import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import type { Class } from '@hexadrop/types/class';

import type Command from './command';

/**
 * @callback CommandBusCallback
 * @param {CommandType} command - The command to be executed.
 * @returns {Either<DomainError, void> | Promise<Either<DomainError, void>>} - The result of the command execution.
 * @template CommandType - The type of the command.
 */
type CommandBusCallback<CommandType extends Command = Command> = (
	command: CommandType
) => Either<DomainError, void> | Promise<Either<DomainError, void>>;

/**
 * @interface CommandHandler
 * @property {CommandBusCallback<CommandType>} run - The method to run the command.
 * @template CommandType - The type of the command.
 */
interface CommandHandler<CommandType extends Command = Command> {
	run: CommandBusCallback<CommandType>;
}

type CommandHandlerClass<CommandType extends Command> = Class<any[], CommandHandler<CommandType>>;

/**
 * @abstract
 * @class CommandBus
 * @description Abstract class representing a command bus.
 */
abstract class CommandBus {
	/**
	 * @abstract
	 * @method dispatch
	 * @param {Command} command - The command to be dispatched.
	 * @returns {Either<DomainError, void> | Promise<Either<DomainError, void>>} - The result of the command dispatch.
	 */
	abstract dispatch(command: Command): Either<DomainError, void> | Promise<Either<DomainError, void>>;
}

export type { CommandBusCallback, CommandHandler, CommandHandlerClass };

export default CommandBus;
