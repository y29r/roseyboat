"use client";
import Image from "next/image";

export default function Hero() {
	return (
		<section
			id="hero"
			className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
		>
			{/* Background image */}
			<Image
				src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85"
				alt="Canal du Midi narrowboat on calm water surrounded by plane trees"
				fill
				priority
				sizes="100vw"
				className="object-cover object-center scale-y-[1.06]"
			/>

			{/* Dark overlay */}
			<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

			{/* Content */}
			<div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
				{/* Pre-heading */}
				<p className="text-white/70 font-sans text-xs tracking-[0.25em] uppercase mb-6 animate-fade-in">
					Canal du Midi · Southern France
				</p>

				{/* Main heading */}
				<h1 className="font-serif text-white text-4xl sm:text-5xl lg:text-7xl font-light leading-[1.1] mb-6 text-balance animate-fade-up">
					Stay aboard a traditional canal boat
				</h1>

				{/* Subtitle */}
				<p className="font-sans text-white/80 text-base sm:text-lg lg:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up">
					Slow travel through vineyards, medieval villages, and the ancient
					waterway of southern France. Cycle, drift, and simply be.
				</p>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up">
					<a
						href="#booking"
						className="w-full sm:w-auto min-w-[180px] bg-canal-green text-white font-sans font-semibold text-sm tracking-wide px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 text-center shadow-lg"
					>
						Check Availability
					</a>
					<a
						href="#gallery"
						className="w-full sm:w-auto min-w-[180px] bg-white/10 text-white border border-white/50 backdrop-blur-sm font-sans font-semibold text-sm tracking-wide px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 text-center"
					>
						View Gallery
					</a>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
				<span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
				<div className="w-px h-10 bg-white/30 animate-pulse" />
			</div>
		</section>
	);
}
