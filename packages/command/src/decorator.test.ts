import '@abraham/reflection';

import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import { describe, expect, jest, test } from 'bun:test';

import type { CommandHandler } from './bus';
import Command from './command';
import Decorator from './decorator';

const handler1Spy = jest.fn(() => Either.right<DomainError, void>(undefined));

class Command1 extends Command {
	static override COMMAND_NAME = 'Command1';

	constructor(readonly foo: string) {
		super(Command1.COMMAND_NAME, 'id');
	}
}

class Command1Handler implements CommandHandler<Command1> {
	run(): Either<DomainError, void> {
		return handler1Spy();
	}
}

class Command2Handler {
	booz(): Either<DomainError, void> {
		return handler1Spy();
	}
}

describe('@CommandHandler()', () => {
	test('should decorate a command handler', () => {
		const target = Decorator(Command1)(Command1Handler);
		expect(target).toBe(Command1Handler);
		const handler = Reflect.getMetadata('command-handler', Command1);
		expect(handler).toStrictEqual(Command1Handler);
	});
	test('should throw an exception if command handler has `run()` method', () => {
		const expectedError = new Error('CommandHandler must implements a `run()` method');
		expect(() => Decorator(Command1)(Command2Handler)).toThrow(expectedError);
	});
});
