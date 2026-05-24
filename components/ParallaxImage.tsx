"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ParallaxImageProps {
	src: string;
	alt: string;
	sizes?: string;
	className?: string;
	priority?: boolean;
}

export default function ParallaxImage({
	src,
	alt,
	sizes,
	className = '',
	priority = false,
}: ParallaxImageProps) {
	const containerReference: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
	const innerReference: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
			return;

		const container = containerReference.current;
		const inner = innerReference.current;

		if (!container || !inner)
			return;

		const handleScroll = () => {
			const clientRect: DOMRect = container.getBoundingClientRect();
			const viewHeight: number = window.innerHeight;
			const progress: number = 1 - (clientRect.bottom / (viewHeight + clientRect.height));
			const offset: number = (progress - 0.5) * 120;

			inner.style.transform = `translateY(${offset}px)`;
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div ref={containerReference} className={`relative overflow-hidden ${className}`}>
			<div
				ref={innerReference}
				style={{ position: 'absolute', top: -60, left: 0, right: 0, bottom: -60, willChange: 'transform' }}
			>
				<Image
					src={src}
					alt={alt}
					fill
					sizes={sizes}
					priority={priority}
					className="object-cover"
				/>
			</div>
		</div>
	);
}