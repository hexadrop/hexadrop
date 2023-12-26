import { describe, expect, jest, test } from 'bun:test';
import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import type { CommandBusCallback, CommandHandler } from './bus';
import { SyncCommandBus } from './bus.sync';
import Command from './command';
import CommandHandlers from './command-handlers';

class CustomError extends DomainError {
	constructor() {
		super('CustomError', 'msg', 'HEX(123)');
	}
}

const handler1Spy = jest.fn(() => Either.left<void, DomainError>(undefined));
const handler2Spy = jest.fn(() => Either.right<void, DomainError>(new CustomError()));

class Command1 extends Command {
	static override COMMAND_NAME = 'Command1';

	constructor() {
		super(Command1.COMMAND_NAME, {
			commandId: 'id',
		});
	}
}

class Command1Handler implements CommandHandler<Command1> {
	run(): Either<void, DomainError> {
		return handler1Spy();
	}
}

class Command2 extends Command {
	static override COMMAND_NAME = 'Command2';

	constructor() {
		super(Command2.COMMAND_NAME, { commandId: 'id' });
	}
}

class Command2Handler implements CommandHandler<Command2> {
	run(): Either<void, DomainError> {
		return handler2Spy();
	}
}

describe('InMemoryCommandBus', () => {
	test('should works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const handler1 = new Command1Handler();
		const handler2 = new Command2Handler();

		const map = new Map<string, CommandBusCallback[]>();
		map.set(Command1.COMMAND_NAME, [handler1.run.bind(handler1)]);
		map.set(Command2.COMMAND_NAME, [handler2.run.bind(handler2)]);
		const info = new CommandHandlers(map);

		const bus = new SyncCommandBus(info);

		const either1 = await bus.dispatch(command1);

		expect(handler1Spy).toHaveBeenCalledTimes(1);
		expect(either1).toBeDefined();
		expect(either1.isLeft()).toBeTruthy();

		const either2 = await bus.dispatch(command2);

		expect(handler2Spy).toHaveBeenCalledTimes(1);
		expect(either2).toBeDefined();
		expect(either2.isRight()).toBeTruthy();
		expect(either2.getRight().message).toBe('msg');
		expect(either2.getRight().name).toBe('CustomError');
	});
});
