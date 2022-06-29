import { DomainError, Query, QueryHandler, QueryNotRegisteredError, Response } from '../../domain';

type MapKey = Query<Response> | string;
type MapValue<R extends Response, Q extends Query<R>, E extends DomainError> = QueryHandler<R, Q, E>;

export class QueryHandlersInformation {
    private queryHandlersMap: Map<MapKey, MapValue<Response, Query<Response>, DomainError>>;

    constructor(queryHandlers: Array<MapValue<Response, Query<Response>, DomainError>>) {
        this.queryHandlersMap = this.formatHandlers(queryHandlers);
    }

    public addQueryHandler(...handlers: Array<MapValue<Response, Query<Response>, DomainError>>) {
        handlers.forEach(handler => {
            this.queryHandlersMap.set(handler.subscribedTo(), handler);
            this.queryHandlersMap.set(handler.subscribedTo().name, handler);
        });
    }

    public search<R extends Response, Q extends Query<R>, E extends DomainError>(query: Q): MapValue<R, Q, E> {
        const queryHandler =
            this.queryHandlersMap.get(query.constructor) || this.queryHandlersMap.get(query.constructor.name);

        if (!queryHandler) {
            throw new QueryNotRegisteredError(query);
        }

        return queryHandler as MapValue<R, Q, E>;
    }

    private formatHandlers<R extends Response, Q extends Query<R>, E extends DomainError>(
        queryHandlers: Array<MapValue<R, Q, E>>,
    ): Map<MapKey, MapValue<R, Q, E>> {
        const handlersMap = new Map<MapKey, MapValue<R, Q, E>>();

        queryHandlers.forEach(queryHandler => {
            handlersMap.set(queryHandler.subscribedTo(), queryHandler);
            handlersMap.set(queryHandler.subscribedTo().name, queryHandler);
        });

        return handlersMap;
    }
}
