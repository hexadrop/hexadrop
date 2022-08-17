import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidStringValueError extends InvalidArgumentError {
	constructor(property = 'StringValueObject', value: string) {
		super(`${property} can not contains '${value}' value`, 'InvalidStringValueError', 'HEX(400)');
	}
}
