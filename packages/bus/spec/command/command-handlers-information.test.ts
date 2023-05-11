import type { CommandBusCallback, Handler } from '@hexadrop/bus';
import { Command } from '@hexadrop/bus';
import { CommandHandlersInformation } from '@hexadrop/bus/memory';
import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';
import { describe, expect, test } from 'vitest';

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

class Command1Handler implements Handler<Command1> {
	async run(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}
}

class Command23Handler implements Handler<Command2 | Command3> {
	async run(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}
}

class Command4Handler implements Handler<Command4> {
	async run(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}
}

class Command56Handler implements Handler<Command5 | Command6> {
	async run(): Promise<Either<void, DomainError>> {
		return Promise.resolve(Either.left(undefined));
	}
}

describe('HandlersInformation', () => {
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

		const map: Map<string, CommandBusCallback[]> = new Map();
		map.set(Command1.COMMAND_NAME, [expectedCommand1Handler.run]);
		map.set(Command2.COMMAND_NAME, [expectedCommand23Handler.run]);
		map.set(Command3.COMMAND_NAME, [expectedCommand23Handler.run]);
		const info = new CommandHandlersInformation(map);

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

		const fn = info.search(c4);
		expect(fn).toStrictEqual([]);

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
