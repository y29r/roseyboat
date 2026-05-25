"use client";

import Image from "next/image";
import { useTranslation, type Translations } from "@/lib/i18n";

export default function CtaSection() {
	const { translations }: { translations: Translations } = useTranslation();

	return (
		<section className="relative py-28 lg:py-40 overflow-hidden">
			<Image
				src="https://images.unsplash.com/photo-1778439989851-eadf0d427562?w=1600&q=80"
				alt="Red canal boat navigating through a lock in the countryside"
				fill
				sizes="100vw"
				className="object-cover object-center"
			/>
			<div className="absolute inset-0 bg-dark/55" />

			<div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
				<p className="font-sans text-white/60 text-xs tracking-[0.25em] uppercase mb-6">
					{translations.cta.preheading}
				</p>
				<h2 className="font-serif text-white text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6 text-balance">
					{translations.cta.heading}
				</h2>
				<p className="font-sans text-white/70 text-base lg:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
					{translations.cta.subtext}
				</p>
				<a
					href="#booking"
					className="inline-block bg-cream text-dark font-sans font-semibold text-sm tracking-wide px-10 py-4 rounded-full hover:bg-white transition-colors duration-300 shadow-lg"
				>
					{translations.cta.button}
				</a>
			</div>
		</section>
	);
}