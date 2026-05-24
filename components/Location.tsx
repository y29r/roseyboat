"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation, type Translations } from "@/lib/i18n";

type TabKey = "nearby" | "cycling" | "dayTrips";

export default function Location() {
	const { translations }: { translations: Translations } = useTranslation();
	const location: Translations["location"] = translations.location;

	const [activeTab, setActiveTab]: [TabKey, React.Dispatch<React.SetStateAction<TabKey>>] = useState<TabKey>("nearby");
	const [isTransitioning, setIsTransitioning]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);

	const pendingTabReference: React.RefObject<TabKey | null> = useRef<TabKey | null>(null);

	const handleTabChange: (next: TabKey) => void = (next: TabKey) => {
		if (next === activeTab || isTransitioning)
			return;

		pendingTabReference.current = next;

		setIsTransitioning(true);
	};

	useEffect(() => {
		if (!isTransitioning)
			return;

		const timer: NodeJS.Timeout = setTimeout(() => {
			if (pendingTabReference.current)
				setActiveTab(pendingTabReference.current);

			setIsTransitioning(false);
		}, 200);

		return () => clearTimeout(timer);
	}, [isTransitioning]);

	const tabs: { key: TabKey; label: string }[] = [
		{ key: "nearby", label: location.tabs.nearby },
		{ key: "cycling", label: location.tabs.cycling },
		{ key: "dayTrips", label: location.tabs.dayTrips },
	];

	return (
		<section id="location" className="py-20 lg:py-32 bg-cream">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="max-w-xl mb-14 reveal-up">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
						{location.label}
					</p>

					<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug">
						{location.heading}
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
					<div className="rounded-2xl overflow-hidden shadow-sm border border-beige/40" style={{ height: "420px" }}>
						<iframe
							title="La Vie En Rose mooring location"
							src="https://www.google.com/maps?q=Capestang,France&z=14&output=embed"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>

					<div className="flex flex-col gap-7">
						<p className="font-serif text-dark text-lg lg:text-xl font-light leading-relaxed">
							{location.intro}
						</p>

						<ul className="flex flex-col gap-2.5">
							{location.quicklook.map((item: string) => (
								<li key={item} className="flex items-center gap-3">
									<span className="w-1 h-1 rounded-full bg-canal-green/50 flex-shrink-0" />
									<span className="font-sans text-sm text-muted">{item}</span>
								</li>
							))}
						</ul>

						<div className="pt-2 border-t border-beige/60">
							<div className="flex gap-7 mb-7" role="tablist">
								{tabs.map((tab: { key: TabKey; label: string }) => (
									<button
										key={tab.key}
										role="tab"
										aria-selected={activeTab === tab.key}
										onClick={() => handleTabChange(tab.key)}
										className={`relative pb-2 font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${activeTab === tab.key ? "text-dark" : "text-muted hover:text-dark"
											}`}
									>
										{tab.label}
										<span
											className={`absolute bottom-0 left-0 right-0 h-px bg-canal-green transition-transform duration-300 origin-left ${activeTab === tab.key ? "scale-x-100" : "scale-x-0"
												}`}
										/>
									</button>
								))}
							</div>

							<div
								style={{
									opacity: isTransitioning ? 0 : 1,
									transform: isTransitioning ? "translateY(6px)" : "translateY(0px)",
									transition: "opacity 200ms ease, transform 200ms ease",
								}}
							>
								{activeTab === "nearby" && (
									<ul className="flex flex-col gap-4">
										{location.nearby.map((place: { label: string; detail: string }) => (
											<li key={place.label} className="flex items-start gap-3">
												<span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-canal-green/50 flex-shrink-0" />
												<span className="font-sans text-sm leading-relaxed">
													<span className="text-dark font-medium">{place.label}</span>
													<span className="text-muted"> — {place.detail}</span>
												</span>
											</li>
										))}
									</ul>
								)}

								{activeTab === "cycling" && (
									<div className="flex flex-col gap-5">
										<div className="flex flex-col gap-3.5">
											{location.cycling.map((route: { direction: string; label: string; detail: string }) => (
												<div key={route.label} className="flex items-baseline gap-4">
													<span className="font-sans text-[10px] tracking-[0.12em] uppercase text-muted/60 w-8 flex-shrink-0">
														{route.direction}
													</span>
													<span className="font-sans text-sm">
														<span className="text-dark font-medium">{route.label}</span>
														<span className="text-muted"> · {route.detail}</span>
													</span>
												</div>
											))}
										</div>

										<div className="pt-3 border-t border-beige/50 flex flex-col gap-1.5">
											{location.cyclingNotes.map((note: string) => (
												<p key={note} className="font-sans text-xs text-muted/70 leading-relaxed">
													{note}
												</p>
											))}
										</div>
									</div>
								)}

								{activeTab === "dayTrips" && (
									<ul className="flex flex-col gap-4">
										{location.dayTrips.map((trip: { label: string; detail: string }) => (
											<li key={trip.label} className="flex items-start gap-3">
												<span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-canal-green/50 flex-shrink-0" />
												<span className="font-sans text-sm leading-relaxed">
													<span className="text-dark font-medium">{trip.label}</span>
													<span className="text-muted"> — {trip.detail}</span>
												</span>
											</li>
										))}
									</ul>
								)}
							</div>
						</div>

						<p className="font-sans text-xs text-muted/60 leading-relaxed">
							{location.privacyNote}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}