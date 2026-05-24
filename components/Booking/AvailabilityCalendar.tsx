"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { isBooked, isPast, getDaysInMonth } from "./dateUtils";

export default function AvailabilityCalendar() {
	const { translations }: { translations: any } = useTranslation();

	const today: Date = new Date();

	const [viewYear, setViewYear]: [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(today.getFullYear());
	const [viewMonth, setViewMonth]: [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(today.getMonth());

	const [calendarDirection, setCalendarDirection]: ["forward" | "backward" | null, React.Dispatch<React.SetStateAction<"forward" | "backward" | null>>] = useState<"forward" | "backward" | null>(null);

	const cells: (Date | null)[] = getDaysInMonth(viewYear, viewMonth);
	const isCurrentMonth: boolean = viewYear === today.getFullYear() && viewMonth === today.getMonth();

	const previous: () => void = () => {
		setCalendarDirection("backward");

		if (viewMonth === 0) {
			setViewYear(year => year - 1);
			setViewMonth(11);
		} else
			setViewMonth(month => month - 1);
	};
	const next: () => void = () => {
		setCalendarDirection("forward");

		if (viewMonth === 11) {
			setViewYear(year => year + 1);
			setViewMonth(0);
		} else
			setViewMonth(month => month + 1);
	};

	const gridAnimClass: string =
		calendarDirection === "forward" ? "animate-slide-in-right" :
			calendarDirection === "backward" ? "animate-slide-in-left" : "";

	return (
		<div className="select-none">
			<div className="flex items-center justify-between mb-6">
				<button
					onClick={previous}
					aria-label="Previous month"
					disabled={isCurrentMonth}
					className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${isCurrentMonth ? "invisible pointer-events-none" : "hover:bg-beige text-muted hover:text-dark"}`}
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<span className="font-serif text-xl text-dark">
					{translations.booking.months[viewMonth]} {viewYear}
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
				{translations.booking.days.map((day: string, index: number) => (
					<div key={index} className="text-center font-sans text-xs text-muted font-medium py-1">
						{day}
					</div>
				))}
			</div>

			<div
				key={`${viewYear}-${viewMonth}`}
				className={`grid grid-cols-7 gap-y-1 overflow-hidden ${gridAnimClass}`}
			>
				{cells.map((date: Date | null, index: number) => {
					if (!date)
						return <div key={`empty-${index}`} />;

					const booked: boolean = isBooked(date);
					const past: boolean = isPast(date);

					return (
						<div
							key={date.toISOString()}
							className={`
								aspect-square flex items-center justify-center rounded-lg text-sm font-sans
								font-medium mx-0.5 transition-colors duration-150
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
					{translations.booking.available}
				</span>

				<span className="flex items-center gap-2">
					<span className="w-3 h-3 rounded-sm bg-beige/60 inline-block" />
					{translations.booking.booked}
				</span>
			</div>
		</div>
	);
}