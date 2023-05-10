import type { Clazz } from '@hexadrop/core';
import { Command, DomainError, DomainEvent, Either, Query } from '@hexadrop/core';

export interface UseCase<
	CQE extends Command | DomainEvent | Query<Response>,
	Response = void,
	Error extends DomainError = DomainError
> {
	run(commandOrQuery: CQE): Either<Response, Error> | Promise<Either<Response, Error>>;
}

export type UseCaseClass<
	CQE extends Command | DomainEvent | Query<Response>,
	Response = void,
	Error extends DomainError = DomainError
> = Clazz<UseCase<CQE, Response, Error>>;
