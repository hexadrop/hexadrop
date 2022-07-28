import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidIdentifierFormatError extends InvalidArgumentError {
    constructor(value: string) {
        super(`<Identifier> does not allow the value '${value}'`, 'InvalidIdentifierFormatError', 'HEX(400)');
    }
}
