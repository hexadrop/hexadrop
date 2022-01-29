import { Command } from '../cqrs/Command';
import { DomainError } from './DomainError';

export class CommandNotRegisteredError extends DomainError {
	constructor(command: Command) {
		super(600, `The command <${command.constructor.name}> hasn't a command handler associated`);
		Object.setPrototypeOf(this, CommandNotRegisteredError.prototype);
	}
}
