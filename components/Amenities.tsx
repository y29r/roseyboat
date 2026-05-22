const amenities = [
	{ label: "Shower & toilet", detail: "Hot shower with excellent pressure" },
	{ label: "Air conditioning", detail: "Split unit, climate-controlled cabin" },
	{ label: "Heating", detail: "Diesel heating for cooler months" },
	{ label: "Wi-Fi", detail: "4G router, reliable signal onboard" },
	{ label: "Full kitchen", detail: "Hob, oven, fridge, microwave" },
	{ label: "Towels & linen", detail: "Provided for all guests" },
	{ label: "Bike storage", detail: "Secure lock points nearby on the towpath" },
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
							Everything needed for a peaceful few days along the canal — nothing excessive, nothing missing. The boat is compact by nature, but thoughtfully fitted out for comfort in all seasons.
						</p>
						<p className="font-sans text-muted text-base leading-relaxed font-light mt-4">
							Cyclists are particularly well catered for, with secure storage and direct access to the Canal du Midi greenway from the mooring.
						</p>
					</div>

					{/* Right — amenities list */}
					<div className="reveal-right">
						<ul className="divide-y divide-beige/60">
							{amenities.map((item) => (
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
