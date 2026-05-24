"use client";

import { useRef, useEffect } from "react";

function getTarget() {
	const element: HTMLElement = document.documentElement;
	const max: number = element.scrollHeight - element.clientHeight;

	return max > 0 ? (element.scrollTop / max) * 100 : 0;
}

export default function ScrollProgressBar() {
	const barReference: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let animationFrameId: number | null = null;
		let current = 0;

		const update: () => void = () => {
			const target: number = getTarget();
			const difference: number = target - current;

			if (Math.abs(difference) < 0.02) {
				current = target;

				if (barReference.current)
					barReference.current.style.width = `${current}%`;

				animationFrameId = null;

				return;
			}

			current += difference * 0.18;

			if (barReference.current)
				barReference.current.style.width = `${current}%`;

			animationFrameId = requestAnimationFrame(update);
		};

		const onScroll: () => void = () => {
			if (animationFrameId === null)
				animationFrameId = requestAnimationFrame(update);
		};

		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);

			if (animationFrameId !== null)
				cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div
			ref={barReference}
			aria-hidden
			className="fixed top-0 left-0 z-[60] h-[2px] bg-canal-green pointer-events-none"
			style={{ width: "0%" }}
		/>
	);
}
