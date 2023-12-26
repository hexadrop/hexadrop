import type { Class } from '@hexadrop/types/class';
import type { Nullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';

interface CommandConstructorParams {
	readonly commandId?: Nullable<string>;
}

abstract class Command {
	static COMMAND_NAME: string;
	readonly commandId: string;
	readonly commandName: string;

	protected constructor(commandName: string, { commandId }: CommandConstructorParams) {
		this.commandId = commandId ?? crypto.randomUUID();
		this.commandName = commandName;
	}
}

type CommandParams<D extends Command> = Omit<Primitives<D>, 'commandId' | 'commandName'> &
	Partial<Pick<D, 'commandId'>>;

type CommandClass<
	DomainInstanceType extends Command = Command,
	CtorArgs extends any[] = [CommandParams<DomainInstanceType>],
> = Class<
	CtorArgs,
	DomainInstanceType,
	{
		COMMAND_NAME: string;
	}
>;

export type { CommandClass, CommandParams };

export default Command;
