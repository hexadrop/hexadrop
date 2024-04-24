import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import { beforeEach, describe, expect, test } from 'bun:test';

import type { CommandBusCallback, CommandHandler } from './bus';
import Command from './command';
import { CommandNotRegisteredError } from './error';
import InMemoryCommandHandlers from './in-memory.command-handlers';

class Command1 extends Command {
	static override COMMAND_NAME = 'Command1';

	constructor() {
		super(Command1.COMMAND_NAME, 'id');
	}
}

class Command2 extends Command {
	static override COMMAND_NAME = 'Command2';

	constructor() {
		super(Command2.COMMAND_NAME, 'id');
	}
}

class Command3 extends Command {
	static override COMMAND_NAME = 'Command3';

	constructor() {
		super(Command3.COMMAND_NAME, 'id');
	}
}

class Command4 extends Command {
	static override COMMAND_NAME = 'Command4';

	constructor() {
		super(Command4.COMMAND_NAME, 'id');
	}
}

class Command5 extends Command {
	static override COMMAND_NAME = 'Command5';

	constructor() {
		super(Command5.COMMAND_NAME, 'id');
	}
}

class Command6 extends Command {
	static override COMMAND_NAME = 'Command6';

	constructor() {
		super(Command6.COMMAND_NAME, 'id');
	}
}

class Service {
	async hello(): Promise<string> {
		return await Promise.resolve('world');
	}
}

class Command1Handler implements CommandHandler<Command1> {
	constructor(private readonly service: Service) {}

	async run(): Promise<Either<DomainError, void>> {
		await this.service.hello();

		return Either.right();
	}
}

class Command23Handler implements CommandHandler<Command2 | Command3> {
	run(): Either<DomainError, void> {
		return Either.right();
	}
}

class Command4Handler implements CommandHandler<Command4> {
	constructor(private readonly service: Service) {}
	async run(): Promise<Either<DomainError, void>> {
		await this.service.hello();

		return Either.right();
	}
}

describe('InMemoryCommandHandlers', () => {
	let c1: Command;
	let c2: Command;
	let c3: Command;
	let c4: Command;
	let c5: Command;
	let c6: Command;

	let svc: Service;

	let expectedCommand1Handler: CommandHandler;
	let expectedCommand23Handler: CommandHandler;
	let expectedCommand4Handler: CommandHandler;
	let expectedCommand56Handler: CommandBusCallback;

	let info: InMemoryCommandHandlers;

	beforeEach(() => {
		c1 = new Command1();
		c2 = new Command2();
		c3 = new Command3();
		c4 = new Command4();
		c5 = new Command5();
		c6 = new Command6();

		svc = new Service();

		expectedCommand1Handler = new Command1Handler(svc);
		expectedCommand23Handler = new Command23Handler();
		expectedCommand4Handler = new Command4Handler(svc);
		expectedCommand56Handler = function expectedCommand56Handler(): Either<DomainError, void> {
			return Either.right();
		};

		info = new InMemoryCommandHandlers();

		info.register(Command1, expectedCommand1Handler);
		info.register(Command2, expectedCommand23Handler);
		info.register(Command3, expectedCommand23Handler);
	});

	describe('search()', () => {
		test('should return a registered command handler', () => {
			const h1 = info.search(c1);
			expect(h1).toBeDefined();

			const h2 = info.search(c2);
			expect(h2).toBeDefined();

			const h3 = info.search(c3);
			expect(h3).toBeDefined();

			const h4 = info.search(Command3);
			expect(h4).toBeDefined();
			expect(h4).toBe(h3);
		});
		test('should throw and error if command handler is not registered', () => {
			const expectedError = new CommandNotRegisteredError(Command4.COMMAND_NAME);
			expect(() => info.search(c4)).toThrow(expectedError);
			expect(() => info.search(Command4)).toThrow(expectedError);
			expect(expectedError.message).toBe(
				`The command '${Command4.COMMAND_NAME}' hasn't a command handler associated`,
			);
		});
	});

	describe('register()', () => {
		test('should register a non previous registered command handler', () => {
			info.register(Command4, expectedCommand4Handler);
			info.register(Command5, expectedCommand56Handler);
			info.register(Command6, expectedCommand56Handler);

			const h4 = info.search(c4);
			expect(h4).toBeDefined();

			const h5 = info.search(c5);
			expect(h5).toBeDefined();
			expect(h5).toStrictEqual(expectedCommand56Handler);

			const h6 = info.search(c6);
			expect(h6).toBeDefined();
			expect(h6).toStrictEqual(expectedCommand56Handler);
		});
		test('should register a previous registered command handler', () => {
			info.register(Command1, expectedCommand4Handler);

			const h4 = info.search(c1);
			expect(h4).toBeDefined();
		});
	});

	describe('unregister()', () => {
		test('should unregister a previous registered command handler', () => {
			const h3 = info.search(c3);
			expect(h3).toBeDefined();
			info.unregister(Command3);
			expect(() => info.search(c3)).toThrow(new CommandNotRegisteredError(Command3.COMMAND_NAME));
		});
	});
});
