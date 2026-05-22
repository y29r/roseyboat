const nearby = [
	{ label: "Capestang", detail: "Village bakery, café & weekly market — on foot" },
	{ label: "Béziers", detail: "Historic city, covered market, Friday brocante — 20 km" },
	{ label: "Narbonne", detail: "Roman city, canal du Midi junction — 30 km" },
	{ label: "Carcassonne", detail: "Medieval citadel & vineyard routes — 55 km" },
	{ label: "Colombiers", detail: "Canal locks, quiet towpath village — 8 km" },
];

const cyclingRoutes = [
	"Canal du Midi Greenway (EuroVelo 8) runs directly alongside",
	"Flat, shaded towpath east to Béziers — approx. 20 km, all abilities",
	"West toward Colombiers locks and the Tunnel de Malpas — a full day ride",
	"Bike hire available in Béziers and Capestang village",
];

export default function Location() {
	return (
		<section id="location" className="py-20 lg:py-32 bg-cream">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				{/* Header */}
				<div className="max-w-xl mb-14">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
						Location
					</p>
					<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug">
						Moored near Capestang on the Canal du Midi
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
					{/* Google Maps embed */}
					<div className="rounded-2xl overflow-hidden shadow-sm border border-beige/40" style={{ height: "420px" }}>
						<iframe
							title="La Rosée mooring location"
							src="https://www.google.com/maps?q=43.3310892,3.0454889&z=14&output=embed"
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
							<h3 className="font-serif text-2xl text-dark mb-4 font-light">About the mooring</h3>
							<p className="font-sans text-muted text-base leading-relaxed mb-4">
								La Rosée is moored near Capestang — a small village on the Canal du Midi, surrounded by vineyards and garrigue, in the Hérault département of southern France.
							</p>
							<p className="font-sans text-muted text-base leading-relaxed">
								The canal here is quiet and unhurried. Capestang village is on foot. Béziers is a short ride east. The plane tree canopy is unbroken for miles in either direction.
							</p>
						</div>

						{/* Nearby places */}
						<div>
							<h4 className="font-sans text-xs tracking-[0.15em] uppercase text-muted mb-4 pb-2 border-b border-beige/50">
								Nearby
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
								Cycling Access
							</h4>
							<ul className="space-y-2">
								{cyclingRoutes.map((r) => (
									<li key={r} className="flex items-start gap-3">
										<span className="mt-1 w-1.5 h-1.5 rounded-full bg-canal-blue flex-shrink-0" />
										<span className="font-sans text-sm text-muted leading-relaxed">{r}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Privacy note */}
						<div className="bg-white rounded-xl border border-beige/40 px-5 py-4">
							<p className="font-sans text-xs text-muted leading-relaxed">
								<span className="font-semibold text-dark">Exact mooring location</span> is shared with guests after booking confirmation.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
