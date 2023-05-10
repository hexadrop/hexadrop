import { InvalidArgumentError } from './invalid-argument.error';

export class InvalidStringValueError extends InvalidArgumentError {
	constructor(property = 'StringValueObject', value: string) {
		super(
			`${property} can not contains '${value}' value`,
			'InvalidStringValueError',
			'HEX(400)'
		);
	}
}
