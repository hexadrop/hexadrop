import { DomainError } from './DomainError';

export class EmptyEventNameError extends DomainError {
	constructor(command: string) {
		super('EmptyEventNameError', `The command '${command}' hasn't a command handler associated`, 'HEX(400)');
	}
}
