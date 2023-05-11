import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';
import type { Clazz } from '@hexadrop/types';

import { Command } from './command';
import { DomainEvent } from './event';
import { Query } from './query';

export interface Handler<
	CQE extends Command | DomainEvent | Query<Response>,
	Response = void,
	Error extends DomainError = DomainError
> {
	run(commandOrQuery: CQE): Either<Response, Error> | Promise<Either<Response, Error>>;
}

export type HandlerClass<
	CQE extends Command | DomainEvent | Query<Response>,
	Response = void,
	Error extends DomainError = DomainError
> = Clazz<Handler<CQE, Response, Error>>;
