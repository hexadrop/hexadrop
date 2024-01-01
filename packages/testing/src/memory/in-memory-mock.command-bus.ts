import { Command } from '@hexadrop/bus';
import { CommandHandlersInformation, InMemoryCommandBus } from '@hexadrop/bus/memory';
import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';
import type { SinonStub } from 'sinon';
import { assert, stub } from 'sinon';

export class InMemoryMockCommandBus extends InMemoryCommandBus {
	readonly dispatchSpy: SinonStub<
		[Command],
		Either<void, DomainError> | Promise<Either<void, DomainError>>
	>;

	constructor(info?: CommandHandlersInformation) {
		super(info);
		this.dispatchSpy = stub<
			[Command],
			Either<void, DomainError> | Promise<Either<void, DomainError>>
		>();
	}

	private static getDataFromCommand(command: Command) {
		const { commandId: _c, ...attributes } = command;

		return attributes;
	}

	assertDispatchedCommands(...expectedCommands: Command[]): void {
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

	assertLastDispatchedCommand(expectedCommand: Command): void {
		assert.called(this.dispatchSpy);
		const lastSpyCall = this.dispatchSpy.lastCall;
		const eventsArr = lastSpyCall.args;
		assert.match(
			InMemoryMockCommandBus.getDataFromCommand(eventsArr[0]),
			InMemoryMockCommandBus.getDataFromCommand(expectedCommand)
		);
	}

	assertNotDispatchedCommand(): void {
		assert.notCalled(this.dispatchSpy);
	}

	override async dispatch(command: Command): Promise<Either<void, DomainError>> {
		await this.dispatchSpy(command);

		return super.dispatch(command);
	}

	dispatchRejects(error: Error): void {
		this.dispatchSpy.rejects(error);
	}

	dispatchResolve(value: Either<any, DomainError>): void {
		this.dispatchSpy.resolves(value);
	}
}