import { InvalidArgumentError } from '@hexadrop/error';

export class QueryNotRegisteredError extends InvalidArgumentError {
	constructor(query: string) {
		super(
			`The query '${query}' hasn't a query handler associated`,
			'QueryNotRegisteredError',
			'HEX(500)'
		);
	}
}
