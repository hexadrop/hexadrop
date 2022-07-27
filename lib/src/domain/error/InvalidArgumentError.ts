import { DomainError } from './DomainError';

export abstract class InvalidArgumentError extends DomainError {
	protected constructor(
		message: string,
		name?: string,
		code?: string) {
		super(name || 'InvalidArgumentError', message, code);
	}
}
