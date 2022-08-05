import { DomainError } from './DomainError';

export class CommandNotRegisteredError extends DomainError {
	constructor(command: string) {
		super('CommandNotRegisteredError', `The command '${command}' hasn't a command handler associated`, 'HEX(400)');
	}
}
