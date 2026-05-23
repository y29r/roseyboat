"use client";
import { useState } from "react";
import ParallaxImage from "./ParallaxImage";

const photos = [
	{
		src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
		alt: "Narrowboat exterior on canal",
		span: "col-span-2 row-span-2",
	},
	{
		src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
		alt: "Cozy cabin interior with wooden details",
		span: "col-span-1 row-span-1",
	},
	{
		src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
		alt: "Deck seating area with canal views",
		span: "col-span-1 row-span-1",
	},
	{
		src: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=600&q=80",
		alt: "Canal du Midi tree-lined waterway",
		span: "col-span-1 row-span-2",
	},
	{
		src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
		alt: "Cycling on the canal towpath",
		span: "col-span-1 row-span-1",
	},
	{
		src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
		alt: "Sunset over the canal",
		span: "col-span-2 row-span-1",
	},
];

export default function Gallery() {
	const [expanded, setExpanded] = useState(false);

	return (
		<section id="gallery" className="py-20 lg:py-32 bg-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 reveal-up">
					<div>
						<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-3">
							Gallery
						</p>
						<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug title-underline">
							Life on the water
						</h2>
					</div>
					<p className="font-sans text-muted text-sm max-w-xs leading-relaxed">
						Every corner of La Rosée has been restored with care. Light, wood, water, and silence.
					</p>
				</div>

				{/* Desktop masonry grid — max-height clips to 2 rows initially */}
				<div
					className="hidden md:grid grid-cols-4 gap-4 overflow-hidden transition-[max-height] duration-700 ease-in-out"
					style={{
						gridTemplateRows: "200px 200px 200px",
						maxHeight: expanded ? "640px" : "416px",
					}}
				>
					{photos.map((photo) => (
						<ParallaxImage
							key={photo.src}
							src={photo.src}
							alt={photo.alt}
							sizes="(max-width: 1280px) 50vw, 33vw"
							className={`${photo.span} rounded-xl min-h-[200px]`}
						/>
					))}
				</div>

				{/* Mobile grid — show 4 initially */}
				<div className="md:hidden grid grid-cols-2 gap-3">
					{(expanded ? photos : photos.slice(0, 4)).map((photo) => (
						<ParallaxImage
							key={photo.src}
							src={photo.src}
							alt={photo.alt}
							sizes="50vw"
							className="aspect-square rounded-xl"
						/>
					))}
				</div>

				{/* Expand / collapse */}
				<div className="flex justify-center mt-8">
					<button
						onClick={() => setExpanded((e) => !e)}
						className="group flex items-center gap-2 font-sans text-sm text-muted hover:text-dark tracking-wide transition-colors duration-300"
					>
						{expanded ? "Show less" : "View full gallery"}
						<svg
							className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
							aria-hidden
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</button>
				</div>
			</div>
		</section>
	);
}


