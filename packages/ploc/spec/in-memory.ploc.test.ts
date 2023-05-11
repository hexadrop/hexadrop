import { describe, expect, test, vi } from 'vitest';

import { InMemoryPloc } from '../src/memory';

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
	test('should works as expected', () => {
		const spy = vi.fn<[PlocState], void>();
		const subscription = (state: PlocState) => spy(state);
		const ploc = new CounterInMemoryPloc({
			kind: 'LoadedState',
			value: 0,
		});

		expect(ploc.state).toStrictEqual({
			kind: 'LoadedState',
			value: 0,
		});

		ploc.subscribe(subscription);

		ploc.increment();

		const expectedState1 = {
			kind: 'LoadedState',
			value: 1,
		};

		expect(ploc.state).toStrictEqual(expectedState1);

		expect(spy).toHaveBeenCalledWith(expectedState1);

		ploc.unsubscribe(subscription);

		ploc.increment();

		const expectedState2 = {
			kind: 'LoadedState',
			value: 2,
		};

		expect(ploc.state).toStrictEqual(expectedState2);

		expect(spy).toHaveBeenCalledTimes(1);
	});
});
