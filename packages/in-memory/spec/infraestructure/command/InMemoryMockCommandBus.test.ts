import { Command, CommandClass, CommandHandler, DomainError, Either } from '@hexadrop/core';
import { describe, expect, test, vi } from 'vitest';
import { CommandHandlersInformation } from '../../../src';
import { InMemoryMockCommandBus } from '../../../src/test';

class CustomError extends DomainError {
	constructor() {
		super('CustomError', 'msg', 'HEX(123)');
	}
}

const handler1Spy = vi.fn<[], Either<void, DomainError>>(() => Either<void, DomainError>.left(undefined));
const handler2Spy = vi.fn<[], Either<void, DomainError>>(() => Either<void, DomainError>.right(new CustomError()));

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

describe('InMemoryMockCommandBus', () => {
	test('should assertLastPublishedCommand works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const handler1 = new Command1Handler();
		const handler2 = new Command2Handler();
		const info = new CommandHandlersInformation(handler1, handler2);
		const bus = new InMemoryMockCommandBus(info);

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertLastPublishedCommand(command1)).toThrow();
		expect(() => bus.assertLastPublishedCommand(command2)).not.toThrow();
	});
	test('should assertLastPublishedCommand works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const handler1 = new Command1Handler();
		const handler2 = new Command2Handler();
		const info = new CommandHandlersInformation(handler1, handler2);
		const bus = new InMemoryMockCommandBus(info);

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertPublishedCommands(command1)).toThrow();
		expect(() => bus.assertPublishedCommands(command1, command2)).not.toThrow();
	});
	test('should assertNotPublishedCommand works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const handler1 = new Command1Handler();
		const handler2 = new Command2Handler();
		const info = new CommandHandlersInformation(handler1, handler2);
		const bus = new InMemoryMockCommandBus(info);

		expect(() => bus.assertNotPublishedCommand()).not.toThrow();

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertNotPublishedCommand()).toThrow();
	});
});
