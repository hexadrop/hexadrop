import { DomainError } from './domain.error';

export abstract class InvalidArgumentError extends DomainError {
	constructor(message: string, name = 'InvalidArgumentError', code = 'HEX(400)') {
		super(name, message, code);
	}
}