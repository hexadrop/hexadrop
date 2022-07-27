import { InvalidArgumentError } from './InvalidArgumentError';

export class QueryNotRegisteredError extends InvalidArgumentError {
    constructor(query: string) {
        super(`The query <${query}> hasn't a query handler associated`, 'QueryNotRegisteredError', 'HEX(400)');
    }
}
