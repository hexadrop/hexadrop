import type { CommandClass } from './command';
import CommandCommand from './command';

function CommandHandler<E extends CommandCommand>(command: CommandClass<E>): ClassDecorator {
	return <ClassType extends Function>(target: ClassType): ClassType => {
		Reflect.defineMetadata('command-handler', true, target);

		const handlers = Reflect.getMetadata<ClassType[]>('command-handlers', command);
		if (handlers) {
			handlers.push(target);
		} else {
			Reflect.defineMetadata('command-handlers', [target], command);
		}

		return target;
	};
}

export default CommandHandler;
