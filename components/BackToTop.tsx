"use client";
import { useState, useEffect } from "react";

export default function BackToTop() {
	const [visible, setVisible] = useState(false);
	const [lightboxOpen, setLightboxOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 600);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const onToggle = (e: Event) => {
			setLightboxOpen((e as CustomEvent<{ open: boolean }>).detail.open);
		};
		window.addEventListener("lightbox-toggle", onToggle);
		return () => window.removeEventListener("lightbox-toggle", onToggle);
	}, []);

	return (
		<button
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			aria-label="Back to top"
			className={`hidden md:flex fixed bottom-8 right-6 z-50 w-10 h-10 items-center justify-center bg-cream border border-beige/70 rounded-full shadow-sm hover:bg-beige hover:border-beige transition-all duration-300 ${visible && !lightboxOpen
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-3 pointer-events-none"
				}`}
		>
			<svg
				className="w-4 h-4 text-dark"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				viewBox="0 0 24 24"
				aria-hidden
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
			</svg>
		</button>
	);
}
