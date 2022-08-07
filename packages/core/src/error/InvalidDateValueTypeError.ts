import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidDateValueTypeError extends InvalidArgumentError {
	constructor() {
		super(`A DateValueObject must only contains date values`, 'InvalidDateValueTypeError', 'HEX(400)');
	}
}
