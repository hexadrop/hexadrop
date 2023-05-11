import { InvalidArgumentError } from '@hexadrop/error';

export class InvalidNumberValueTypeError extends InvalidArgumentError {
	constructor(property = 'NumberValueObject') {
		super(
			`${property} must only contains number values`,
			'InvalidNumberValueTypeError',
			'HEX(400)'
		);
	}
}
