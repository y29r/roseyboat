"use strict";

import { NextResponse } from "next/server";
import parseIcal, { type BookedRange } from "./parseIcal";

export const revalidate: number = 3600;

export async function GET(): Promise<Response> {
	const icalUrl: string | undefined = process.env.AIRBNB_ICAL_URL;

	if (!icalUrl) {
		return NextResponse.json({ ranges: [] });
	}

	try {
		const response: Response = await fetch(icalUrl, { next: { revalidate: 3600 } });

		if (!response.ok)
			return NextResponse.json({ ranges: [] });

		const text: string = await response.text();
		const ranges: BookedRange[] = parseIcal(text);

		return NextResponse.json({ ranges }, {
			headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
		});
	} catch {
		return NextResponse.json({ ranges: [] });
	}
}