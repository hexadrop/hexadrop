import { Command, DomainError, Either } from '@hexadrop/core';
import { expect, vi } from 'vitest';
import { InMemoryCommandBus } from '../infraestructure';

export class InMemoryMockCommandBus extends InMemoryCommandBus {
	dispatchSpy = vi.fn();

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

	async dispatch(command: Command): Promise<Either<void, DomainError>> {
		await this.dispatchSpy(command);
		return super.dispatch(command);
	}
}
