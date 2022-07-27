import { DomainError } from './DomainError';

export class CommandNotRegisteredError extends DomainError {
    constructor(command: string) {
        super(`The command <${command}> hasn't a command handler associated`, 'CommandNotRegisteredError', 'HEX(400)');
    }
}
