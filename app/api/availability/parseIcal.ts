"use strict";

export interface BookedRange {
	start: string;
	end: string;
}

export default function parseIcal(text: string): BookedRange[] {
	const ranges: BookedRange[] = [];
	const lines: string[] = text.replace(/\r\n|\r/g, "\n").split("\n");

	let inEvent: boolean = false;
	let start: string = "";
	let end: string = "";

	for (const line of lines) {
		if (line === "BEGIN:VEVENT") {
			inEvent = true;
			start = "";
			end = "";
		} else if (line === "END:VEVENT") {
			if (start && end)
				ranges.push({ start, end });

			inEvent = false;
		} else if (inEvent) {
			if (line.startsWith("DTSTART"))
				start = line.split(":").at(-1)?.trim() ?? "";
			else if (line.startsWith("DTEND"))
				end = line.split(":").at(-1)?.trim() ?? "";
		}
	}

	return ranges;
}