import { assert, stub } from 'sinon';
import { Command } from '../cqrs/Command';
import { CommandBus } from '../cqrs/CommandBus';
import { Either } from '../Either';
import { DomainError } from '../error';

export class MockCommandBus implements CommandBus {
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

	dispatch(command: Command): Either<void, DomainError> | Promise<Either<void, DomainError>> {
		return this.dispatchSpy(command);
	}
}
