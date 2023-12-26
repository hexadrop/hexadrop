import InvalidArgumentError from '@hexadrop/error/invalid-argument';

export class CommandNotRegisteredError extends InvalidArgumentError {
	constructor(command: string) {
		super(`The command '${command}' hasn't a command handler associated`, 'CommandNotRegisteredError', 'HEX(500)');
	}
}
