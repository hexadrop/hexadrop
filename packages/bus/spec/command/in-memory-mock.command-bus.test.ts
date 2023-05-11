import type { CommandBusCallback, Handler } from '@hexadrop/bus';
import { Command } from '@hexadrop/bus';
import { CommandHandlersInformation } from '@hexadrop/bus/memory';
import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';
import { InMemoryMockCommandBus } from '@hexadrop/testing/memory';
import { describe, expect, test, vi } from 'vitest';

class CustomError extends DomainError {
	constructor() {
		super('CustomError', 'msg', 'HEX(123)');
	}
}

const handler1Spy = vi.fn<[], Either<void, DomainError>>(() => Either.left(undefined));
const handler2Spy = vi.fn<[], Either<void, DomainError>>(() => Either.right(new CustomError()));

class Command1 extends Command {
	static override COMMAND_NAME = 'Command1';

	constructor() {
		super(Command1.COMMAND_NAME, 'id');
	}
}

class Command1Handler implements Handler<Command1> {
	run(): Either<void, DomainError> {
		return handler1Spy();
	}
}

class Command2 extends Command {
	static override COMMAND_NAME = 'Command2';

	constructor() {
		super(Command2.COMMAND_NAME, 'id');
	}
}

class Command2Handler implements Handler<Command2> {
	run(): Either<void, DomainError> {
		return handler2Spy();
	}
}

describe('InMemoryMockCommandBus', () => {
	test('should assertLastDispatchedCommand works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const handler1 = new Command1Handler();
		const handler2 = new Command2Handler();
		const map: Map<string, CommandBusCallback[]> = new Map();
		map.set(Command1.COMMAND_NAME, [handler1.run.bind(handler1)]);
		map.set(Command2.COMMAND_NAME, [handler2.run.bind(handler2)]);
		const info = new CommandHandlersInformation(map);
		const bus = new InMemoryMockCommandBus(info);

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertLastDispatchedCommand(command1)).toThrow();
		expect(() => bus.assertLastDispatchedCommand(command2)).not.toThrow();
	});
	test('should assertLastDispatchedCommand works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const handler1 = new Command1Handler();
		const handler2 = new Command2Handler();
		const map: Map<string, CommandBusCallback[]> = new Map();
		map.set(Command1.COMMAND_NAME, [handler1.run.bind(handler1)]);
		map.set(Command2.COMMAND_NAME, [handler2.run.bind(handler2)]);
		const info = new CommandHandlersInformation(map);
		const bus = new InMemoryMockCommandBus(info);

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertDispatchedCommands(command1)).toThrow();
		expect(() => bus.assertDispatchedCommands(command1, command2)).not.toThrow();
	});
	test('should assertNotDispatchedCommand works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const handler1 = new Command1Handler();
		const handler2 = new Command2Handler();
		const map: Map<string, CommandBusCallback[]> = new Map();
		map.set(Command1.COMMAND_NAME, [handler1.run.bind(handler1)]);
		map.set(Command2.COMMAND_NAME, [handler2.run.bind(handler2)]);
		const info = new CommandHandlersInformation(map);
		const bus = new InMemoryMockCommandBus(info);

		expect(() => bus.assertNotDispatchedCommand()).not.toThrow();

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertNotDispatchedCommand()).toThrow();
	});
});
