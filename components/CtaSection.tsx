import Image from "next/image";

export default function CtaSection() {
	return (
		<section className="relative py-28 lg:py-40 overflow-hidden">
			{/* Background */}
			<Image
				src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80"
				alt="Sunset on the Canal du Midi"
				fill
				sizes="100vw"
				className="object-cover object-center"
			/>
			<div className="absolute inset-0 bg-dark/55" />

			{/* Content */}
			<div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
				<p className="font-sans text-white/60 text-xs tracking-[0.25em] uppercase mb-6">
					La Rosée · Canal du Midi
				</p>
				<h2 className="font-serif text-white text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6 text-balance">
					Ready for a slower stay in southern France?
				</h2>
				<p className="font-sans text-white/70 text-base lg:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
					A few days on the water changes the way you experience time. Book early — dates fill quickly in summer.
				</p>
				<a
					href="#booking"
					className="inline-block bg-cream text-dark font-sans font-semibold text-sm tracking-wide px-10 py-4 rounded-full hover:bg-white transition-colors duration-300 shadow-lg"
				>
					Check Availability
				</a>
			</div>
		</section>
	);
}
