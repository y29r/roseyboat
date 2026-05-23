"use client";
import { useRef, useEffect } from "react";

export default function ScrollProgressBar() {
	const barRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let rafId: number | null = null;
		let current = 0;

		const getTarget = () => {
			const el = document.documentElement;
			const max = el.scrollHeight - el.clientHeight;
			return max > 0 ? (el.scrollTop / max) * 100 : 0;
		};

		const tick = () => {
			const target = getTarget();
			const diff = target - current;

			if (Math.abs(diff) < 0.02) {
				current = target;
				if (barRef.current) barRef.current.style.width = `${current}%`;
				rafId = null;
				return;
			}

			current += diff * 0.18;
			if (barRef.current) barRef.current.style.width = `${current}%`;
			rafId = requestAnimationFrame(tick);
		};

		const onScroll = () => {
			if (rafId === null) rafId = requestAnimationFrame(tick);
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			if (rafId !== null) cancelAnimationFrame(rafId);
		};
	}, []);

	return (
		<div
			ref={barRef}
			aria-hidden
			className="fixed top-0 left-0 z-[60] h-[2px] bg-canal-green pointer-events-none"
			style={{ width: "0%" }}
		/>
	);
}
