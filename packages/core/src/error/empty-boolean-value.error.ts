import { InvalidArgumentError } from './invalid-argument.error';

export class EmptyBooleanValueError extends InvalidArgumentError {
	constructor(property = 'BooleanValueObject') {
		super(`${property} can not be null or empty`, 'EmptyBooleanValueError', 'HEX(400)');
	}
}
