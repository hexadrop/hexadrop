import InvalidArgumentError from '@hexadrop/error/invalid-argument';

export default class InvalidUuiiValueError extends InvalidArgumentError {
	constructor(value: string, property = 'UuiiValueObject') {
		super(`${property} can not contains '${value}' value`, 'InvalidUuiiValueError', 'HEX(400)');
	}
}
