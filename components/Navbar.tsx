"use client";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useT, LANGUAGES, type Lang } from "@/lib/i18n";

const NAV_HREFS = [
	{ key: "experience" as const, href: "#experience" },
	{ key: "gallery" as const, href: "#gallery" },
	{ key: "amenities" as const, href: "#amenities" },
	{ key: "location" as const, href: "#location" },
];

export default function Navbar() {
	const { t, lang, setLang } = useT();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const ids = NAV_HREFS.map((navItem) => navItem.href.slice(1));
		const observers: IntersectionObserver[] = [];
		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (!el) return;
			const obs = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) setActiveSection(id);
				},
				{ rootMargin: "-40% 0px -50% 0px", threshold: 0 }
			);
			obs.observe(el);
			observers.push(obs);
		});
		return () => observers.forEach((o) => o.disconnect());
	}, []);

	const navLinks = NAV_HREFS.map((navItem) => ({
		label: t.nav[navItem.key as keyof typeof t.nav] as string,
		href: navItem.href,
	}));

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${scrolled
				? "bg-cream/95 backdrop-blur-sm shadow-sm border-beige/40"
				: "bg-transparent border-transparent"
				}`}
		>
			<div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
				<Link
					href="#hero"
					className={`font-serif text-xl lg:text-2xl font-medium tracking-wide transition-colors duration-300 ${scrolled ? "text-dark" : "text-white"
						}`}
				>
					La Vie En Rose
				</Link>

				<nav className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => {
						const isActive = activeSection === link.href.slice(1);
						return (
							<a
								key={link.href}
								href={link.href}
								className={`text-sm font-sans font-medium tracking-wide transition-colors duration-300 ${scrolled
									? isActive
										? "text-canal-green"
										: "text-dark hover:text-canal-green"
									: isActive
										? "text-white"
										: "text-white/80 hover:text-white"
									}`}
							>
								{link.label}
								{isActive && scrolled && (
									<span className="block h-px w-full bg-canal-green mt-0.5 rounded-full" />
								)}
							</a>
						);
					})}
					<a
						href="#booking"
						className={`text-sm font-sans font-medium px-5 py-2.5 rounded-full transition-all duration-300 ${scrolled
							? "bg-canal-green text-white hover:bg-opacity-90"
							: "bg-white/20 text-white border border-white/40 backdrop-blur-sm hover:bg-white/30"
							}`}
					>
						{t.nav.cta}
					</a>

					<div className={`flex items-center gap-1 pl-4 border-l ${scrolled ? "border-beige/60" : "border-white/20"}`}>
						{LANGUAGES.map((language, index) => (
							<Fragment key={language}>
								{index > 0 && (
									<span className={`text-xs select-none ${scrolled ? "text-beige" : "text-white/25"}`} aria-hidden>|</span>
								)}
								<button
									onClick={() => setLang(language as Lang)}
									className={`font-sans text-xs tracking-widest transition-colors duration-300 ${lang === language
											? scrolled ? "text-dark" : "text-white"
											: scrolled ? "text-muted hover:text-dark" : "text-white/40 hover:text-white"
										}`}
								>
									{language}
								</button>
							</Fragment>
						))}
					</div>
				</nav>

				<button
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
					className={`md:hidden flex flex-col flex-shrink-0 gap-1.5 p-2 transition-colors duration-300 ${scrolled ? "text-dark" : "text-white"
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

			<div
				className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
					} bg-cream border-t border-beige/40`}
			>
				<nav className="flex flex-col px-6 py-4 gap-4">
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							onClick={() => setMenuOpen(false)}
							className={`font-sans text-base font-medium py-2 border-b border-beige/30 transition-colors ${activeSection === link.href.slice(1)
								? "text-canal-green"
								: "text-dark hover:text-canal-green"
								}`}
						>
							{link.label}
						</a>
					))}
					<a
						href="#booking"
						onClick={() => setMenuOpen(false)}
						className="mt-2 text-center bg-canal-green text-white text-sm font-semibold font-sans py-3 rounded-full hover:bg-opacity-90 transition-all"
					>
						{t.nav.cta}
					</a>

					<div className="flex items-center gap-3 pt-3 mt-1 border-t border-beige/30">
						<span className="font-sans text-xs text-muted">{t.nav.language}</span>
						<div className="flex items-center gap-1.5">
							{LANGUAGES.map((language, index) => (
								<Fragment key={language}>
									{index > 0 && (
										<span className="text-xs text-beige select-none" aria-hidden>|</span>
									)}
									<button
										onClick={() => setLang(language as Lang)}
										className={`font-sans text-xs tracking-widest transition-colors ${lang === language ? "text-canal-green font-semibold" : "text-muted hover:text-dark"
											}`}
									>
										{language}
									</button>
								</Fragment>
							))}
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
}
