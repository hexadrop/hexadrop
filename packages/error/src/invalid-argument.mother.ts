import InvalidArgumentError from './invalid-argument';

export default class InvalidArgumentErrorMother {
	static create(message: string, name?: string, code?: string): InvalidArgumentError {
		return new InvalidArgumentError(message, name, code);
	}
}
