import { useEffect, useState } from 'react';

import type { Ploc } from './ploc';

export function usePlocState<S>(ploc: Ploc<S>): S {
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
