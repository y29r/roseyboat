"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";

export default function Hero() {
	const { t } = useT();
	const contentRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [videoVisible, setVideoVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (!contentRef.current) return;
			const scrollY = window.scrollY;
			const offset = scrollY * 0.35;
			contentRef.current.style.transform = `translateY(-${offset}px)`;
			contentRef.current.style.opacity = `${1 - scrollY / 600}`;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const id = setTimeout(() => {
			const video = videoRef.current;
			if (!video) return;
			video.src = "/videos/hero-loop.mp4";
			video.load();
			video.play().catch(() => { });
		}, 1200);
		return () => clearTimeout(id);
	}, []);

	return (
		<section
			id="hero"
			className="relative w-full h-[101vh] min-h-[600px] flex items-center justify-center overflow-hidden"
		>
			<Image
				src="https://images.unsplash.com/photo-1759329772246-c7c6a08518c2?w=1920&q=85"
				alt="Tree-lined canal path with lush green foliage and calm water reflections"
				fill
				priority
				sizes="100vw"
				className="object-cover object-center scale-y-[1.06]"
			/>

			<video
				ref={videoRef}
				className={`absolute inset-0 w-full h-full object-cover object-center scale-y-[1.06] transition-opacity duration-[1200ms] ${videoVisible ? "opacity-100" : "opacity-0"
					}`}
				muted
				loop
				playsInline
				preload="none"
				aria-hidden
				onCanPlay={() => setVideoVisible(true)}
			/>

			<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

			{/* Content */}
			<div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto will-change-transform">
				<p className="text-white/70 font-sans text-xs tracking-[0.25em] uppercase mb-6 animate-fade-in">
					{t.hero.preheading}
				</p>

				<h1 className="font-serif text-white text-4xl sm:text-5xl lg:text-7xl font-light leading-[1.1] mb-6 text-balance animate-fade-up">
					{t.hero.heading}
				</h1>

				<p className="font-sans text-white/80 text-base sm:text-lg lg:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up">
					{t.hero.subtitle}
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up">
					<a
						href="#booking"
						className="w-full sm:w-auto min-w-[180px] bg-canal-green text-white font-sans font-semibold text-sm tracking-wide px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 text-center shadow-lg"
					>
						{t.hero.cta1}
					</a>
					<a
						href="#gallery"
						className="w-full sm:w-auto min-w-[180px] bg-white/10 text-white border border-white/50 backdrop-blur-sm font-sans font-semibold text-sm tracking-wide px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 text-center"
					>
						{t.hero.cta2}
					</a>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
				<span className="font-sans text-xs tracking-widest uppercase">{t.hero.scroll}</span>
				<div className="w-px h-10 bg-white/30 animate-pulse" />
			</div>
		</section>
	);
}
