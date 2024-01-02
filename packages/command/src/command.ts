import type { Class } from '@hexadrop/types/class';

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
	 * Constructs a new Command instance.
	 *
	 * @protected
	 * @param {string} commandName - The name of the command instance.
	 * @param {string} [commandId] - The unique identifier of the command instance. If not provided, a random UUID will be generated.
	 */
	protected constructor(commandName: string, commandId?: string) {
		this.commandName = commandName;
		this.commandId = commandId ?? crypto.randomUUID();
	}
}

/**
 * @type {Class<CtorArgs, DomainInstanceType, { COMMAND_NAME: string; }>}
 * @template DomainInstanceType - The type of the command.
 * @template CtorArgs - The constructor arguments.
 */
type CommandClass<DomainInstanceType extends Command = Command, CtorArgs extends any[] = any[]> = Class<
	CtorArgs,
	DomainInstanceType,
	{
		COMMAND_NAME: string;
	}
>;

export type { CommandClass };

export default Command;
