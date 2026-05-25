"use strict";

import type { BookedRange } from "@/app/api/availability/parseIcal";

function icalDateToDate(s: string): Date {
	return new Date(
		Number(s.slice(0, 4)),
		Number(s.slice(4, 6)) - 1,
		Number(s.slice(6, 8)),
	);
}

export function isBooked(date: Date, ranges: BookedRange[]): boolean {
	return ranges.some((range: BookedRange) => {
		const start: Date = icalDateToDate(range.start);
		const end: Date = icalDateToDate(range.end);

		return date >= start && date < end;
	});
}

export function isPast(date: Date): boolean {
	const today: Date = new Date();
	today.setHours(0, 0, 0, 0);

	return date < today;
}

export function getDaysInMonth(year: number, month: number): (Date | null)[] {
	const firstDay: Date = new Date(year, month, 1);

	const startOffset: number = (firstDay.getDay() + 6) % 7;
	const daysInMonth: number = new Date(year, month + 1, 0).getDate();
	const cells: (Date | null)[] = Array(startOffset).fill(null);

	for (let day: number = 1; day <= daysInMonth; day++) {
		cells.push(new Date(year, month, day));
	}

	return cells;
}
