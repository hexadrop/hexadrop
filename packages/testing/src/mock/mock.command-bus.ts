import type { CommandBus, CommandBusCallback, CommandClass, Handler } from '@hexadrop/bus';
import { Command } from '@hexadrop/bus';
import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';
import type { SinonStub } from 'sinon';
import { assert, stub } from 'sinon';

export class MockCommandBus implements CommandBus {
	readonly dispatchSpy: SinonStub<
		[Command],
		Either<void, DomainError> | Promise<Either<void, DomainError>>
	>;

	readonly registerSpy: SinonStub<
		[CommandClass<any>, CommandBusCallback<any> | Handler<any>],
		void
	>;

	readonly unregisterSpy: SinonStub<
		[CommandClass<any>, CommandBusCallback<any> | Handler<any>],
		void
	>;

	constructor() {
		this.dispatchSpy = stub<
			[Command],
			Either<void, DomainError> | Promise<Either<void, DomainError>>
		>();
		this.registerSpy = stub<
			[CommandClass<any>, CommandBusCallback<any> | Handler<any>],
			void
		>();
		this.unregisterSpy = stub<
			[CommandClass<any>, CommandBusCallback<any> | Handler<any>],
			void
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

	register<C extends Command>(
		command: CommandClass<C>,
		callback: CommandBusCallback<C> | Handler<C>
	): void {
		this.registerSpy(command, callback);
	}

	unregister<C extends Command>(
		command: CommandClass<C>,
		callback: CommandBusCallback<C> | Handler<C>
	): void {
		this.unregisterSpy(command, callback);
	}
}
