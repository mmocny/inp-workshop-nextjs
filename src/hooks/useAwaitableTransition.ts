import { TransitionFunction, TransitionStartFunction, useCallback, useEffect, useRef, useTransition } from "react";

export type AwaitableTransitionStartFunction = (callback: TransitionFunction) => Promise<void>;

export default function useAwaitableTransition() : [boolean, AwaitableTransitionStartFunction] {
	const [isPending, startTransition] = useTransition();
	const resolveRef = useRef<(value?: unknown) => void>();
	const rejectRef = useRef<(reason?: any) => void>();

	const startAwaitableTransition: AwaitableTransitionStartFunction = useCallback(
		(callback: TransitionFunction) => {
			rejectRef.current?.();

			return new Promise((resolve, reject) => {
				// @ts-ignore
				resolveRef.current = resolve;
				rejectRef.current = reject;

				startTransition(() => {
					callback();
				});
			});
		}, [startTransition, rejectRef]);
	
	useEffect(() => {
		if (!isPending) {
			resolveRef.current?.();

			resolveRef.current = undefined;
			rejectRef.current = undefined;
		}
	}, [isPending]);

	return [isPending, startAwaitableTransition];
};