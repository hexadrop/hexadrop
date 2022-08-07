import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidNumberValueTypeError extends InvalidArgumentError {
	constructor() {
		super(`A NumberValueObject must only contains number values`, 'InvalidNumberValueTypeError', 'HEX(400)');
	}
}
