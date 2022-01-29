import { Command } from './Command';

export type CommandCtor<T> = new (...args: any[]) => T;

export interface CommandHandler<T extends Command> {
	handle(command: T): Promise<void>;

	subscribedTo(): CommandCtor<T> | CommandCtor<T>[];
}
