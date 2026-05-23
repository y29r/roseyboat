const included = [
	{ label: "Heating", detail: "Diesel heating for cooler months" },
	{ label: "Towels & linen", detail: "Provided for all guests" },
	{ label: "Kitchen", detail: "Hob, oven, and fridge — self-cater as you please" },
	{ label: "Coffee & tea", detail: "Complimentary, with a French press on board" },
	{ label: "Snacks & drinks", detail: "Crisps, something sweet, cold beers, and bottled water" },
	{ label: "Bike storage", detail: "Secure lock points on the towpath" },
	{ label: "Parking", detail: "Free, a short walk from the mooring" },
	{ label: "Check-in", detail: "From 15:00 · self check-in by lockbox" },
	{ label: "Check-out", detail: "Before 11:00" },
];

export default function Amenities() {
	return (
		<section id="amenities" className="py-20 lg:py-32 bg-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">

					{/* Left — intro */}
					<div className="reveal-left">
						<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
							Practical Info
						</p>
						<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug mb-6 title-underline">
							A comfortable stay, simply equipped
						</h2>
						<p className="font-sans text-muted text-base lg:text-lg leading-relaxed font-light">
							Everything needed for a peaceful few days on the water — nothing excessive, nothing missing. The boat is compact by nature, but thoughtfully fitted out for comfort in all seasons.
						</p>
						<p className="font-sans text-muted text-base leading-relaxed font-light mt-4">
							Cyclists are particularly well catered for, with secure storage and direct access to the Canal du Midi greenway from the mooring.
						</p>
					</div>

					{/* Right — inclusions */}
					<div className="reveal-right">
						<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
							Included during your stay
						</p>
						<ul className="divide-y divide-beige/60">
							{included.map((item) => (
								<li key={item.label} className="flex items-baseline justify-between gap-6 py-3.5">
									<span className="font-sans text-sm font-medium text-dark shrink-0">
										{item.label}
									</span>
									<span className="font-sans text-sm text-muted text-right">
										{item.detail}
									</span>
								</li>
							))}
						</ul>
					</div>

				</div>
			</div>
		</section>
	);
}
