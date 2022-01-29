import { DomainError } from './DomainError';

export class InvalidArgumentError extends DomainError {
	constructor(message: string) {
		super(400, message);
		Object.setPrototypeOf(this, InvalidArgumentError.prototype);
	}
}
