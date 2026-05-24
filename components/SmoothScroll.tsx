"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
			return;

		const lenis: Lenis = new Lenis({
			duration: 0.9,
			easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
			smoothWheel: true,
		});

		let animationFrameId: number;

		const update: (time: number) => void = (time: number) => {
			if (lenis.isScrolling === 'smooth' && Math.abs(lenis.actualScroll - lenis.scroll) > 5) {
				lenis.animatedScroll = lenis.actualScroll;
				lenis.targetScroll = lenis.actualScroll;
			}

			lenis.raf(time);

			animationFrameId = requestAnimationFrame(update);
		};

		animationFrameId = requestAnimationFrame(update);

		return () => {
			lenis.destroy();

			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return null;
}