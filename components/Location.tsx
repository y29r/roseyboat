"use client";
import { useTranslation } from "@/lib/i18n";

export default function Location() {
	const { translations: t } = useTranslation();
	const nearby = t.location.nearby;
	const cyclingRoutes = t.location.cycling;
	return (
		<section id="location" className="py-20 lg:py-32 bg-cream">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				{/* Header */}
				<div className="max-w-xl mb-14">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
						{t.location.label}
					</p>
					<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug">
						{t.location.heading}
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
					{/* Google Maps embed */}
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

					{/* Location info */}
					<div className="flex flex-col gap-8">
						{/* About the mooring */}
						<div>
							<h3 className="font-serif text-2xl text-dark mb-4 font-light">{t.location.mooringHeading}</h3>
							<p className="font-sans text-muted text-base leading-relaxed mb-4">
								{t.location.mooringText1}
							</p>
							<p className="font-sans text-muted text-base leading-relaxed">
								{t.location.mooringText2}
							</p>
						</div>

						{/* Nearby places */}
						<div>
							<h4 className="font-sans text-xs tracking-[0.15em] uppercase text-muted mb-4 pb-2 border-b border-beige/50">
								{t.location.nearbyLabel}
							</h4>
							<ul className="space-y-3">
								{nearby.map((place) => (
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

						{/* Cycling */}
						<div>
							<h4 className="font-sans text-xs tracking-[0.15em] uppercase text-muted mb-4 pb-2 border-b border-beige/50">
								{t.location.cyclingLabel}
							</h4>
							<ul className="space-y-2">
								{cyclingRoutes.map((route) => (
									<li key={route} className="flex items-start gap-3">
										<span className="mt-1 w-1.5 h-1.5 rounded-full bg-canal-blue flex-shrink-0" />
										<span className="font-sans text-sm text-muted leading-relaxed">{route}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Privacy note */}
						<div className="bg-white rounded-xl border border-beige/40 px-5 py-4">
							<p className="font-sans text-xs text-muted leading-relaxed">
								{t.location.privacyNote}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
