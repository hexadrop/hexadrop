import { InvalidArgumentError } from './invalid-argument.error';

export class InvalidIdentifierValueError extends InvalidArgumentError {
	constructor(property = 'IdentifierValueObject', value: string) {
		super(
			`${property} can not contains '${value}' value`,
			'InvalidIdentifierValueError',
			'HEX(400)'
		);
	}
}
