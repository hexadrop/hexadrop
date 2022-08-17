import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidNumberValueTypeError extends InvalidArgumentError {
	constructor(property = 'NumberValueObject') {
		super(`${property} must only contains number values`, 'InvalidNumberValueTypeError', 'HEX(400)');
	}
}
