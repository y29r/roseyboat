"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslation, type Translations } from "@/lib/i18n";

type ImageItem = {
	id: string;
	type: "image";
	src: string;
	alt: string;
	title: string;
	gridSpan: string;
};

type VideoItem = {
	id: string;
	type: "video";
	src: string;
	poster: string;
	title: string;
	gridSpan: string;
};

type MediaItem = ImageItem | VideoItem;

const BASE: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const MEDIA: MediaItem[] = [
	{
		id: "a",
		type: "image",
		src: "https://images.unsplash.com/photo-1583900570536-760910f198c9?w=1200&q=85",
		alt: "Narrowboat moored on a canal at Fradley Junction",
		title: "La Vie En Rose at the dock",
		gridSpan: "col-span-2 row-span-2",
	},
	{
		id: "b",
		type: "image",
		src: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=900&q=80",
		alt: "Canal du Midi tree-lined waterway",
		title: "The waterway",
		gridSpan: "col-span-1 row-span-1",
	},
	{
		id: "c",
		type: "video",
		src: `${BASE}/videos/boat-preview.mp4`,
		poster: `${BASE}/videos/poster-preview.jpg`,
		title: "Life on La Vie En Rose",
		gridSpan: "col-span-1 row-span-1",
	},
	{
		id: "d",
		type: "image",
		src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80",
		alt: "Cozy cabin interior with wooden details",
		title: "The interior",
		gridSpan: "col-span-1 row-span-1",
	},
	{
		id: "e",
		type: "image",
		src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
		alt: "Cycling on the canal towpath",
		title: "Towpath cycling",
		gridSpan: "col-span-1 row-span-1",
	},
	{
		id: "f",
		type: "image",
		src: "https://images.unsplash.com/photo-1576085923420-10077ceebf76?w=1200&q=80",
		alt: "Blue narrowboat on a canal near a stone bridge",
		title: "Along the canal",
		gridSpan: "col-span-2 row-span-1",
	},
	{
		id: "g",
		type: "image",
		src: "https://images.unsplash.com/photo-1592130305948-a636ee3d0324?w=900&q=80",
		alt: "Tree-lined canal with historic bridge and green foliage",
		title: "Canal greenery",
		gridSpan: "col-span-1 row-span-1",
	},
	{
		id: "h",
		type: "image",
		src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
		alt: "Aerial view of Canal du Midi and surrounding Languedoc landscape",
		title: "The landscape",
		gridSpan: "col-span-1 row-span-1",
	},
	{
		id: "i",
		type: "video",
		src: `${BASE}/videos/narrowboat-experience.mp4`,
		poster: `${BASE}/videos/poster-experience.jpg`,
		title: "What it's like to stay",
		gridSpan: "col-span-1 row-span-1",
	},
];

const GRID_COUNT: number = 5;

function Lightbox({
	items,
	initialIndex,
	initialPlay,
	onClose,
}: {
	items: MediaItem[];
	initialIndex: number;
	initialPlay: boolean;

	onClose: () => void;
}) {
	const [mediaIndex, setMediaIndex]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(initialIndex);
	const [playing, setPlaying]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(initialPlay);

	const { translations }: { translations: Translations } = useTranslation();

	const filmReference: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
	const touchX: React.RefObject<number> = useRef(0);

	const currentMediaItem: MediaItem = items[mediaIndex];

	const stepMediaItem: (dir: 1 | -1) => void = useCallback(
		(dir: 1 | -1) => {
			setPlaying(false);
			setMediaIndex((i) => (i + dir + items.length) % items.length);
		},
		[items.length]
	);

	useEffect(() => {
		const handleKey: (event: KeyboardEvent) => void = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
			else if (event.key === "ArrowLeft") stepMediaItem(-1);
			else if (event.key === "ArrowRight") stepMediaItem(1);
		};

		window.addEventListener("keydown", handleKey);

		return () => window.removeEventListener("keydown", handleKey);
	}, [stepMediaItem, onClose]);

	useEffect(() => {
		const previous: string = document.body.style.overflow;

		document.body.style.overflow = "hidden";

		window.dispatchEvent(new CustomEvent("lightbox-toggle", { detail: { open: true } }));

		return () => {
			document.body.style.overflow = previous;

			window.dispatchEvent(new CustomEvent("lightbox-toggle", { detail: { open: false } }));
		};
	}, []);

	useEffect(() => {
		const strip: HTMLDivElement | null = filmReference.current;
		if (!strip)
			return;

		const thumb: HTMLElement | undefined = strip.children[mediaIndex] as HTMLElement | undefined;

		thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
	}, [mediaIndex]);

	return (
		<div
			className="fixed inset-0 z-50 flex flex-col bg-[#0e0e0e]"
			onTouchStart={(event: React.TouchEvent<HTMLDivElement>) => (touchX.current = event.touches[0].clientX)}
			onTouchEnd={(event: React.TouchEvent<HTMLDivElement>) => {
				const deltaX: number = event.changedTouches[0].clientX - touchX.current;

				if (Math.abs(deltaX) > 50)
					stepMediaItem(deltaX > 0 ? -1 : 1);
			}}
		>
			<div className="shrink-0 flex items-center justify-between px-5 sm:px-8 py-5">
				<span className="font-sans text-white/25 text-[11px] tracking-[0.25em] tabular-nums select-none">
					{String(mediaIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
				</span>

				<span className="font-serif text-white/50 text-sm font-light hidden sm:block">
					{currentMediaItem.title}
				</span>

				<button
					onClick={onClose}
					className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
					aria-label="Close gallery"
				>
					<svg
						className="w-3.5 h-3.5"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div className="flex-1 relative flex items-center justify-center min-h-0 px-14 sm:px-20">
				<button
					onClick={() => stepMediaItem(-1)}
					className="absolute left-3 sm:left-5 z-10 w-10 h-10 rounded-full border border-white/15 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
					aria-label="Previous"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				</button>

				<div className="relative w-full max-w-5xl aspect-video">
					{currentMediaItem.type === "image" ? (
						<Image
							key={currentMediaItem.id}
							src={currentMediaItem.src}
							alt={currentMediaItem.alt}
							fill
							className="object-contain"
							sizes="(max-width: 1024px) 100vw, 80vw"
							priority
						/>
					) : playing ? (
						<video
							key={`play-${currentMediaItem.id}`}
							src={(currentMediaItem as VideoItem).src}
							poster={(currentMediaItem as VideoItem).poster}
							ref={(element: HTMLVideoElement | null) => { if (element) element.volume = 0.1; }}
							autoPlay
							controls
							playsInline
							className="absolute inset-0 w-full h-full rounded-xl"
							aria-label={currentMediaItem.title}
						/>
					) : (
						<button
							key={`thumb-${currentMediaItem.id}`}
							onClick={() => setPlaying(true)}
							className="absolute inset-0 w-full h-full rounded-xl overflow-hidden group"
							aria-label={`Play: ${currentMediaItem.title}`}
						>
							<Image
								src={(currentMediaItem as VideoItem).poster}
								alt={currentMediaItem.title}
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 80vw"
							/>
							<div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors duration-300" />
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
								<div className="w-20 h-20 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
									<svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
								<p className="font-sans text-white/40 text-[11px] tracking-[0.2em] uppercase">
									{translations.gallery.playFilm}
								</p>
							</div>
						</button>
					)}
				</div>

				<button
					onClick={() => stepMediaItem(1)}
					className="absolute right-3 sm:right-5 z-10 w-10 h-10 rounded-full border border-white/15 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
					aria-label="Next"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</button>
			</div>

			<div
				ref={filmReference}
				className="shrink-0 flex gap-2 px-5 sm:px-8 pb-6 pt-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
				style={{ scrollbarWidth: "none" }}
			>
				{items.map((item, i) => (
					<button
						key={item.id}
						onClick={() => {
							setPlaying(false);
							setMediaIndex(i);
						}}
						style={{ width: 80, height: 54, flexShrink: 0 }}
						className={`relative rounded-lg overflow-hidden transition-all duration-200 ${i === mediaIndex
							? "ring-1 ring-white/80 opacity-100"
							: "opacity-30 hover:opacity-60"
							}`}
						aria-label={item.title}
					>
						<Image
							src={
								item.type === "image"
									? item.src.split("?")[0] + "?w=160&q=55"
									: (item as VideoItem).poster
							}
							alt={item.title}
							fill
							className="object-cover"
							sizes="80px"
						/>
						{item.type === "video" && (
							<div className="absolute inset-0 flex items-center justify-center bg-black/30">
								<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
									<path d="M8 5v14l11-7z" />
								</svg>
							</div>
						)}
					</button>
				))}
			</div>
		</div>
	);
}

function GridTile({
	currentMediaItem,
	listIndex,
	onOpen,
}: {
	currentMediaItem: MediaItem;
	listIndex: number;
	onOpen: (i: number, play: boolean) => void;
}) {
	const isVideo: boolean = currentMediaItem.type === "video";
	const imgSrc: string = currentMediaItem.type === "image" ? currentMediaItem.src : (currentMediaItem as VideoItem).poster;
	const alt: string = currentMediaItem.type === "image" ? currentMediaItem.alt : currentMediaItem.title;

	return (
		<button
			onClick={() => onOpen(listIndex, isVideo)}
			className={`relative overflow-hidden rounded-xl bg-beige/40 group ${currentMediaItem.gridSpan}`}
			aria-label={currentMediaItem.title}
		>
			<Image
				src={imgSrc}
				alt={alt}
				fill
				className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
				sizes={
					currentMediaItem.gridSpan.includes("col-span-2")
						? "(max-width: 1280px) 60vw, 50vw"
						: "(max-width: 1280px) 30vw, 25vw"
				}
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			{isVideo && (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="w-12 h-12 rounded-full border border-white/50 bg-black/25 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
						<svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z" />
						</svg>
					</div>
				</div>
			)}
			<div className="absolute bottom-0 inset-x-0 px-3 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
				<p className="font-sans text-white text-[10px] tracking-[0.18em] uppercase">
					{currentMediaItem.title}
				</p>
			</div>
		</button>
	);
}

export default function Gallery() {
	const { translations }: { translations: any } = useTranslation();
	const [lightbox, setLightbox]: [{ index: number; play: boolean } | null, React.Dispatch<React.SetStateAction<{ index: number; play: boolean } | null>>] = useState<{ index: number; play: boolean } | null>(null);

	const imageCount: number = MEDIA.filter((m) => m.type === "image").length;
	const filmCount: number = MEDIA.filter((m) => m.type === "video").length;

	return (
		<section id="gallery" className="py-20 lg:py-32 bg-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 reveal-up">
					<div>
						<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-3">
							{translations.gallery.label}
						</p>

						<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug title-underline">
							{translations.gallery.heading}
						</h2>
					</div>

					<p className="font-sans text-muted text-sm max-w-xs leading-relaxed">
						{translations.gallery.desc}
					</p>
				</div>

				<div
					className="hidden md:grid grid-cols-4 gap-4 reveal-up"
					style={{ gridTemplateRows: "240px 240px" }}
				>
					{MEDIA.slice(0, GRID_COUNT).map((item: MediaItem, index: number) => (
						<GridTile
							key={item.id}
							currentMediaItem={item}
							listIndex={index}
							onOpen={(index, play) => setLightbox({ index: index, play })}
						/>
					))}
				</div>

				<div className="md:hidden grid grid-cols-2 gap-3 reveal-up">
					{MEDIA.slice(0, 4).map((item: MediaItem, index: number) => (
						<button
							key={item.id}
							onClick={() =>
								setLightbox({ index: index, play: item.type === "video" })
							}
							className="relative aspect-square rounded-xl overflow-hidden bg-beige/40 group"
							aria-label={item.title}
						>
							<Image
								src={
									item.type === "image" ? item.src : (item as VideoItem).poster
								}
								alt={item.type === "image" ? item.alt : item.title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
								sizes="50vw"
							/>
							{item.type === "video" && (
								<div className="absolute inset-0 flex items-center justify-center bg-black/20">
									<svg
										className="w-8 h-8 text-white"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							)}
						</button>
					))}
				</div>

				<div className="flex items-center justify-between mt-8 pt-8 border-t border-beige/40 reveal-up">
					<p className="font-sans text-xs text-muted/70 tracking-[0.15em] uppercase">
						{translations.gallery.photos.replace("{n}", String(imageCount))} · {translations.gallery.films.replace("{n}", String(filmCount))}
					</p>

					<button
						onClick={() => setLightbox({ index: 0, play: false })}
						className="group inline-flex items-center gap-3 font-sans text-sm text-dark/60 hover:text-dark transition-colors duration-300"
					>
						<span className="tracking-wide">{translations.gallery.browseAll}</span>
						<svg
							className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
							viewBox="0 0 24 24"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
					</button>
				</div>
			</div>

			{lightbox !== null && (
				<Lightbox
					items={MEDIA}
					initialIndex={lightbox.index}
					initialPlay={lightbox.play}
					onClose={() => setLightbox(null)}
				/>
			)}
		</section>
	);
}