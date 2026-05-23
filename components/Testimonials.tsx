"use client";
import { useState, useEffect, useCallback } from "react";

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

export default function Testimonials() {
	const [active, setActive] = useState(0);

	const advance = useCallback(() => {
		setActive((i) => (i + 1) % reviews.length);
	}, []);

	useEffect(() => {
		const t = setInterval(advance, 6500);
		return () => clearInterval(t);
	}, [advance]);

	const n = reviews.length;
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
				<div className="relative">
					{/* Large decorative opening quote */}
					<span
						className="absolute -top-12 -left-2 lg:-left-6 font-serif text-[9rem] lg:text-[13rem] leading-none text-canal-green/[0.08] select-none pointer-events-none"
						aria-hidden
					>
						&ldquo;
					</span>

					{/* Quote text — key forces re-mount → triggers fade-in animation */}
					<div className="relative z-10 text-center px-2 lg:px-12">
						<blockquote
							key={active}
							className="font-serif text-dark text-2xl sm:text-3xl lg:text-[2.1rem] font-light leading-[1.5] text-balance animate-fade-in"
						>
							&ldquo;{reviews[active].quote}&rdquo;
						</blockquote>
					</div>

					{/* Author attribution */}
					<div className="flex flex-col items-center mt-10 gap-3">
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

				{/* Navigation dots */}
				<div className="flex items-center justify-center gap-2.5 mt-10" role="tablist">
					{reviews.map((_, i) => (
						<button
							key={i}
							role="tab"
							aria-selected={i === active}
							aria-label={`Review ${i + 1}`}
							onClick={() => setActive(i)}
							className={`rounded-full transition-all duration-500 ${i === active
									? "w-7 h-1.5 bg-canal-green"
									: "w-1.5 h-1.5 bg-beige hover:bg-canal-green/40"
								}`}
						/>
					))}
				</div>

				{/* Preview strip — 3 other quotes, clickable */}
				<div className="mt-14 pt-10 border-t border-beige/60 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
					{previewIndices.map((idx) => {
						const r = reviews[idx];
						return (
							<button
								key={r.name}
								onClick={() => setActive(idx)}
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
