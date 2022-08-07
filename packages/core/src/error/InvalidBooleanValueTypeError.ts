import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidBooleanValueTypeError extends InvalidArgumentError {
	constructor() {
		super(`A BooleanValueObject must only contains boolean values`, 'InvalidBooleanValueTypeError', 'HEX(400)');
	}
}
