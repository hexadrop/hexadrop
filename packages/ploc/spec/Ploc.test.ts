import { describe, expect, test, vi } from 'vitest';

import { Ploc } from '../src';

interface PlocState {
	kind: 'LoadedState';
	value: number;
}

class MockPloc extends Ploc<PlocState> {
	increment() {
		this.changeState({
			...this.state,
			value: this.state.value + 1,
		});
	}
}

describe('Ploc', () => {
	test('should works as expected', () => {
		const spy = vi.fn<[PlocState], void>();
		const subscription = (state: PlocState) => spy(state);
		const ploc = new MockPloc({
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
