import { InvalidArgumentError } from './InvalidArgumentError';

export class EmptyStringValueError extends InvalidArgumentError {
	constructor(property = 'StringValueObject') {
		super(`${property} can not be null or empty`, 'EmptyStringValueError', 'HEX(400)');
	}
}
