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
	const containerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const container = containerRef.current;
		const inner = innerRef.current;
		if (!container || !inner) return;

		const handleScroll = () => {
			const rect = container.getBoundingClientRect();
			const viewH = window.innerHeight;
			const progress = 1 - (rect.bottom / (viewH + rect.height));
			const offset = (progress - 0.5) * 120;
			inner.style.transform = `translateY(${offset}px)`;
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div ref={containerRef} className={`relative overflow-hidden ${className}`}>
			<div
				ref={innerRef}
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