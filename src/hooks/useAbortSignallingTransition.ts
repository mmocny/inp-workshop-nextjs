import { TransitionFunction, TransitionStartFunction, useCallback, useState } from "react";
import useAwaitableTransition, { AwaitableTransitionStartFunction } from "./useAwaitableTransition";

export default function useAbortSignallingTransition() : [boolean, AwaitableTransitionStartFunction, AbortSignal] {
	const [isPending, startAwaitableTransition] = useAwaitableTransition();
	const [abortController, setAbortController] = useState(new AbortController);

	const startAbortSignallingTransition = useCallback(async (callback: TransitionFunction) => {
		const newAbortController = new AbortController();

		try {
			await startAwaitableTransition(() => {
				setAbortController(newAbortController);
				callback();
			});
			// Cleanup here
		} catch (ex) {
			newAbortController.abort();
			// throw ex;
		}
	}, [startAwaitableTransition, setAbortController]);

	return [isPending, startAbortSignallingTransition, abortController.signal];
};