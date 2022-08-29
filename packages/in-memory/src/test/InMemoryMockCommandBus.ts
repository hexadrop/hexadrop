import type { Command, DomainError, Either } from '@hexadrop/core';
import { assert, stub } from 'sinon';
import type { SinonStub } from 'sinon';
import { CommandHandlersInformation, InMemoryCommandBus } from '../infraestructure';

export class InMemoryMockCommandBus extends InMemoryCommandBus {
	readonly dispatchSpy: SinonStub<[Command], Either<void, DomainError> | Promise<Either<void, DomainError>>>;

	constructor(info: CommandHandlersInformation) {
		super(info);
		this.dispatchSpy = stub<[Command], Either<void, DomainError> | Promise<Either<void, DomainError>>>();
	}

	assertDispatchedCommands(...expectedCommands: Command[]) {
		assert.called(this.dispatchSpy);
		const eventsArr = this.dispatchSpy
			.getCalls()
			.map(c => c.args)
			.flat();
		assert.match(eventsArr.length, expectedCommands.length);
		assert.match(
			eventsArr.map(e => InMemoryMockCommandBus.getDataFromCommand(e)),
			expectedCommands.map(e => InMemoryMockCommandBus.getDataFromCommand(e))
		);
	}

	assertLastDispatchedCommand(expectedCommand: Command) {
		assert.called(this.dispatchSpy);
		const lastSpyCall = this.dispatchSpy.lastCall;
		const eventsArr = lastSpyCall.args;
		assert.match(
			InMemoryMockCommandBus.getDataFromCommand(eventsArr[0]),
			InMemoryMockCommandBus.getDataFromCommand(expectedCommand)
		);
	}

	assertNotDispatchedCommand() {
		assert.notCalled(this.dispatchSpy);
	}

	override async dispatch(command: Command): Promise<Either<void, DomainError>> {
		await this.dispatchSpy(command);
		return super.dispatch(command);
	}

	private static getDataFromCommand(command: Command) {
		const { commandId, ...attributes } = command;
		return attributes;
	}

	dispatchRejects(error: Error) {
		this.dispatchSpy.rejects(error);
	}

	askResolve(value: Either<any, DomainError>) {
		this.dispatchSpy.resolves(value);
	}
}
