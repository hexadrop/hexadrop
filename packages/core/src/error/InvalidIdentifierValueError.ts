import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidIdentifierValueError extends InvalidArgumentError {
	constructor(value: string) {
		super(`<Identifier> does not allow the value '${value}'`, 'InvalidIdentifierValueError', 'HEX(400)');
	}
}
