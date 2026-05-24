/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
	assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
	trailingSlash: true,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'img.youtube.com',
			},
		],
	},
};

export default nextConfig;
