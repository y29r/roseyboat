import ParallaxImage from "./ParallaxImage";

const moments = [
	{
		image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
		alt: "Morning coffee on the boat deck",
		tag: "Morning",
		heading: "Coffee before the world wakes",
		text: "Sit on the rear deck with a warm cup as mist lifts off the water. Hear only birdsong and the distant sound of locks opening.",
	},
	{
		image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
		alt: "Cycling along the Canal du Midi towpath",
		tag: "Cycling",
		heading: "Miles of quiet towpath",
		text: "The Canal du Midi greenway runs directly alongside. Ride to Carcassonne, Béziers, or simply stop at a village café when you feel like it.",
	},
	{
		image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80",
		alt: "Village market in southern France",
		tag: "Markets",
		heading: "Markets & village life",
		text: "Nearby villages hold weekly markets. Return with cheese, bread, and local wine — everything you need for an evening on the water.",
	},
	{
		image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
		alt: "Sunset over the Canal du Midi",
		tag: "Evenings",
		heading: "Evenings that slow down time",
		text: "Watch boats pass in the golden light. The plane trees cast long shadows across the water. There is nowhere else to be.",
	},
];

export default function Experience() {
	return (
		<section id="experience" className="py-20 lg:py-32 bg-cream">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				{/* Section header */}
				<div className="max-w-xl mb-16 lg:mb-24 reveal-up">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
						The Experience
					</p>
					<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug">
						Slow down. Let the canal set the pace.
					</h2>
				</div>

				{/* Alternating rows */}
				<div className="flex flex-col gap-20 lg:gap-28">
					{moments.map((m, i) => (
						<div
							key={m.tag}
							className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""
								}`}
						>
							{/* Image */}
							<ParallaxImage
								src={m.image}
								alt={m.alt}
								sizes="(max-width: 1024px) 100vw, 50vw"
								className={`aspect-[4/3] rounded-2xl shadow-md w-full${i % 2 === 1 ? " lg:order-2 reveal-right" : " reveal-left"}`}
							/>
							{/* Text */}
							<div className={i % 2 === 1 ? "lg:order-1 reveal-left" : "reveal-right"}>
								<span className="inline-block font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4 px-3 py-1 bg-canal-green/10 rounded-full">
									{m.tag}
								</span>
								<h3 className="font-serif text-3xl lg:text-4xl font-light text-dark mb-5 leading-snug">
									{m.heading}
								</h3>
								<p className="font-sans text-muted text-base lg:text-lg leading-relaxed font-light">
									{m.text}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
