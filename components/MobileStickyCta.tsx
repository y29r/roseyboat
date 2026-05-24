"use client";
import { useState, useEffect } from "react";
import { useT } from "@/lib/i18n";

export default function MobileStickyCta() {
	const { t } = useT();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 500);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div
			className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"
				}`}
		>
			<div className="bg-white border-t border-beige/50 px-5 py-4 shadow-lg flex gap-3 items-center">
				<a
					href="#booking"
					className="flex-1 text-center bg-canal-green text-white font-sans font-semibold text-sm py-3.5 rounded-full hover:bg-opacity-90 transition-all active:scale-95"
				>
					{t.mobile.checkAvailability}
				</a>
				<a
					href="mailto:contact@labarque.fr"
					className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-cream border border-beige rounded-full hover:bg-beige transition-colors"
					aria-label="Send email inquiry"
				>
					<svg className="w-4 h-4 text-dark" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
					</svg>
				</a>
			</div>
		</div>
	);
}
