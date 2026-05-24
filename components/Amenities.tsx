"use client";
import { useT } from "@/lib/i18n";

export default function Amenities() {
	const { t } = useT();
	const included = t.amenities.items;
	return (
		<section id="amenities" className="py-20 lg:py-32 bg-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">

					{/* Left — intro */}
					<div className="reveal-left">
						<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
							{t.amenities.label}
						</p>
						<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug mb-6 title-underline">
							{t.amenities.heading}
						</h2>
						<p className="font-sans text-muted text-base lg:text-lg leading-relaxed font-light">
							{t.amenities.desc1}
						</p>
						<p className="font-sans text-muted text-base leading-relaxed font-light mt-4">
							{t.amenities.desc2}
						</p>
					</div>

					{/* Right — inclusions */}
					<div className="reveal-right">
						<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
							{t.amenities.includedLabel}
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
