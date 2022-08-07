import { describe, expect, test } from 'vitest';
import { Command, CommandClass, CommandHandler, DomainError, Either } from '@hexadrop/core';
import { CommandHandlersInformation, CommandNotRegisteredError } from '../../../src';

class Command1 extends Command {
	static readonly COMMAND_NAME = 'Command1';

	constructor() {
		super(Command1.COMMAND_NAME);
	}
}

class Command2 extends Command {
	static readonly COMMAND_NAME = 'Command2';

	constructor() {
		super(Command2.COMMAND_NAME);
	}
}

class Command3 extends Command {
	static readonly COMMAND_NAME = 'Command3';

	constructor() {
		super(Command3.COMMAND_NAME);
	}
}

class Command4 extends Command {
	static readonly COMMAND_NAME = 'Command4';

	constructor() {
		super(Command4.COMMAND_NAME);
	}
}

class Command5 extends Command {
	static readonly COMMAND_NAME = 'Command5';

	constructor() {
		super(Command5.COMMAND_NAME);
	}
}

class Command6 extends Command {
	static readonly COMMAND_NAME = 'Command6';

	constructor() {
		super(Command6.COMMAND_NAME);
	}
}

class Command1Handler implements CommandHandler<Command1> {
	handle(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}

	subscribedTo(): CommandClass<Command1> {
		return Command1;
	}
}

class Command23Handler implements CommandHandler<Command2 | Command3> {
	handle(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}

	subscribedTo(): [CommandClass<Command2>, CommandClass<Command3>] {
		return [Command2, Command3];
	}
}

class Command4Handler implements CommandHandler<Command4> {
	handle(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}

	subscribedTo(): CommandClass<Command4> {
		return Command4;
	}
}

class Command56Handler implements CommandHandler<Command5 | Command6> {
	handle(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}

	subscribedTo(): [CommandClass<Command5>, CommandClass<Command6>] {
		return [Command5, Command6];
	}
}

describe('CommandHandlersInformation', () => {
	test('should works as expected', () => {
		const c1 = new Command1();
		const c2 = new Command2();
		const c3 = new Command3();
		const c4 = new Command4();
		const c5 = new Command5();
		const c6 = new Command6();

		const expectedCommand1Handler = new Command1Handler();
		const expectedCommand23Handler = new Command23Handler();
		const expectedCommand4Handler = new Command4Handler();
		const expectedCommand56Handler = new Command56Handler();

		const info = new CommandHandlersInformation(expectedCommand1Handler, expectedCommand23Handler);

		const h1 = info.search(c1);
		expect(h1).toBeDefined();
		expect(h1).toBeInstanceOf(Command1Handler);

		const h2 = info.search(c2);
		expect(h2).toBeDefined();
		expect(h2).toBeInstanceOf(Command23Handler);

		const h3 = info.search(c3);
		expect(h3).toBeDefined();
		expect(h3).toBeInstanceOf(Command23Handler);

		const fn = () => info.search(c4);
		expect(fn).toThrow(CommandNotRegisteredError);
		expect(fn).toThrow(`The command 'Command4' hasn't a command handler associated`);

		info.addCommandHandler(expectedCommand4Handler);
		info.addCommandHandler(expectedCommand56Handler);

		const h4 = info.search(c4);
		expect(h4).toBeDefined();
		expect(h4).toBeInstanceOf(Command4Handler);

		const h5 = info.search(c5);
		expect(h5).toBeDefined();
		expect(h5).toBeInstanceOf(Command56Handler);

		const h6 = info.search(c6);
		expect(h6).toBeDefined();
		expect(h6).toBeInstanceOf(Command56Handler);
	});
});
