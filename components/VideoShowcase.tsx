"use client";

import { useState } from "react";
import Image from "next/image";

type YouTubeVideo = {
	id: string;
	title: string;
	label: string;
};

const YOUTUBE_VIDEOS: YouTubeVideo[] = [
	{
		id: "HVE7kyga07c",
		title: "Life on the Canal du Midi",
		label: "Canal atmosphere",
	},
	{
		id: "bVVJWbUU99Q",
		title: "What it's like to stay on a narrowboat",
		label: "Life aboard",
	},
];

function YouTubeCard({
	id: videoId,
	title,
	label,
}: YouTubeVideo) {
	const [active, setActive]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);

	return (
		<div className="relative overflow-hidden rounded-2xl bg-dark aspect-video group">
			{active ? (
				<iframe
					className="absolute inset-0 w-full h-full"
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title={title}
				/>
			) : (
				<button
					onClick={() => setActive(true)}
					className="absolute inset-0 w-full h-full text-left"
					aria-label={`Play: ${title}`}
				>
					<Image
						src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
						alt={title}
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
						sizes="(max-width: 768px) 100vw, 50vw"
					/>

					<div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
					<div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-16 h-16 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
							<svg
								className="w-5 h-5 text-white ml-1"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden
							>
								<path d="M8 5v14l11-7z" />
							</svg>
						</div>
					</div>

					<div className="absolute bottom-0 inset-x-0 px-5 pb-5">
						<p className="font-sans text-white/50 text-[10px] tracking-[0.18em] uppercase mb-1.5">
							{label}
						</p>
						<p className="font-serif text-white text-lg font-light leading-snug">
							{title}
						</p>
					</div>
				</button>
			)}
		</div>
	);
}

export default function VideoShowcase() {
	return (
		<section id="films" className="py-20 lg:py-32 bg-[#EDE9E0]">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 reveal-up">
					<div>
						<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-3">
							Films
						</p>

						<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug">
							In motion
						</h2>
					</div>

					<p className="font-sans text-muted text-sm max-w-xs leading-relaxed">
						Interior walkthroughs, canal travel, and the slow rhythm of life
						aboard — captured on the water.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 reveal-up">
					{YOUTUBE_VIDEOS.map((v) => (
						<YouTubeCard key={v.id} {...v} />
					))}
				</div>
			</div>
		</section>
	);
}