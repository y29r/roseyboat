"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${scrolled
				? "bg-cream/95 backdrop-blur-sm shadow-sm border-beige/40"
				: "bg-transparent border-transparent"
				}`}
		>
			<div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
				{/* Logo */}
				<Link
					href="#hero"
					className={`font-serif text-xl lg:text-2xl font-medium tracking-wide transition-colors duration-300 ${scrolled ? "text-dark" : "text-white"
						}`}
				>
					La Rosée
				</Link>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-8">
					{[
						{ label: "Experience", href: "#experience" },
						{ label: "Gallery", href: "#gallery" },
						{ label: "Amenities", href: "#amenities" },
						{ label: "Location", href: "#location" },
					].map((link) => (
						<a
							key={link.href}
							href={link.href}
							className={`text-sm font-sans font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${scrolled ? "text-dark" : "text-white/90"
								}`}
						>
							{link.label}
						</a>
					))}
					<a
						href="#booking"
						className={`text-sm font-sans font-medium px-5 py-2.5 rounded-full transition-all duration-300 ${scrolled
							? "bg-canal-green text-white hover:bg-opacity-90"
							: "bg-white/20 text-white border border-white/40 backdrop-blur-sm hover:bg-white/30"
							}`}
					>
						Check Availability
					</a>
				</nav>

				{/* Mobile hamburger */}
				<button
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
					className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors duration-300 ${scrolled ? "text-dark" : "text-white"
						}`}
				>
					<span
						className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
							}`}
					/>
					<span
						className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""
							}`}
					/>
					<span
						className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
							}`}
					/>
				</button>
			</div>

			{/* Mobile menu */}
			<div
				className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
					} bg-cream border-t border-beige/40`}
			>
				<nav className="flex flex-col px-6 py-4 gap-4">
					{[
						{ label: "Experience", href: "#experience" },
						{ label: "Gallery", href: "#gallery" },
						{ label: "Amenities", href: "#amenities" },
						{ label: "Location", href: "#location" },
					].map((link) => (
						<a
							key={link.href}
							href={link.href}
							onClick={() => setMenuOpen(false)}
							className="text-dark font-sans text-base font-medium py-2 border-b border-beige/30 hover:text-canal-green transition-colors"
						>
							{link.label}
						</a>
					))}
					<a
						href="#booking"
						onClick={() => setMenuOpen(false)}
						className="mt-2 text-center bg-canal-green text-white text-sm font-semibold font-sans py-3 rounded-full hover:bg-opacity-90 transition-all"
					>
						Check Availability
					</a>
				</nav>
			</div>
		</header>
	);
}
