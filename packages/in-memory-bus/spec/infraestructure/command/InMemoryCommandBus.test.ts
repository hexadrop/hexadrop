import { Command, CommandClass, CommandHandler, DomainError, Either } from '@hexadrop/core';
import { describe, expect, test, vi } from 'vitest';

import { CommandHandlersInformation, InMemoryCommandBus } from '../../../src';

class CustomError extends DomainError {
	constructor() {
		super('CustomError', 'msg', 'HEX(123)');
	}
}

const handler1Spy = vi.fn<[], Either<void, DomainError>>(() => Either.left(undefined));
const handler2Spy = vi.fn<[], Either<void, DomainError>>(() => Either.right(new CustomError()));

class Command1 extends Command {
	static readonly COMMAND_NAME = 'Command1';

	constructor() {
		super(Command1.COMMAND_NAME);
	}
}

class Command1Handler implements CommandHandler<Command1> {
	handle(): Either<void, DomainError> {
		return handler1Spy();
	}

	subscribedTo(): CommandClass<Command1> {
		return Command1;
	}
}

class Command2 extends Command {
	static readonly COMMAND_NAME = 'Command2';

	constructor() {
		super(Command2.COMMAND_NAME);
	}
}

class Command2Handler implements CommandHandler<Command2> {
	handle(): Either<void, DomainError> {
		return handler2Spy();
	}

	subscribedTo(): CommandClass<Command2> {
		return Command2;
	}
}

describe('InMemoryCommandBus', () => {
	test('should works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const handler1 = new Command1Handler();
		const handler2 = new Command2Handler();
		const info = new CommandHandlersInformation(handler1, handler2);
		const bus = new InMemoryCommandBus(info);

		const either1 = await bus.dispatch(command1);

		expect(handler1Spy).toHaveBeenCalledOnce();
		expect(either1).toBeDefined();
		expect(either1.isLeft()).toBeTruthy();

		const either2 = await bus.dispatch(command2);

		expect(handler2Spy).toHaveBeenCalledOnce();
		expect(either2).toBeDefined();
		expect(either2.isRight()).toBeTruthy();
		expect(either2.getRight().message).toBe('msg');
		expect(either2.getRight().name).toBe('CustomError');
	});
});
