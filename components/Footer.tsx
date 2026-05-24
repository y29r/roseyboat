"use client";

import { Fragment } from "react";
import { useTranslation, LANGUAGES, type Language } from "@/lib/i18n";

export default function Footer() {
	const { translations, language, setLanguage }: { translations: any; language: Language; setLanguage: (language: Language) => void } = useTranslation();

	return (
		<footer className="bg-dark text-white/60 py-12 lg:py-16">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
					<div className="sm:col-span-2 lg:col-span-1">
						<p className="font-serif text-white text-2xl font-medium mb-3">La Vie En Rose</p>
						<p className="font-sans text-sm leading-relaxed">
							{translations.footer.tagline}
						</p>
					</div>

					<div>
						<h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-4">{translations.footer.contact}</h4>
						<ul className="space-y-2 font-sans text-sm">
							<li>
								<a
									href="mailto:contact@labarque.fr"
									className="hover:text-white transition-colors duration-200"
								>
									contact@labarque.fr
								</a>
							</li>

							<li>
								<a
									href="https://www.airbnb.com"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-white transition-colors duration-200"
								>
									{translations.footer.bookAirbnb}
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-4">{translations.footer.follow}</h4>
						<ul className="space-y-2 font-sans text-sm">
							<li>
								<a
									href="https://instagram.com"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-white transition-colors duration-200 flex items-center gap-2"
								>
									<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
									</svg>
									@labarque.canal
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-4">{translations.footer.language}</h4>
						<div className="flex gap-3 font-sans text-sm">
							{LANGUAGES.map((mappedLanguage: Language, index: number) => (
								<Fragment key={mappedLanguage}>
									{index > 0 && <span className="text-white/20">·</span>}
									<button
										onClick={() => setLanguage(mappedLanguage)}
										className={`transition-colors ${language === mappedLanguage ? "text-white font-medium" : "hover:text-white"}`}
									>
										{mappedLanguage.toUpperCase()}
									</button>
								</Fragment>
							))}
						</div>
					</div>
				</div>

				<div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
					<p className="font-sans text-xs text-white/30">
						© {new Date().getFullYear()} La Vie En Rose · Canal du Midi, France
					</p>

					<p className="font-sans text-xs text-white/20">
						{translations.footer.built}
					</p>
				</div>
			</div>
		</footer>
	);
}