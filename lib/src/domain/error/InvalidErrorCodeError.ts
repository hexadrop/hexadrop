import { InvalidArgumentError } from './InvalidArgumentError';

export class InvalidErrorCodeError extends InvalidArgumentError {
    constructor() {
        super('DomainError code be WD_XXXXXX or MYSIM_XXXXXX', 'InvalidErrorCodeError', 'HEX(400)');
    }
}
