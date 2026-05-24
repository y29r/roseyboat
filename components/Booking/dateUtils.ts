"use strict";

// Simulated booked date ranges (would come from iCal feed in production)
export const BOOKED_RANGES: { start: Date; end: Date }[] = [
	{ start: new Date(2026, 5, 6), end: new Date(2026, 5, 13) },
	{ start: new Date(2026, 5, 20), end: new Date(2026, 5, 27) },
	{ start: new Date(2026, 6, 4), end: new Date(2026, 6, 18) },
	{ start: new Date(2026, 7, 1), end: new Date(2026, 7, 8) },
];

export function isBooked(date: Date): boolean {
	return BOOKED_RANGES.some(
		(range: { start: Date; end: Date }) => date >= range.start && date <= range.end
	);
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