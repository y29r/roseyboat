"use client";

import { useRef, useEffect, useState } from "react";

const SECTIONS: { id: string; label: string }[] = [
	{ id: "experience", label: "Experience" },
	{ id: "gallery", label: "Gallery" },
	{ id: "booking", label: "Availability" },
	{ id: "amenities", label: "Amenities" },
	{ id: "location", label: "Location" },
	{ id: "testimonials", label: "Reviews" },
];

function getScrollPercent(): number {
	const element: HTMLElement = document.documentElement;
	const max: number = element.scrollHeight - element.clientHeight;

	return max > 0 ? (element.scrollTop / max) * 100 : 0;
}

function getActiveSection(): string {
	const threshold: number = window.innerHeight * 0.4;

	let active: string = "";
	for (const section of SECTIONS) {
		const element: HTMLElement | null = document.getElementById(section.id);
		if (element && element.getBoundingClientRect().top <= threshold) {
			active = section.label;
		}
	}

	return active;
}

export default function ScrollProgressBar() {
	const barReference: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
	const [sectionLabel, setSectionLabel]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>("");

	useEffect(() => {
		let animationFrameId: number | null = null;
		let current: number = 0;

		const update: () => void = () => {
			const target: number = getScrollPercent();
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
			setSectionLabel(getActiveSection());

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
		<div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
			<div
				ref={barReference}
				aria-hidden
				className="h-[2px] bg-canal-green"
				style={{ width: "0%" }}
			/>

			{sectionLabel && (
				<span
					aria-hidden
					className="hidden md:flex absolute top-[4px] right-5 font-sans text-[10px] tracking-[0.18em] uppercase text-canal-green/60 select-none"
				>
					{sectionLabel}
				</span>
			)}
		</div>
	);
}