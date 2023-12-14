import InvalidArgumentError from '@hexadrop/error/invalid-argument';

export default class InvalidUuiiValueError extends InvalidArgumentError {
	constructor(property = 'UuiiValueObject', value: string) {
		super(`${property} can not contains '${value}' value`, 'InvalidUuiiValueError', 'HEX(400)');
	}
}
