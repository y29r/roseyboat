"use client";

import { useState } from "react";
import { useTranslation, type Translations } from "@/lib/i18n";
import AvailabilityCalendar from "./AvailabilityCalendar";

const RATE = 90;
const MIN_NIGHTS = 3;
const MAX_NIGHTS = 28;
const DISCOUNT_THRESHOLD = 5;
const DISCOUNT = 0.15;

export default function Booking() {
	const { translations }: { translations: Translations } = useTranslation();
	const [nights, setNights] = useState(MIN_NIGHTS);
	const hasDiscount = nights >= DISCOUNT_THRESHOLD;
	const total = Math.round(RATE * nights * (hasDiscount ? 1 - DISCOUNT : 1));

	return (
		<section id="booking" className="py-20 lg:py-32 bg-cream">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="max-w-xl mb-14">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
						{translations.booking.label}
					</p>
					<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug">
						{translations.booking.heading}
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
					<div className="bg-white rounded-2xl shadow-sm border border-beige/40 p-6 lg:p-8">
						<AvailabilityCalendar />
					</div>

					<div className="flex flex-col gap-6">
						<div className="bg-white rounded-2xl shadow-sm border border-beige/40 p-6 lg:p-8">
							<h3 className="font-serif text-2xl text-dark mb-2">{translations.booking.bookHeading}</h3>
							<p className="font-sans text-muted text-sm leading-relaxed mb-6">
								{translations.booking.bookDesc}
							</p>

							{/* Price + estimator */}
							<div className="mb-6 pb-6 border-b border-beige/40">
								<div className="flex items-baseline gap-2 mb-4">
									<span className="font-serif text-4xl text-dark font-light">€{RATE}</span>
									<span className="font-sans text-sm text-muted">{translations.booking.perNight}</span>
									{!hasDiscount && (
										<span className="ml-auto font-sans text-xs text-muted/60 tracking-wide">
											{translations.booking.discountLabel}
										</span>
									)}
								</div>
								<div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between bg-cream rounded-xl px-4 py-3">
									<div className="flex items-center gap-3">
										<button
											onClick={() => setNights(n => Math.max(MIN_NIGHTS, n - 1))}
											disabled={nights <= MIN_NIGHTS}
											className="w-8 h-8 rounded-full border border-beige flex items-center justify-center font-sans text-lg text-muted hover:border-canal-green hover:text-canal-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
											aria-label="Fewer nights"
										>−</button>
										<span className="font-sans text-base font-medium text-dark w-17 text-center">
											{nights} {translations.booking.nights}
										</span>
										<button
											onClick={() => setNights(n => Math.min(MAX_NIGHTS, n + 1))}
											disabled={nights >= MAX_NIGHTS}
											className="w-8 h-8 rounded-full border border-beige flex items-center justify-center font-sans text-lg text-muted hover:border-canal-green hover:text-canal-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
											aria-label="More nights"
										>+</button>
									</div>
									<div className="text-center sm:text-right">
										<p className="font-sans text-xs text-muted uppercase tracking-widest mb-0.5">{translations.booking.estimateLabel}</p>
										<p className="font-serif text-4xl text-canal-green font-light">€{total.toLocaleString()}</p>
										{hasDiscount && (
											<span className="inline-flex items-center gap-1 font-sans text-xs bg-canal-green/10 text-canal-green px-2 py-0.5 rounded-full mt-3">
												<svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
													<path d="M2 2h5l5 5-5 5-5-5V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
													<circle cx="5" cy="5" r="1" fill="currentColor" />
												</svg>
												{translations.booking.discountLabel}
											</span>
										)}
									</div>
								</div>
							</div>

							{/* What's included */}
							<div className="mb-6 pb-6 border-b border-beige/40">
								<p className="font-sans text-xs text-muted uppercase tracking-widest mb-3">{translations.booking.includedHeading}</p>
								<ul className="grid grid-cols-2 gap-x-4 gap-y-2">
									{translations.booking.included.map(item => (
										<li key={item} className="flex items-center gap-2 font-sans text-sm text-dark">
											<svg className="shrink-0 text-canal-green" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
												<path d="M2 7.5L5.5 11.5L12 2.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" />
											</svg>
											{item}
										</li>
									))}
								</ul>
							</div>

							<div className="space-y-3 mb-8">
								{[
									{ label: translations.booking.minStay, value: translations.booking.minStayVal },
									{ label: translations.booking.checkIn, value: translations.booking.checkInVal },
									{ label: translations.booking.checkOut, value: translations.booking.checkOutVal },
									{ label: translations.booking.capacity, value: translations.booking.capacityVal },
								].map(item => (
									<div key={item.label} className="flex justify-between items-center py-2 border-b border-beige/40 last:border-0">
										<span className="font-sans text-sm text-muted">{item.label}</span>
										<span className="font-sans text-sm font-medium text-dark">{item.value}</span>
									</div>
								))}
							</div>

							<a
								href="https://www.airbnb.com"
								target="_blank"
								rel="noopener noreferrer"
								className="block w-full text-center bg-canal-green text-white font-sans font-semibold text-sm tracking-wide py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 mb-3"
							>
								{translations.booking.airbnbBtn}
							</a>
							<a
								href="mailto:contact@labarque.fr"
								className="block w-full text-center bg-transparent text-canal-green border border-canal-green font-sans font-semibold text-sm tracking-wide py-4 rounded-full hover:bg-canal-green/5 transition-all duration-300"
							>
								{translations.booking.inquiryBtn}
							</a>
						</div>

						<p className="font-sans text-xs text-muted leading-relaxed px-1">
							{translations.booking.calNote}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}