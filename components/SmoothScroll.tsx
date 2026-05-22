'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll — intercepts wheel events and smoothly drives
 * native window.scrollY so CSS scroll-driven animations still work.
 * Disabled when prefers-reduced-motion is set.
 */
export default function SmoothScroll() {
	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const lenis = new Lenis({
			duration: 0.9,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
		});

		let rafId: number;

		function raf(time: number) {
			// If the native scroll position (scrollbar, keyboard, programmatic)
			// diverged from Lenis's animated position while Lenis was mid-animation,
			// sync immediately BEFORE Lenis can call window.scrollTo() and fight it.
			if (
				lenis.isScrolling === 'smooth' &&
				Math.abs(lenis.actualScroll - lenis.scroll) > 5
			) {
				lenis.animatedScroll = lenis.actualScroll;
				lenis.targetScroll = lenis.actualScroll;
			}
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
			cancelAnimationFrame(rafId);
		};
	}, []);

	return null;
}