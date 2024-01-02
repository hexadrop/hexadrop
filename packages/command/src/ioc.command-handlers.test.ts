import '@abraham/reflection';

import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import { beforeEach, describe, expect, test } from 'bun:test';
import { ContainerBuilder, Service as ServiceDecorator } from 'diod';

import type { CommandHandler } from './bus';
import Command from './command';
import CommandHandlerDecorator from './decorator';
import { CommandNotRegisteredError } from './error';
import IoCCommandHandlers from './ioc.command-handlers';

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

@ServiceDecorator()
class Service {
	hello(): string {
		return 'world';
	}
}

@CommandHandlerDecorator(Command1)
class Command1Handler implements CommandHandler<Command1> {
	constructor(private readonly service: Service) {}

	async run(): Promise<Either<DomainError, void>> {
		this.service.hello();

		return Promise.resolve(Either.right(undefined));
	}
}

@CommandHandlerDecorator(Command2, Command3)
class Command23Handler implements CommandHandler<Command2 | Command3> {
	async run(): Promise<Either<DomainError, void>> {
		return Promise.resolve(Either.right(undefined));
	}
}

describe('IoCCommandHandlers', () => {
	let c1: Command;
	let c2: Command;
	let c3: Command;
	let c4: Command;

	let info: IoCCommandHandlers;

	beforeEach(() => {
		c1 = new Command1();
		c2 = new Command2();
		c3 = new Command3();
		c4 = new Command4();

		const builder = new ContainerBuilder();
		builder.registerAndUse(Service);
		builder.registerAndUse(Command1Handler);
		builder.registerAndUse(Command23Handler);

		const container = builder.build();

		info = new IoCCommandHandlers(container);
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
		});
		test('should throw and error if command handler is not registered', () => {
			const expectedError = new CommandNotRegisteredError(Command4.COMMAND_NAME);
			expect(() => info.search(c4)).toThrow(expectedError);
			expect(() => info.search(Command4)).toThrow(expectedError);
			expect(expectedError.message).toBe(
				`The command '${Command4.COMMAND_NAME}' hasn't a command handler associated`
			);
		});
	});
});
