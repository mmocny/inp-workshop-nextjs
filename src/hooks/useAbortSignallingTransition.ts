import { TransitionFunction, TransitionStartFunction, useCallback, useState } from "react";
import useAwaitableTransition, { AwaitableTransitionStartFunction } from "./useAwaitableTransition";

export default function useAbortSignallingTransition() : [boolean, AwaitableTransitionStartFunction, AbortSignal] {
	const [isPending, startAwaitableTransition] = useAwaitableTransition();
	const [abortController, setAbortController] = useState(new AbortController);

	const startAbortSignallingTransition = useCallback(async (callback: TransitionFunction) => {
		const newAbortController = new AbortController();

		try {
			await startAwaitableTransition(() => {
				callback();
				setAbortController(newAbortController);
			});
			// Cleanup here
		} catch(ex) {
			// Abort here
			newAbortController.abort();
			// throw ex;
		}
	}, [startAwaitableTransition, setAbortController]);

	return [isPending, startAbortSignallingTransition, abortController.signal];
};