import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidStringValueError extends InvalidArgumentError {
	constructor(value: string) {
		super(`Invalid value '${value}'`, 'InvalidStringValueError', 'HEX(400)');
	}
}
