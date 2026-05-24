"use client";

import { useTranslation, type Translations } from "@/lib/i18n";

export default function Location() {
	const { translations }: { translations: Translations } = useTranslation();

	return (
		<section id="location" className="py-20 lg:py-32 bg-cream">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="max-w-xl mb-14">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
						{translations.location.label}
					</p>

					<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug">
						{translations.location.heading}
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

					<div className="flex flex-col gap-8">
						<div>
							<h3 className="font-serif text-2xl text-dark mb-4 font-light">{translations.location.mooringHeading}</h3>
							<p className="font-sans text-muted text-base leading-relaxed mb-4">
								{translations.location.mooringText1}
							</p>

							<p className="font-sans text-muted text-base leading-relaxed">
								{translations.location.mooringText2}
							</p>
						</div>

						<div>
							<h4 className="font-sans text-xs tracking-[0.15em] uppercase text-muted mb-4 pb-2 border-b border-beige/50">
								{translations.location.nearbyLabel}
							</h4>

							<ul className="space-y-3">
								{translations.location.nearby.map((place: { label: string; detail: string }) => (
									<li key={place.label} className="flex items-start gap-3">
										<span className="mt-1 w-1.5 h-1.5 rounded-full bg-canal-green flex-shrink-0" />
										<span className="font-sans text-sm text-dark">
											<strong className="font-semibold">{place.label}</strong>
											<span className="text-muted"> — {place.detail}</span>
										</span>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h4 className="font-sans text-xs tracking-[0.15em] uppercase text-muted mb-4 pb-2 border-b border-beige/50">
								{translations.location.cyclingLabel}
							</h4>

							<ul className="space-y-2">
								{translations.location.cycling.map((route: string) => (
									<li key={route} className="flex items-start gap-3">
										<span className="mt-1 w-1.5 h-1.5 rounded-full bg-canal-blue flex-shrink-0" />
										<span className="font-sans text-sm text-muted leading-relaxed">{route}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="bg-white rounded-xl border border-beige/40 px-5 py-4">
							<p className="font-sans text-xs text-muted leading-relaxed">
								{translations.location.privacyNote}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}