import { QueryNotRegisteredError } from '../error';
import { InvalidQueryError } from '../error/invalid-query.error';
import type { Handler } from '../handler';
import type { QueryClass } from './query';
import { Query } from './query';
import type { QueryBusCallback } from './query-bus';

export class QueryHandlersInformation {
	private readonly queryHandlersMap: Map<string, QueryBusCallback<unknown, any>>;

	constructor(map?: Map<string, QueryBusCallback>) {
		this.queryHandlersMap = map ?? new Map<string, QueryBusCallback>();
	}

	public register<R, Q extends Query<R>>(
		query: QueryClass<R, Q>,
		handler: Handler<Q, R> | QueryBusCallback<R, Q>
	): void {
		if ('run' in handler) {
			// this.queryHandlersMap.set(query.QUERY_NAME, handler.run.bind(handler));
			this.queryHandlersMap.set(query.QUERY_NAME, handler.run);
		} else {
			this.queryHandlersMap.set(query.QUERY_NAME, handler);
		}
	}

	public search<R, Q extends Query<R>>(query: Q | QueryClass<R, Q>): QueryBusCallback<R, Q> {
		let handler: QueryBusCallback<R, Q> | undefined = undefined;
		let queryName: string | undefined = undefined;
		if ('QUERY_NAME' in query) {
			queryName = query.QUERY_NAME;
		} else if ('queryName' in query) {
			queryName = query.queryName;
		}

		if (!queryName) {
			throw new InvalidQueryError();
		}

		handler = this.queryHandlersMap.get(queryName) as QueryBusCallback<R, Q> | undefined;

		if (!handler) {
			throw new QueryNotRegisteredError(queryName);
		}

		return handler;
	}

	public unregister<R, C extends Query<R>>(query: QueryClass<R, C>): void {
		this.queryHandlersMap.delete(query.QUERY_NAME);
	}
}
