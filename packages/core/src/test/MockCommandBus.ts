import { assert, SinonStub, stub } from 'sinon';

import type { Command } from '../cqrs/Command';
import type { CommandBus } from '../cqrs/CommandBus';
import type { Either } from '../Either';
import type { DomainError } from '../error';

export class MockCommandBus implements CommandBus {
	readonly dispatchSpy: SinonStub<
		[Command],
		Either<void, DomainError> | Promise<Either<void, DomainError>>
	>;

	constructor() {
		this.dispatchSpy = stub<
			[Command],
			Either<void, DomainError> | Promise<Either<void, DomainError>>
		>();
	}

	private static getDataFromCommand(command: Command) {
		const { commandId: _c, ...attributes } = command;

		return attributes;
	}

	askResolve(value: Either<any, DomainError>): void {
		this.dispatchSpy.resolves(value);
	}

	assertDispatchedCommands(...expectedCommands: Command[]): void {
		assert.called(this.dispatchSpy);
		const eventsArr = this.dispatchSpy
			.getCalls()
			.map(c => c.args)
			.flat();
		assert.match(eventsArr.length, expectedCommands.length);
		assert.match(
			eventsArr.map(e => MockCommandBus.getDataFromCommand(e)),
			expectedCommands.map(e => MockCommandBus.getDataFromCommand(e))
		);
	}

	assertLastDispatchedCommand(expectedCommand: Command): void {
		assert.called(this.dispatchSpy);
		const lastSpyCall = this.dispatchSpy.lastCall;
		const eventsArr = lastSpyCall.args;
		assert.match(
			MockCommandBus.getDataFromCommand(eventsArr[0]),
			MockCommandBus.getDataFromCommand(expectedCommand)
		);
	}

	assertNotDispatchedCommand(): void {
		assert.notCalled(this.dispatchSpy);
	}

	dispatch(command: Command): Either<void, DomainError> | Promise<Either<void, DomainError>> {
		return this.dispatchSpy(command);
	}

	dispatchRejects(error: Error): void {
		this.dispatchSpy.rejects(error);
	}
}
