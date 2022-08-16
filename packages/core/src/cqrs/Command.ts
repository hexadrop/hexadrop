import { IdentifierValueObject } from '../value-object';

export abstract class Command {
	readonly commandId: string;
	readonly commandName: string;
	readonly relatedId?: string;

	protected constructor(commandName: string, commandId?: string, relatedId?: string) {
		this.commandId = commandId || IdentifierValueObject.random().value;
		this.commandName = commandName;
		this.relatedId = relatedId;
	}
}

export type CommandClass<D extends Command> = {
	COMMAND_NAME: string;
	new (...args: any[]): D;
};
