import { TransitionFunction, TransitionStartFunction, useCallback, useLayoutEffect, useRef, useTransition } from "react";

export type AwaitableTransitionStartFunction = (callback: TransitionFunction) => Promise<void>;

export default function useAwaitableTransition() : [boolean, AwaitableTransitionStartFunction] {
	const [isPending, startTransition] = useTransition();
	const resolveRef = useRef<(value?: unknown) => void>();
	const rejectRef = useRef<(reason?: any) => void>();

	// This callback will start a new transition, returning a promise that resolves when the transition is complete,
	// or rejects if the transition is interrupted.
	const startAwaitableTransition: AwaitableTransitionStartFunction = useCallback(
		(callback: TransitionFunction) => new Promise((resolve, reject) => {
		// Reject previous transition-- only if a new transition is started before the previous one is complete.
			rejectRef.current?.();
			// @ts-ignore
			resolveRef.current = resolve;
			rejectRef.current = reject;

			startTransition(callback);
		}), [startTransition]);

	// Now, we need a way to detect transition completionion, in order to resolve()...
	// I don't know of a better way to detect this, except to leverage useEffect, since these don't trigger for
	// rendering inside transitions, and wait until after next React commit.
	useLayoutEffect(() => {
		if (isPending) return;
		performance.mark('useLayoutEffect');

		// Resovlve the current transition-- but this waits for next LayoutEffect + microtask to complete...
		// Which may be everso a bit later than we might otherwise want, but still in the same macrotask as rendering.
		resolveRef.current?.();

		resolveRef.current = undefined;
		rejectRef.current = undefined;
	}, [isPending]);

	return [isPending, startAwaitableTransition];
};