"use client";

import { type Translations, useTranslation } from "@/lib/i18n";
import { type JSX } from "react";

const ICONS: JSX.Element[] = [
	<svg key="sleeps" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
		<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
	</svg>,

	<svg key="shower" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
		<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
	</svg>,

	<svg key="cycling" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
		<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
		<circle cx="5.5" cy="17.5" r="2.5" strokeLinecap="round" />
		<circle cx="18.5" cy="17.5" r="2.5" strokeLinecap="round" />
		<path strokeLinecap="round" strokeLinejoin="round" d="M9 6h3l2 4H9l-2 5" />
	</svg>,

	<svg key="kitchen" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
		<path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5M9 8.25v-1.5M3 16.5h18M3 7.5h18" />
	</svg>,
];

export type Feature = {
	label: string;
	icon: JSX.Element;
};

export default function Features() {
	const { translations }: { translations: Translations } = useTranslation();

	const features: Feature[] = [
		{ label: translations.features.sleeps, icon: ICONS[0] },
		{ label: translations.features.shower, icon: ICONS[1] },
		{ label: translations.features.cycling, icon: ICONS[2] },
		{ label: translations.features.kitchen, icon: ICONS[3] },
	];

	return (
		<section className="bg-[#EFECE4] border-b border-beige/40 py-5">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<ul className="hidden sm:flex items-center justify-center flex-wrap gap-x-0">
					{features.map((feature: Feature, index: number) => (
						<li key={feature.label} className="flex items-center">
							<span className="flex items-center gap-2 font-sans text-sm text-dark/60 font-light tracking-wide">
								<span className="text-canal-green/60">{feature.icon}</span>
								{feature.label}
							</span>

							{index < features.length - 1 && (
								<span className="mx-4 text-beige select-none" aria-hidden>·</span>
							)}
						</li>
					))}
				</ul>

				<div className="sm:hidden flex flex-col gap-2 items-center">
					<ul className="flex items-center gap-x-0">
						{features.slice(0, 2).map((feature: Feature, index: number) => (
							<li key={feature.label} className="flex items-center">
								<span className="flex items-center gap-1.5 font-sans text-xs text-dark/60 font-light">
									<span className="text-canal-green/60">{feature.icon}</span>
									{feature.label}
								</span>

								{index < 1 && <span className="mx-3 text-beige select-none" aria-hidden>·</span>}
							</li>
						))}
					</ul>

					<ul className="flex items-center gap-x-0">
						{features.slice(2).map((feature: Feature, index: number) => (
							<li key={feature.label} className="flex items-center">
								<span className="flex items-center gap-1.5 font-sans text-xs text-dark/60 font-light">
									<span className="text-canal-green/60">{feature.icon}</span>
									{feature.label}
								</span>

								{index < features.slice(2).length - 1 && (
									<span className="mx-3 text-beige select-none" aria-hidden>·</span>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}