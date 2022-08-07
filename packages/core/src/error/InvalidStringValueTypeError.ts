import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidStringValueTypeError extends InvalidArgumentError {
	constructor() {
		super(`A StringValueObject must only contains string values`, 'InvalidStringValueTypeError', 'HEX(400)');
	}
}
