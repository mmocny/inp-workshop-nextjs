import { TransitionFunction, TransitionStartFunction, useCallback, useEffect, useRef, useTransition } from "react";

export default function useAwaitableTransition() : [boolean, TransitionStartFunction] {
	const [isPending, startTransition] = useTransition();
	const resolveRef = useRef<(value?: unknown) => void>();
	const rejectRef = useRef<(reason?: any) => void>();

	const startAwaitableTransition = useCallback(
		(callback: TransitionFunction) => {
			rejectRef.current?.();

			return new Promise((resolve, reject) => {
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