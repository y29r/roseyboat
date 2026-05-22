const reviews = [
	{
		quote:
			"Waking up to water and birdsong every morning. The canal at dawn is something I'll never forget.",
		name: "Sophie",
		country: "Netherlands",
		rating: 5,
	},
	{
		quote:
			"Perfectly clean, beautifully restored. The kitchen had everything and the beds were incredibly comfortable.",
		name: "James",
		country: "United Kingdom",
		rating: 5,
	},
	{
		quote:
			"We cycled to three villages and a medieval citadel. Having the boat as a base made it feel like a real adventure.",
		name: "Lena",
		country: "Germany",
		rating: 5,
	},
	{
		quote:
			"Quiet, honest, and utterly peaceful. Nothing pretentious — just a beautiful place on a beautiful waterway.",
		name: "Thomas",
		country: "France",
		rating: 5,
	},
	{
		quote:
			"The host was wonderfully helpful with cycling routes. The towpath access is just incredible.",
		name: "Camille",
		country: "Canada",
		rating: 5,
	},
	{
		quote:
			"We came for three nights and wished we'd booked a week. The sunsets from the deck were worth the trip alone.",
		name: "Erik",
		country: "Sweden",
		rating: 5,
	},
];

function Stars({ count }: { count: number }) {
	return (
		<div className="flex gap-0.5">
			{Array.from({ length: count }).map((_, i) => (
				<svg key={i} className="w-3.5 h-3.5 text-canal-green" viewBox="0 0 20 20" fill="currentColor">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			))}
		</div>
	);
}

export default function Testimonials() {
	return (
		<section id="testimonials" className="py-20 lg:py-32 bg-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
					<div>
						<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
							Guest Reviews
						</p>
						<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug">
							Stories from the water
						</h2>
					</div>
					<div className="flex items-center gap-3">
						<Stars count={5} />
						<span className="font-sans text-sm text-muted">
							<strong className="text-dark">4.97</strong> · 42 reviews
						</span>
					</div>
				</div>

				{/* Review grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{reviews.map((r) => (
						<div
							key={r.name}
							className="bg-cream rounded-2xl border border-beige/50 p-6 lg:p-7 flex flex-col gap-4 hover:shadow-sm transition-shadow duration-300"
						>
							<Stars count={r.rating} />
							<blockquote className="font-serif text-dark text-lg lg:text-xl font-light leading-snug flex-1">
								"{r.quote}"
							</blockquote>
							<div className="flex items-center gap-2 pt-2 border-t border-beige/50">
								<div className="w-8 h-8 rounded-full bg-canal-green/15 flex items-center justify-center text-canal-green font-serif font-medium text-sm">
									{r.name[0]}
								</div>
								<div>
									<p className="font-sans text-sm font-semibold text-dark leading-none mb-0.5">{r.name}</p>
									<p className="font-sans text-xs text-muted">{r.country}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
