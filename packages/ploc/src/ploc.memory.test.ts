import { describe, expect, jest, test } from 'bun:test';

import InMemoryPloc from './ploc.memory';

interface PlocState {
	kind: 'LoadedState';
	value: number;
}

class CounterInMemoryPloc extends InMemoryPloc<PlocState> {
	increment() {
		this.changeState({
			...this.state,
			value: this.state.value + 1,
		});
	}
}

describe('InMemoryPloc', () => {
	describe('constructor()', () => {
		test('should instantiate with a default state', () => {
			const ploc = new CounterInMemoryPloc({
				kind: 'LoadedState',
				value: 0,
			});

			expect(ploc.state).toStrictEqual({
				kind: 'LoadedState',
				value: 0,
			});
		});
	});
	describe('changeState()', () => {
		test('should works as expected', () => {
			const ploc = new CounterInMemoryPloc({
				kind: 'LoadedState',
				value: 0,
			});

			expect(ploc.state).toStrictEqual({
				kind: 'LoadedState',
				value: 0,
			});

			ploc.changeState({
				kind: 'LoadedState',
				value: 1,
			});

			expect(ploc.state).toStrictEqual({
				kind: 'LoadedState',
				value: 1,
			});
		});
	});
	describe('subscribe()', () => {
		test('should works as expected', () => {
			const spy = jest.fn((_s: PlocState) => {});
			const subscription = (state: PlocState) => spy(state);
			const ploc = new CounterInMemoryPloc({
				kind: 'LoadedState',
				value: 0,
			});

			ploc.subscribe(subscription);

			ploc.increment();

			const expectedState1 = {
				kind: 'LoadedState',
				value: 1,
			} satisfies PlocState;

			expect(ploc.state).toStrictEqual(expectedState1);

			expect(spy.mock.calls[0]).toStrictEqual([expectedState1]);

			ploc.unsubscribe(subscription);

			ploc.increment();

			const expectedState2 = {
				kind: 'LoadedState',
				value: 2,
			} satisfies PlocState;

			expect(ploc.state).toStrictEqual(expectedState2);

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});
});
