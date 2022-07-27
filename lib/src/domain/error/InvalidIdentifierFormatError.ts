import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidErrorCodeError extends InvalidArgumentError {
    constructor(value: string) {
        super(`<Identifier> does not allow the value <${value}>`, 'InvalidErrorCodeError', 'HEX(400)');
    }
}
