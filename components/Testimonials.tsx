"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const reviews = [
	{
		quote:
			"Waking up to water and birdsong every morning. The canal at dawn is something I'll never forget.",
		name: "Sophie",
		country: "Netherlands",
		rating: 5,
	},
	{
		quote:
			"Perfectly clean, beautifully restored. The kitchen had everything and the beds were incredibly comfortable.",
		name: "James",
		country: "United Kingdom",
		rating: 5,
	},
	{
		quote:
			"We cycled to three villages and a medieval citadel. Having the boat as a base made it feel like a real adventure.",
		name: "Lena",
		country: "Germany",
		rating: 5,
	},
	{
		quote:
			"Quiet, honest, and utterly peaceful. Nothing pretentious — just a beautiful place on a beautiful waterway.",
		name: "Thomas",
		country: "France",
		rating: 5,
	},
	{
		quote:
			"The host was wonderfully helpful with cycling routes. The towpath access is just incredible.",
		name: "Camille",
		country: "Canada",
		rating: 5,
	},
	{
		quote:
			"We came for three nights and wished we'd booked a week. The sunsets from the deck were worth the trip alone.",
		name: "Erik",
		country: "Sweden",
		rating: 5,
	},
];

function Stars({ count }: { count: number }) {
	return (
		<div className="flex gap-1">
			{Array.from({ length: count }).map((_, i) => (
				<svg key={i} className="w-3.5 h-3.5 text-canal-green" viewBox="0 0 20 20" fill="currentColor">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			))}
		</div>
	);
}

type Dir = "forward" | "backward";

export default function Testimonials() {
	const [active, setActive] = useState(0);
	const [dir, setDir] = useState<Dir>("forward");
	const [timerKey, setTimerKey] = useState(0);
	const touchStartX = useRef<number | null>(null);
	// Ref to the quote+author wrapper so we can animate its height between reviews
	const quoteWrapRef = useRef<HTMLDivElement>(null);
	const prevHeightRef = useRef(0);
	const n = reviews.length;

	// Navigate and reset the auto-advance timer
	const go = useCallback((newIdx: number, direction: Dir) => {
		// Capture height before React re-renders with new content
		if (quoteWrapRef.current) {
			prevHeightRef.current = quoteWrapRef.current.offsetHeight;
		}
		setDir(direction);
		setActive(newIdx);
		setTimerKey((k) => k + 1);
	}, []);

	// Auto-advance — resets whenever timerKey changes (i.e. on manual nav)
	useEffect(() => {
		const t = setInterval(() => {
			if (quoteWrapRef.current) {
				prevHeightRef.current = quoteWrapRef.current.offsetHeight;
			}
			setDir("forward");
			setActive((i) => (i + 1) % n);
		}, 6500);
		return () => clearInterval(t);
	}, [timerKey, n]);

	// Smoothly animate the wrapper height when review text length changes
	useEffect(() => {
		const el = quoteWrapRef.current;
		if (!el || prevHeightRef.current === 0) return;
		const newH = el.offsetHeight;
		if (newH === prevHeightRef.current) return;
		let cleanedUp = false;
		let raf2 = 0;
		el.style.transition = 'none';
		el.style.height = `${prevHeightRef.current}px`;
		const raf1 = requestAnimationFrame(() => {
			raf2 = requestAnimationFrame(() => {
				if (cleanedUp) return;
				el.style.transition = 'height 0.55s cubic-bezier(0.4, 0, 0.2, 1)';
				el.style.height = `${newH}px`;
			});
		});
		const onEnd = () => {
			if (cleanedUp) return;
			el.style.height = 'auto';
			el.style.transition = '';
		};
		el.addEventListener('transitionend', onEnd, { once: true });
		return () => {
			cleanedUp = true;
			cancelAnimationFrame(raf1);
			cancelAnimationFrame(raf2);
			el.removeEventListener('transitionend', onEnd);
			el.style.height = 'auto';
			el.style.transition = '';
		};
	}, [active]);

	const goNext = () => go((active + 1) % n, "forward");
	const goPrev = () => go((active - 1 + n) % n, "backward");

	const onTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};
	const onTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX.current === null) return;
		const diff = touchStartX.current - e.changedTouches[0].clientX;
		if (Math.abs(diff) > 48) diff > 0 ? goNext() : goPrev();
		touchStartX.current = null;
	};

	const animClass = dir === "forward" ? "animate-slide-in-right" : "animate-slide-in-left";
	const previewIndices = [1, 2, 3].map((offset) => (active + offset) % n);

	return (
		<section id="testimonials" className="py-20 lg:py-32 bg-[#EFECE4] overflow-hidden">
			<div className="max-w-4xl mx-auto px-6 lg:px-10">

				{/* Header */}
				<div className="flex flex-col items-center text-center mb-16">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-5">
						Guest Reviews
					</p>
					<div className="flex items-center gap-3">
						<Stars count={5} />
						<span className="font-sans text-sm text-muted">
							<strong className="text-dark">4.97</strong> · 42 reviews
						</span>
					</div>
				</div>

				{/* Featured quote */}
				<div
					ref={quoteWrapRef}
					className="relative"
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
				>
					{/* Decorative opening quote */}
					<span
						className="absolute -top-12 -left-2 lg:-left-6 font-serif text-[9rem] lg:text-[13rem] leading-none text-canal-green/[0.08] select-none pointer-events-none"
						aria-hidden
					>
						&ldquo;
					</span>

					{/* Quote — key remounts element, triggering the slide animation */}
					<div className="relative z-10 text-center px-2 lg:px-12">
						<blockquote
							key={active}
							className={`font-serif text-dark text-2xl sm:text-3xl lg:text-[2.1rem] font-light leading-[1.5] text-balance ${animClass}`}
						>
							&ldquo;{reviews[active].quote}&rdquo;
						</blockquote>
					</div>

					{/* Author */}
					<div
						key={`author-${active}`}
						className={`flex flex-col items-center mt-10 gap-3 ${animClass}`}
					>
						<div className="w-px h-8 bg-beige" />
						<div className="text-center">
							<p className="font-sans text-sm font-semibold text-dark tracking-wide">
								{reviews[active].name}
							</p>
							<p className="font-sans text-xs text-muted mt-1 tracking-widest uppercase">
								{reviews[active].country}
							</p>
						</div>
					</div>
				</div>

				{/* Controls: prev arrow · dots · next arrow */}
				<div className="flex items-center justify-center gap-6 mt-10">
					<button
						onClick={goPrev}
						aria-label="Previous review"
						className="w-9 h-9 flex items-center justify-center rounded-full border border-beige text-muted hover:border-canal-green hover:text-canal-green transition-all duration-300"
					>
						<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</button>

					<div className="flex items-center gap-2.5" role="tablist">
						{reviews.map((_, i) => (
							<button
								key={i}
								role="tab"
								aria-selected={i === active}
								aria-label={`Review ${i + 1}`}
								onClick={() => go(i, i > active ? "forward" : "backward")}
								className={`rounded-full transition-all duration-500 ${i === active
									? "w-7 h-1.5 bg-canal-green"
									: "w-1.5 h-1.5 bg-beige hover:bg-canal-green/40"
									}`}
							/>
						))}
					</div>

					<button
						onClick={goNext}
						aria-label="Next review"
						className="w-9 h-9 flex items-center justify-center rounded-full border border-beige text-muted hover:border-canal-green hover:text-canal-green transition-all duration-300"
					>
						<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>

				{/* Preview strip */}
				<div className="mt-14 pt-10 border-t border-beige/60 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
					{previewIndices.map((idx) => {
						const r = reviews[idx];
						return (
							<button
								key={r.name}
								onClick={() => go(idx, idx > active ? "forward" : "backward")}
								className="text-left group"
							>
								<p className="font-serif text-dark/45 text-sm leading-relaxed line-clamp-2 group-hover:text-dark/75 transition-colors duration-200">
									&ldquo;{r.quote}&rdquo;
								</p>
								<p className="font-sans text-xs text-muted mt-2 group-hover:text-canal-green transition-colors duration-200">
									— {r.name}, {r.country}
								</p>
							</button>
						);
					})}
				</div>

			</div>
		</section>
	);
}


