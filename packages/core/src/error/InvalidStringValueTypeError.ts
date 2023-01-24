import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidStringValueTypeError extends InvalidArgumentError {
	constructor(property = 'StringValueObject') {
		super(
			`${property} must only contains string values`,
			'InvalidStringValueTypeError',
			'HEX(400)'
		);
	}
}
