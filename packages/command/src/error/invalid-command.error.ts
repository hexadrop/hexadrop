import  DomainError from '@hexadrop/error';

export class InvalidCommandError extends DomainError {
	constructor() {
		super('InvalidCommandError', `The command hasn't an 'COMMAND_NAME' static property`, 'HEX(500)');
	}
}
