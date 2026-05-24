"use client";
import { useTranslation } from "@/lib/i18n";
import ParallaxImage from "./ParallaxImage";

const MOMENT_IMAGES = [
	{ image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80", alt: "Morning coffee on the boat deck" },
	{ image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", alt: "Cycling along the Canal du Midi towpath" },
	{ image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80", alt: "Village market in southern France" },
	{ image: "https://images.unsplash.com/photo-1695231665900-20e188033ed8?w=800&q=80", alt: "Narrowboat travelling along a peaceful canal through green countryside" },
];

export default function Experience() {
	const { translations: t } = useTranslation();
	const moments = t.experience.moments.map((moment, i) => ({ ...moment, ...MOMENT_IMAGES[i] }));
	return (
		<section id="experience" className="py-20 lg:py-32 bg-cream">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="max-w-xl mb-16 lg:mb-24 reveal-up">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
						{t.experience.label}
					</p>
					<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug title-underline">
						{t.experience.heading}
					</h2>
				</div>

				<div className="flex flex-col gap-20 lg:gap-28">
					{moments.map((moment, i) => (
						<div
							key={moment.tag}
							className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""
								}`}
						>
							<ParallaxImage
								src={moment.image}
								alt={moment.alt}
								sizes="(max-width: 1024px) 100vw, 50vw"
								className={`aspect-[4/3] rounded-2xl shadow-md w-full${i % 2 === 1 ? " lg:order-2 reveal-right" : " reveal-left"}`}
							/>
							<div className={i % 2 === 1 ? "lg:order-1 reveal-left" : "reveal-right"}>
								<span className="inline-block font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4 px-3 py-1 bg-canal-green/10 rounded-full">
									{moment.tag}
								</span>
								<h3 className="font-serif text-3xl lg:text-4xl font-light text-dark mb-5 leading-snug">
									{moment.heading}
								</h3>
								<p className="font-sans text-muted text-base lg:text-lg leading-relaxed font-light">
									{moment.text}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
