import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import type Query from './query';

type QueryBusCallback<Response = unknown, QueryType extends Query<Response> = Query<Response>> = (
	query: QueryType
) => Either<DomainError, Response> | Promise<Either<DomainError, Response>>;

interface QueryHandler<Response, QueryType extends Query<Response> = Query<Response>> {
	run: QueryBusCallback<Response, QueryType>;
}

abstract class QueryBus {
	abstract ask<ResponseType>(
		query: Query<ResponseType>
	): Either<DomainError, ResponseType> | Promise<Either<DomainError, ResponseType>>;
}

export type { QueryBusCallback, QueryHandler };

export default QueryBus;
