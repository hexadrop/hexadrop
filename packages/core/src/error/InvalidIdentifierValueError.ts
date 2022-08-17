import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidIdentifierValueError extends InvalidArgumentError {
	constructor(property = 'IdentifierValueObject', value: string) {
		super(`${property} can not contains '${value}' value`, 'InvalidIdentifierValueError', 'HEX(400)');
	}
}
