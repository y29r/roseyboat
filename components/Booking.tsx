"use client";
import { useState } from "react";
import { useT } from "@/lib/i18n";

// Simulated booked date ranges (would come from iCal feed in production)
const BOOKED_RANGES = [
	{ start: new Date(2026, 5, 6), end: new Date(2026, 5, 13) },
	{ start: new Date(2026, 5, 20), end: new Date(2026, 5, 27) },
	{ start: new Date(2026, 6, 4), end: new Date(2026, 6, 18) },
	{ start: new Date(2026, 7, 1), end: new Date(2026, 7, 8) },
];

function isBooked(date: Date): boolean {
	return BOOKED_RANGES.some(
		(r) => date >= r.start && date <= r.end
	);
}

function isPast(date: Date): boolean {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return date < today;
}

function getDaysInMonth(year: number, month: number): (Date | null)[] {
	const firstDay = new Date(year, month, 1);
	// Convert Sunday=0 to Monday=0 offset
	const startOffset = (firstDay.getDay() + 6) % 7;
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const cells: (Date | null)[] = Array(startOffset).fill(null);
	for (let day = 1; day <= daysInMonth; day++) {
		cells.push(new Date(year, month, day));
	}
	return cells;
}

function AvailabilityCalendar() {
	const { t } = useT();
	const today = new Date();
	const [viewYear, setViewYear] = useState(today.getFullYear());
	const [viewMonth, setViewMonth] = useState(today.getMonth());
	const [calDir, setCalDir] = useState<"forward" | "backward" | null>(null);

	const cells = getDaysInMonth(viewYear, viewMonth);
	const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

	const prev = () => {
		setCalDir("backward");
		if (viewMonth === 0) { setViewYear(year => year - 1); setViewMonth(11); }
		else setViewMonth(month => month - 1);
	};
	const next = () => {
		setCalDir("forward");
		if (viewMonth === 11) { setViewYear(year => year + 1); setViewMonth(0); }
		else setViewMonth(month => month + 1);
	};

	const gridAnimClass =
		calDir === "forward" ? "animate-slide-in-right" :
			calDir === "backward" ? "animate-slide-in-left" : "";

	return (
		<div className="select-none">
			<div className="flex items-center justify-between mb-6">
				<button
					onClick={prev}
					aria-label="Previous month"
					disabled={isCurrentMonth}
					className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${isCurrentMonth ? "invisible pointer-events-none" : "hover:bg-beige text-muted hover:text-dark"}`}
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<span className="font-serif text-xl text-dark">
					{t.booking.months[viewMonth]} {viewYear}
				</span>
				<button
					onClick={next}
					aria-label="Next month"
					className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-beige transition-colors text-muted hover:text-dark"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

			<div className="grid grid-cols-7 mb-2">
				{t.booking.days.map(d => (
					<div key={d} className="text-center font-sans text-xs text-muted font-medium py-1">
						{d}
					</div>
				))}
			</div>

			<div
				key={`${viewYear}-${viewMonth}`}
				className={`grid grid-cols-7 gap-y-1 overflow-hidden ${gridAnimClass}`}
			>
				{cells.map((date, i) => {
					if (!date) return <div key={`empty-${i}`} />;
					const booked = isBooked(date);
					const past = isPast(date);
					return (
						<div
							key={date.toISOString()}
							className={`
                aspect-square flex items-center justify-center rounded-lg text-sm font-sans font-medium mx-0.5
                transition-colors duration-150
                ${past
									? "text-beige cursor-default"
									: booked
										? "bg-beige/60 text-muted/60 cursor-not-allowed line-through"
										: "bg-canal-green/10 text-canal-green hover:bg-canal-green/20 cursor-pointer font-semibold"
								}
              `}
						>
							{date.getDate()}
						</div>
					);
				})}
			</div>

			<div className="flex items-center gap-5 mt-5 text-xs font-sans text-muted">
				<span className="flex items-center gap-2">
					<span className="w-3 h-3 rounded-sm bg-canal-green/20 inline-block" />
					{t.booking.available}
				</span>
				<span className="flex items-center gap-2">
					<span className="w-3 h-3 rounded-sm bg-beige/60 inline-block" />
					{t.booking.booked}
				</span>
			</div>
		</div>
	);
}

export default function Booking() {
	const { t } = useT();
	return (
		<section id="booking" className="py-20 lg:py-32 bg-cream">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				{/* Header */}
				<div className="max-w-xl mb-14">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
						{t.booking.label}
					</p>
					<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug">
						{t.booking.heading}
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
					{/* Calendar */}
					<div className="bg-white rounded-2xl shadow-sm border border-beige/40 p-6 lg:p-8">
						<AvailabilityCalendar />
					</div>

					{/* Booking card */}
					<div className="flex flex-col gap-6">
						<div className="bg-white rounded-2xl shadow-sm border border-beige/40 p-6 lg:p-8">
							<h3 className="font-serif text-2xl text-dark mb-2">{t.booking.bookHeading}</h3>
							<p className="font-sans text-muted text-sm leading-relaxed mb-6">
								{t.booking.bookDesc}
							</p>

							{/* Nightly price */}
							<div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-beige/40">
								<span className="font-serif text-4xl text-dark font-light">€180</span>
								<span className="font-sans text-sm text-muted">{t.booking.perNight}</span>
							</div>

							<div className="space-y-3 mb-8">
								{[
									{ label: t.booking.minStay, value: t.booking.minStayVal },
									{ label: t.booking.checkIn, value: t.booking.checkInVal },
									{ label: t.booking.checkOut, value: t.booking.checkOutVal },
									{ label: t.booking.capacity, value: t.booking.capacityVal },
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
								{t.booking.airbnbBtn}
							</a>
							<a
								href="mailto:contact@labarque.fr"
								className="block w-full text-center bg-transparent text-canal-green border border-canal-green font-sans font-semibold text-sm tracking-wide py-4 rounded-full hover:bg-canal-green/5 transition-all duration-300"
							>
								{t.booking.inquiryBtn}
							</a>
						</div>

						<p className="font-sans text-xs text-muted leading-relaxed px-1">
							{t.booking.calNote}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
