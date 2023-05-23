'use client';

import { useEffect } from "react";
import { logAllInteractions } from "@/script/onInteraction.js";

export default function InteractionMonitor() {
	useEffect(() => {
		logAllInteractions();
	}, []);
	return <></>;
}