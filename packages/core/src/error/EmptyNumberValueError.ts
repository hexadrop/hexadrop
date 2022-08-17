import { InvalidArgumentError } from './InvalidArgumentError';

export class EmptyNumberValueError extends InvalidArgumentError {
	constructor(property = 'NumberValueObject') {
		super(`${property} can not be null or empty`, 'EmptyNumberValueError', 'HEX(400)');
	}
}
