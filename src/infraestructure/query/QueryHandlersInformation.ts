import { Query, QueryHandler } from '../../domain';
import { QueryNotRegisteredError } from '../../domain/error/QueryNotRegisteredError';

type MapValue<Q extends Query, R = unknown> = QueryHandler<Q, R>;

export class QueryHandlersInformation {
	private queryHandlersMap: Map<string, MapValue<Query>>;

	constructor(...queryHandlers: MapValue<Query>[]) {
		this.queryHandlersMap = this.formatHandlers(queryHandlers);
	}

	public addQueryHandler(...handlers: Array<MapValue<Query>>) {
		handlers.forEach(h => {
			this.queryHandlersMap.set(h.subscribedTo().QUERY_NAME, h);
		});
	}

	public search<Q extends Query, R>(query: Q): MapValue<Q, R> {
		const queryHandler = this.queryHandlersMap.get(query.queryName);

		if (!queryHandler) {
			throw new QueryNotRegisteredError(query.queryName);
		}

		return queryHandler as MapValue<Q, R>;
	}

	private formatHandlers<Q extends Query>(queryHandlers: Array<MapValue<Q>>): Map<string, MapValue<Q>> {
		const handlersMap = new Map<string, MapValue<Q>>();

		queryHandlers.forEach(queryHandler => handlersMap.set(queryHandler.subscribedTo().QUERY_NAME, queryHandler));

		return handlersMap;
	}
}
