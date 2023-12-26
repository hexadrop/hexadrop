import { describe, expect, test } from 'bun:test';
import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import type { CommandBusCallback, CommandHandler } from './bus';
import Command from './command';
import CommandHandlers from './command-handlers';
import { CommandNotRegisteredError } from './error';

class Command1 extends Command {
	static override COMMAND_NAME = 'Command1';

	constructor() {
		super(Command1.COMMAND_NAME, { commandId: 'id' });
	}
}

class Command2 extends Command {
	static override COMMAND_NAME = 'Command2';

	constructor() {
		super(Command2.COMMAND_NAME, { commandId: 'id' });
	}
}

class Command3 extends Command {
	static override COMMAND_NAME = 'Command3';

	constructor() {
		super(Command3.COMMAND_NAME, { commandId: 'id' });
	}
}

class Command4 extends Command {
	static override COMMAND_NAME = 'Command4';

	constructor() {
		super(Command4.COMMAND_NAME, { commandId: 'id' });
	}
}

class Command5 extends Command {
	static override COMMAND_NAME = 'Command5';

	constructor() {
		super(Command5.COMMAND_NAME, { commandId: 'id' });
	}
}

class Command6 extends Command {
	static override COMMAND_NAME = 'Command6';

	constructor() {
		super(Command6.COMMAND_NAME, { commandId: 'id' });
	}
}

class Service {
	hello(): string {
		return 'world';
	}
}

class Command1Handler implements CommandHandler<Command1> {
	constructor(private readonly service: Service) {}

	async run(): Promise<Either<void, DomainError>> {
		this.service.hello();

		return Promise.resolve(Either.left(undefined));
	}
}

class Command23Handler implements CommandHandler<Command2 | Command3> {
	async run(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}
}

class Command4Handler implements CommandHandler<Command4> {
	constructor(private readonly service: Service) {}
	async run(): Promise<Either<void, DomainError>> {
		this.service.hello();

		return Promise.resolve(Either.left(undefined));
	}
}

class Command56Handler implements CommandHandler<Command5 | Command6> {
	async run(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}
}

describe('CommandHandlers', () => {
	test('should works as expected', () => {
		const c1 = new Command1();
		const c2 = new Command2();
		const c3 = new Command3();
		const c4 = new Command4();
		const c5 = new Command5();
		const c6 = new Command6();

		const s = new Service();

		const expectedCommand1Handler = new Command1Handler(s);
		const expectedCommand23Handler = new Command23Handler();
		const expectedCommand4Handler = new Command4Handler(s);
		const expectedCommand56Handler = new Command56Handler();

		const map = new Map<string, CommandBusCallback[]>();
		map.set(Command1.COMMAND_NAME, [expectedCommand1Handler.run]);
		map.set(Command2.COMMAND_NAME, [expectedCommand23Handler.run]);
		map.set(Command3.COMMAND_NAME, [expectedCommand23Handler.run]);
		const info = new CommandHandlers(map);

		const h1 = info.search(c1);
		expect(h1).toBeDefined();
		expect(h1).toHaveLength(1);
		expect(h1).toStrictEqual([expectedCommand1Handler.run]);

		const h2 = info.search(c2);
		expect(h2).toBeDefined();
		expect(h2).toStrictEqual([expectedCommand23Handler.run]);

		const h3 = info.search(c3);
		expect(h3).toBeDefined();
		expect(h3).toStrictEqual([expectedCommand23Handler.run]);

		const expectedError = new CommandNotRegisteredError(Command4.COMMAND_NAME);
		expect(() => info.search(c4)).toThrow(expectedError);
		expect(expectedError.message).toBe(`The command '${Command4.COMMAND_NAME}' hasn't a command handler associated`);

		info.register(Command4, expectedCommand4Handler);
		info.register(Command5, expectedCommand56Handler);
		info.register(Command6, expectedCommand56Handler);

		const h4 = info.search(c4);
		expect(h4).toBeDefined();
		expect(h4).toHaveLength(1);

		const h5 = info.search(c5);
		expect(h5).toBeDefined();
		expect(h5).toHaveLength(1);

		const h6 = info.search(c6);
		expect(h6).toBeDefined();
		expect(h6).toHaveLength(1);
	});
});
