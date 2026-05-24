"use client";

import { useState } from "react";
import { useTranslation, type Translations } from "@/lib/i18n";

export default function Amenities() {
	const { translations }: { translations: Translations } = useTranslation();

	const amenities: Translations["amenities"] = translations.amenities;

	const [open, setOpen]: [number | null, React.Dispatch<React.SetStateAction<number | null>>] = useState<number | null>(null);

	const toggle = (index: number) => setOpen(open === index ? null : index);

	return (
		<section id="amenities" className="py-20 lg:py-32 bg-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="max-w-2xl mb-14 reveal-up">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
						{amenities.label}
					</p>
					<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug mb-5 title-underline">
						{amenities.heading}
					</h2>
					<p className="font-sans text-muted text-base leading-relaxed font-light">
						{amenities.intro}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 mb-14 reveal-up">
					{amenities.groups.map((group: Translations["amenities"]["groups"][number], index: number) => (
						<div key={index}>
							<p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted/60 mb-3 pb-2 border-b border-beige/60">
								{group.label}
							</p>

							<ul>
								{group.items.map((item: Translations["amenities"]["groups"][number]["items"][number]) => (
									<li key={item.label} className="flex items-baseline justify-between gap-4 py-2.5 border-b border-beige/40 last:border-b-0">
										<span className="font-sans text-sm font-medium text-dark shrink-0">
											{item.label}
										</span>

										<span className="font-sans text-xs text-muted text-right leading-relaxed">
											{item.detail}
										</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="max-w-2xl border-t border-beige/60 pt-10 reveal-up">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-6">
						{amenities.detailsLabel}
					</p>

					<div className="divide-y divide-beige/50">
						{amenities.details.map((item, i) => (
							<div key={i} className="py-4">
								<button
									className="w-full flex items-start justify-between gap-8 text-left group"
									onClick={() => toggle(i)}
									aria-expanded={open === i}
								>
									<span className="font-sans text-sm font-medium text-dark group-hover:text-canal-green transition-colors duration-200 leading-relaxed">
										{item.question}
									</span>

									<span
										className={`shrink-0 text-muted mt-0.5 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
										aria-hidden="true"
									>
										<svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
										</svg>
									</span>
								</button>
								<div
									className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
									style={{ maxHeight: open === i ? "120px" : "0px" }}
								>
									<p className="font-sans text-sm text-muted leading-relaxed mt-2.5 pr-8 pb-1">
										{item.answer}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}