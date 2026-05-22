import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Amenities from "@/components/Amenities";
import Location from "@/components/Location";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/MobileStickyCta";

export default function Home() {
	return (
		<main>
			<Navbar />
			<Hero />
			<Features />
			<Experience />
			<Gallery />
			<Booking />
			<Amenities />
			<Location />
			<Testimonials />
			<CtaSection />
			<Footer />
			<MobileStickyCta />
		</main>
	);
}
