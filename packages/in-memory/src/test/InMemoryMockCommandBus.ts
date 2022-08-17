import { Command, DomainError, Either } from '@hexadrop/core';
import { assert, stub } from 'sinon';
import { InMemoryCommandBus } from '../infraestructure';

export class InMemoryMockCommandBus extends InMemoryCommandBus {
	dispatchSpy = stub<[Command], Either<void, DomainError> | Promise<Either<void, DomainError>>>();

	assertDispatchedCommands(...expectedCommands: Command[]) {
		assert.called(this.dispatchSpy);
		assert.callCount(this.dispatchSpy, expectedCommands.length);
		this.dispatchSpy.getCalls().forEach((c, i) => assert.calledWith(c, expectedCommands[i]));
	}

	assertLastDispatchedCommand(expectedCommand: Command) {
		assert.called(this.dispatchSpy);
		const lastSpyCall = this.dispatchSpy.lastCall;
		assert.calledWith(lastSpyCall, expectedCommand);
	}

	assertNotDispatchedCommand() {
		assert.notCalled(this.dispatchSpy);
	}

	async dispatch(command: Command): Promise<Either<void, DomainError>> {
		await this.dispatchSpy(command);
		return super.dispatch(command);
	}
}
