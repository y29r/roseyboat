"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation, type Translations } from "@/lib/i18n";

type Direction = "forward" | "backward";

type Review = {
	quote: string;
	name: string;
	country: string;
	code: string;
	rating: number;
};

const DISPLAY_DURATION: number = 6500;

const reviews: Review[] = [
	{
		quote:
			"Waking up to water and birdsong every morning. The canal at dawn is something I'll never forget.",
		name: "Sophie",
		country: "Netherlands",
		code: "NL",
		rating: 5,
	},
	{
		quote:
			"Perfectly clean, beautifully restored. The kitchen had everything and the beds were incredibly comfortable.",
		name: "James",
		country: "United Kingdom",
		code: "GB",
		rating: 5,
	},
	{
		quote:
			"We cycled to three villages and a medieval citadel. Having the boat as a base made it feel like a real adventure.",
		name: "Lena",
		country: "Germany",
		code: "DE",
		rating: 5,
	},
	{
		quote:
			"Quiet, honest, and utterly peaceful. Nothing pretentious — just a beautiful place on a beautiful waterway.",
		name: "Thomas",
		country: "France",
		code: "FR",
		rating: 5,
	},
	{
		quote:
			"The host was wonderfully helpful with cycling routes. The towpath access is just incredible.",
		name: "Camille",
		country: "Canada",
		code: "CA",
		rating: 5,
	},
	{
		quote:
			"We came for three nights and wished we'd booked a week. The sunsets from the deck were worth the trip alone.",
		name: "Erik",
		country: "Sweden",
		code: "SE",
		rating: 5,
	},
];

function Stars({ count }: { count: number }) {
	return (
		<div className="flex gap-1">
			{Array.from({ length: count }).map((_, i) => (
				<svg key={i} className="w-4 h-4 text-canal-green" viewBox="0 0 20 20" fill="currentColor">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			))}
		</div>
	);
}

export default function Testimonials() {
	const { translations }: { translations: Translations } = useTranslation();

	const [active, setActive]: [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(0);
	const [direction, setDirection]: [Direction, React.Dispatch<React.SetStateAction<Direction>>] = useState<Direction>("forward");
	const [timerKey, setTimerKey]: [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(0);

	const touchStartX: React.RefObject<number | null> = useRef<number | null>(null);

	const reviewCount: number = reviews.length;

	const stepDirection: (newIndex: number, direction: Direction) => void = useCallback((newIndex: number, dir: Direction) => {
		setDirection(dir);
		setActive(newIndex);
		setTimerKey((k: number) => k + 1);
	}, []);

	useEffect(() => {
		const interval: NodeJS.Timeout = setInterval(() => {
			setDirection("forward");
			setActive((i) => (i + 1) % reviewCount);
		}, DISPLAY_DURATION);

		return () => clearInterval(interval);
	}, [timerKey, reviewCount]);

	const goNext: () => void = () => stepDirection((active + 1) % reviewCount, "forward");
	const goPrevious: () => void = () => stepDirection((active - 1 + reviewCount) % reviewCount, "backward");

	const onTouchStart: (event: React.TouchEvent) => void = (event: React.TouchEvent) => {
		touchStartX.current = event.touches[0].clientX;
	};

	const onTouchEnd: (event: React.TouchEvent) => void = (event: React.TouchEvent) => {
		if (touchStartX.current === null)
			return;

		const difference: number = touchStartX.current - event.changedTouches[0].clientX;
		if (Math.abs(difference) > 48)
			difference > 0 ? goNext() : goPrevious();

		touchStartX.current = null;
	};

	const animationClass: string = direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left";
	const previewIndices: number[] = [1, 2, 3].map((offset) => (active + offset) % reviewCount);

	return (
		<section id="testimonials" className="py-20 lg:py-32 bg-[#EFECE4] overflow-hidden">
			<div className="max-w-4xl mx-auto px-6 lg:px-10">
				<div className="flex flex-col items-center text-center mb-16">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-5">
						{translations.testimonials.label}
					</p>

					<div className="flex items-center gap-3">
						<Stars count={5} />
						<span className="font-sans text-sm text-muted">
							<strong className="text-dark">4.97</strong> {translations.testimonials.ratingText}
						</span>
					</div>
				</div>

				<div className="relative"
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
				>
					<span
						className="absolute -top-12 -left-2 lg:-left-6 font-serif text-[9rem] lg:text-[13rem] leading-none text-canal-green/[0.08] select-none pointer-events-none"
						aria-hidden
					>
						&ldquo;
					</span>

					<div className="relative z-10 text-center px-2 lg:px-12">
						<div
							key={`stars-${active}`}
							className={`flex justify-center mb-6 ${animationClass}`}
						>
							<Stars count={reviews[active].rating} />
						</div>

						<blockquote
							key={active}
							className={`font-serif text-dark text-2xl sm:text-3xl lg:text-[2.1rem] font-light leading-[1.5] text-balance min-h-[7rem] sm:min-h-[8.5rem] lg:min-h-[9.5rem] ${animationClass}`}
						>
							&ldquo;{reviews[active].quote}&rdquo;
						</blockquote>
					</div>

					<div
						key={`author-${active}`}
						className={`flex flex-col items-center mt-10 gap-3 ${animationClass}`}
					>
						<div className="w-px h-8 bg-beige" />
						<div className="text-center">
							<p className="font-sans text-sm font-semibold text-dark tracking-wide">
								{reviews[active].name}
							</p>

							<p className="font-sans text-xs text-muted mt-1 tracking-widest uppercase flex items-center justify-center gap-1.5">
								<img
									src={`https://flagcdn.com/w20/${reviews[active].code.toLowerCase()}.png`}
									width={16}
									height={12}
									alt={reviews[active].country}
									className="rounded-[1px] object-cover shrink-0"
								/>
								{reviews[active].country}
							</p>
						</div>

						<div
							className="review-progress-bar mt-1 w-[4rem] h-[2px] bg-beige/60 overflow-hidden rounded-full"
							aria-hidden
						>
							<div
								key={`progress-${active}`}
								className="h-full bg-canal-green/50"
								style={{
									transformOrigin: "left",
									animation: `progressFill ${DISPLAY_DURATION}ms linear forwards`,
								}}
							/>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-center gap-6 mt-10">
					<button
						onClick={goPrevious}
						aria-label="Previous review"
						className="w-9 h-9 flex items-center justify-center rounded-full border border-beige text-muted hover:border-canal-green hover:text-canal-green transition-all duration-300"
					>
						<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</button>

					<div className="flex items-center gap-2.5" role="tablist">
						{reviews.map((_: any, index: number) => (
							<button
								key={index}
								role="tab"
								aria-selected={index === active}
								aria-label={`Review ${index + 1}`}
								onClick={() => stepDirection(index, index > active ? "forward" : "backward")}
								className={`rounded-full transition-all duration-500 ${index === active
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

				<div className="mt-14 pt-10 border-t border-beige/60 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
					{previewIndices.map((index: number) => {
						const review = reviews[index];
						return (
							<button
								key={review.name}
								onClick={() => stepDirection(index, index > active ? "forward" : "backward")}
								className="text-left group"
							>
								<p className="font-serif text-dark/45 text-sm leading-relaxed line-clamp-2 group-hover:text-dark/75 transition-colors duration-200">
									&ldquo;{review.quote}&rdquo;
								</p>

								<p className="font-sans text-xs text-muted mt-2 flex items-center gap-1.5 group-hover:text-canal-green transition-colors duration-200">
									<img
										src={`https://flagcdn.com/w20/${review.code.toLowerCase()}.png`}
										width={14}
										height={10}
										alt={review.country}
										className="rounded-[1px] object-cover shrink-0"
									/>
									<span>— {review.name}, {review.country}</span>
								</p>
							</button>
						);
					})}
				</div>
			</div>
		</section>
	);
}