import type { CommandClass } from './command';
import Command from './command';

/**
 * @constant
 * @description The metadata key used to define command handlers.
 */
const COMMAND_HANDLER_METADATA_KEY = 'command-handler';

/**
 * @function CommandHandlerDecorator
 * @description A decorator function to define command handlers.
 * @param {...CommandClass<CommandType>[]} commands - The commands that the handler can handle.
 * @returns {ClassDecorator} - A class decorator that defines the command handler.
 * @template CommandType - The type of the command.
 */
function CommandHandlerDecorator<CommandType extends Command>(
	...commands: CommandClass<CommandType>[]
): ClassDecorator {
	return <ClassType extends Function>(target: ClassType): ClassType => {
		if ('run' in target.prototype) {
			for (const command of commands) {
				Reflect.defineMetadata<ClassType>(COMMAND_HANDLER_METADATA_KEY, target, command);
			}
		} else {
			throw new Error('CommandHandler must implements a `run()` method');
		}

		return target;
	};
}

export { COMMAND_HANDLER_METADATA_KEY };

export default CommandHandlerDecorator;
