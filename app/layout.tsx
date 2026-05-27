import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CookieBanner from "@/components/CookieBanner";
import { I18nProvider } from "@/lib/i18n";

const cormorant: any = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-cormorant",
	display: "swap",
});

const manrope: any = Manrope({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-manrope",
	display: "swap",
});

const SITE_URL: string = "https://y29r.github.io/roseyboat";

const jsonLd: any = {
	"@context": "https://schema.org",
	"@type": "LodgingBusiness",
	name: "La Vie En Rose",
	description:
		"Stay aboard a restored traditional canal boat on the Canal du Midi, southern France. A slow, quiet escape for cyclists, romantics, and wanderers.",
	url: SITE_URL + "/",
	image: SITE_URL + "/videos/poster-hero.jpg",
	priceRange: "€€",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Capestang",
		addressRegion: "Hérault",
		addressCountry: "FR",
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: 43.3289,
		longitude: 3.0436,
	},
	checkinTime: "15:00",
	checkoutTime: "11:00",
	amenityFeature: [
		{ "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
		{ "@type": "LocationFeatureSpecification", name: "Linen provided", value: true },
		{ "@type": "LocationFeatureSpecification", name: "Towels provided", value: true },
		{ "@type": "LocationFeatureSpecification", name: "Sun deck", value: true },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: "La Vie En Rose — Canal du Midi Narrowboat Retreat",
	description:
		"Stay aboard a restored traditional canal boat on the Canal du Midi, southern France. A slow, quiet escape for cyclists, romantics, and wanderers.",
	keywords: [
		"canal boat rental",
		"Canal du Midi",
		"narrowboat holiday",
		"France boat hire",
		"southern France",
		"slow travel",
		"houseboat retreat",
	],
	alternates: {
		canonical: SITE_URL + "/",
	},
	openGraph: {
		title: "La Vie En Rose — Canal du Midi Narrowboat Retreat",
		description:
			"Stay aboard a restored traditional canal boat on the Canal du Midi, southern France. A slow, quiet escape for cyclists, romantics, and wanderers.",
		url: SITE_URL + "/",
		siteName: "La Vie En Rose",
		type: "website",
		locale: "en_GB",
		images: [
			{
				url: SITE_URL + "/videos/poster-hero.jpg",
				width: 1920,
				height: 1080,
				alt: "La Vie En Rose narrowboat moored on the Canal du Midi",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "La Vie En Rose — Canal du Midi Narrowboat Retreat",
		description:
			"Stay aboard a restored traditional canal boat on the Canal du Midi, southern France. A slow, quiet escape for cyclists, romantics, and wanderers.",
		images: [SITE_URL + "/videos/poster-hero.jpg"],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className="antialiased">
				<I18nProvider>
					<SmoothScroll />
					{children}
					<CookieBanner />
				</I18nProvider>
			</body>
		</html>
	);
}