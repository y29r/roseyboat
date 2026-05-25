/**
 * Fetches the Airbnb iCal feed and writes booked date ranges to
 * public/availability.json so the static export can read them at runtime.
 *
 * Run automatically before `next build` via the "prebuild" npm script.
 * Env vars are loaded via --env-file flags in package.json.
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "../public/availability.json");

function parseIcal(text) {
	const ranges = [];
	const lines = text.replace(/\r\n|\r/g, "\n").split("\n");

	let inEvent = false;
	let start = "";
	let end = "";

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
				start = line.split(":").at(-1).trim().slice(0, 8);
			else if (line.startsWith("DTEND"))
				end = line.split(":").at(-1).trim().slice(0, 8);
		}
	}

	return ranges;
}

const icalUrl = process.env.AIRBNB_ICAL_URL;

if (!icalUrl) {
	console.warn("[availability] AIRBNB_ICAL_URL not set — writing empty availability.json");
	writeFileSync(OUT_PATH, JSON.stringify({ ranges: [], fetchedAt: new Date().toISOString() }));
	process.exit(0);
}

try {
	console.log("[availability] Fetching Airbnb iCal feed...");
	const res = await fetch(icalUrl);

	if (!res.ok)
		throw new Error(`HTTP ${res.status} ${res.statusText}`);

	const text = await res.text();
	const ranges = parseIcal(text);

	mkdirSync(join(__dirname, "../public"), { recursive: true });
	writeFileSync(OUT_PATH, JSON.stringify({ ranges, fetchedAt: new Date().toISOString() }, null, 2));

	console.log(`[availability] Wrote ${ranges.length} booked range(s) to public/availability.json`);
} catch (err) {
	console.error("[availability] Failed to fetch iCal:", err.message);

	writeFileSync(OUT_PATH, JSON.stringify({ ranges: [], fetchedAt: new Date().toISOString() }));
	process.exit(0);
}