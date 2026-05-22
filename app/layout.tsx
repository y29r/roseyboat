import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-cormorant",
	display: "swap",
});

const manrope = Manrope({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-manrope",
	display: "swap",
});

export const metadata: Metadata = {
	title: "La Rosée — Canal du Midi Narrowboat Retreat",
	description:
		"Stay aboard a restored traditional canal boat on the Canal du Midi, southern France. A slow, quiet escape for cyclists, romantics, and wanderers.",
	openGraph: {
		title: "La Rosée — Canal du Midi Narrowboat Retreat",
		description: "A slow, quiet escape on the water in southern France.",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
			<body className="antialiased">
				<SmoothScroll />
				{children}
			</body>
		</html>
	);
}
