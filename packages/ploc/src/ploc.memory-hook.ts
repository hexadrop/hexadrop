import { useEffect, useState } from 'react';

import type InMemoryPloc from './ploc.memory';

export default function usePlocState<S>(ploc: InMemoryPloc<S>): S {
	const [state, setState] = useState(ploc.state);

	useEffect(() => {
		const stateSubscription = (state: S) => {
			setState(state);
		};

		ploc.subscribe(stateSubscription);

		return () => ploc.unsubscribe(stateSubscription);
	}, [ploc]);

	return state;
}
