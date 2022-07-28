import { IdentifierValueObject } from '../value-object';

export abstract class Command {
    static COMMAND_NAME: string;
    readonly commandId: string;
    readonly commandName: string;

    protected constructor(commandName: string, commandId?: string) {
        this.commandId = commandId || IdentifierValueObject.random().value;
        this.commandName = commandName;
    }
}

export type CommandClass<D extends Command> = {
    COMMAND_NAME: string;
    new(...args: any[]): D
};
