import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import { beforeEach, describe, expect, jest, test } from 'bun:test';

import type { CommandHandler } from './bus';
import SyncCommandBus from './bus.sync';
import Command from './command';
import InMemoryCommandHandlers from './in-memory.command-handlers';

class Service {
	hello(): string {
		return 'world';
	}
}

class CustomError extends DomainError {
	constructor() {
		super('CustomError', 'msg', 'HEX(123)');
	}
}

class Command1 extends Command {
	static override COMMAND_NAME = 'Command1';

	constructor() {
		super(Command1.COMMAND_NAME, 'id');
	}
}

const handler1Spy = jest.fn((_cmd: Command1, _message: string) => Either.right<DomainError>());

class Command1Handler implements CommandHandler<Command1> {
	constructor(private readonly service: Service) {}
	run(cmd: Command1): Either<DomainError, void> {
		const hello = this.service.hello();

		return handler1Spy(cmd, hello);
	}
}

class Command2 extends Command {
	static override COMMAND_NAME = 'Command2';

	constructor() {
		super(Command2.COMMAND_NAME, 'id');
	}
}

const handler2Spy = jest.fn((_cmd: Command2) => Either.left<DomainError, void>(new CustomError()));

class Command2Handler implements CommandHandler<Command2> {
	run(cmd: Command2): Either<DomainError, void> {
		return handler2Spy(cmd);
	}
}

describe('SyncCommandBus', () => {
	let c1: Command;
	let c2: Command;
	let svc: Service;
	let handler1: CommandHandler;
	let handler2: CommandHandler;
	let info: InMemoryCommandHandlers;
	let bus: SyncCommandBus;

	beforeEach(() => {
		c1 = new Command1();
		c2 = new Command2();
		svc = new Service();
		handler1 = new Command1Handler(svc);
		handler2 = new Command2Handler();

		info = new InMemoryCommandHandlers();
		info.register(Command1, handler1);
		info.register(Command2, handler2);

		bus = new SyncCommandBus(info);
	});

	describe('dispatch()', () => {
		test('should works as expected', async () => {
			const either1 = await bus.dispatch(c1);

			expect(either1).toBeDefined();
			expect(either1.isRight()).toBeTruthy();
			expect(handler1Spy).toHaveBeenCalledTimes(1);
			expect(handler1Spy).toHaveBeenCalledWith(c1, 'world');

			const either2 = await bus.dispatch(c2);

			expect(either2).toBeDefined();
			expect(either2.isLeft()).toBeTruthy();
			expect(either2.getLeft().message).toBe('msg');
			expect(either2.getLeft().name).toBe('CustomError');
			expect(handler2Spy).toHaveBeenCalledTimes(1);
			expect(handler2Spy).toHaveBeenCalledWith(c2);
		});
	});
});
