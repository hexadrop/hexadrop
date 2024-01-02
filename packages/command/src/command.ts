import type { Class } from '@hexadrop/types/class';
import type { Nullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';

/**
 * @property {Nullable<string>} commandId - The ID of the command.
 */
interface CommandConstructorParams {
	commandId?: Nullable<string>;
}

/**
 * @abstract
 * @class Command
 * @description Abstract class representing a command.
 */
abstract class Command {
	/**
	 * @static
	 * @property {string} COMMAND_NAME - The name of the command.
	 */
	static COMMAND_NAME: string;

	/**
	 * @property {string} commandId - The ID of the command.
	 */
	readonly commandId: string;

	/**
	 * @property {string} commandName - The name of the command.
	 */
	readonly commandName: string;

	/**
	 * Constructs a new instance of the Command class.
	 *
	 * @param commandName - The name of the command.
	 * @param params - An optional object containing additional parameters for the command.
	 * @property commandId - The ID of the command. If not provided in the params, a random UUID will be generated.
	 * @property commandName - The name of the command, as provided in the commandName parameter.
	 */
	protected constructor(commandName: string, params?: CommandConstructorParams) {
		const { commandId } = params ?? {};
		this.commandId = commandId ?? crypto.randomUUID();
		this.commandName = commandName;
	}
}

/**
 * @type {Omit<Primitives<D>, 'commandId' | 'commandName'> & Partial<Pick<D, 'commandId'>>}
 * @template D - The type of the command.
 */
type CommandParams<D extends Command> = Omit<Primitives<D>, 'commandId' | 'commandName'> &
	Partial<Pick<D, 'commandId'>>;

/**
 * @type {Class<CtorArgs, DomainInstanceType, { COMMAND_NAME: string; }>}
 * @template DomainInstanceType - The type of the command.
 * @template CtorArgs - The constructor arguments.
 */
type CommandClass<
	DomainInstanceType extends Command = Command,
	CtorArgs extends any[] = [CommandParams<DomainInstanceType>?],
> = Class<
	CtorArgs,
	DomainInstanceType,
	{
		COMMAND_NAME: string;
	}
>;

export type { CommandClass, CommandParams };

export default Command;
