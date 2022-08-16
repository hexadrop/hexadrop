import { Command, DomainError, Either } from '@hexadrop/core';
import { expect, vi } from 'vitest';
import { CommandBus } from '../cqrs/CommandBus';

export class MockCommandBus implements CommandBus {
	dispatchSpy = vi.fn<[Command], Either<void, DomainError> | Promise<Either<void, DomainError>>>();

	assertLastPublishedCommand(expectedCommand: Command) {
		const spyCalls = this.dispatchSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThan(0);

		const lastSpyCall = spyCalls[spyCalls.length - 1];
		const lastCommand = lastSpyCall[0];

		expect(expectedCommand).toMatchObject(lastCommand);
	}

	assertNotPublishedCommand() {
		const publishSpyCalls = this.dispatchSpy.mock.calls;

		expect(publishSpyCalls.length).toBe(0);
	}

	assertPublishedCommands(...expectedCommands: Command[]) {
		const spyCalls = this.dispatchSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThan(0);

		const lastPublishedCommands = spyCalls.map(call => call[0]) as Command[];

		expect(expectedCommands).toMatchObject(lastPublishedCommands);
	}

	dispatch(command: Command): Either<void, DomainError> | Promise<Either<void, DomainError>> {
		return this.dispatchSpy(command);
	}
}
