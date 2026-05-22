import Image from 'next/image';

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
	return (
		<div className={`parallax-container relative overflow-hidden ${className}`}>
			<div
				className="parallax-inner"
				style={{ position: 'absolute', top: -100, left: 0, right: 0, bottom: -100 }}
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