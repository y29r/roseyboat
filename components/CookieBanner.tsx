"use client";

import { useState, useEffect, type JSX } from "react";
import { useTranslation, type Translations } from "@/lib/i18n";

const STORAGE_KEY: string = "cookie_consent";

export default function CookieBanner(): JSX.Element | null {
	const { translations }: { translations: Translations } = useTranslation();
	const [visible, setVisible]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);

	useEffect(() => {
		if (!localStorage.getItem(STORAGE_KEY)) {
			setVisible(true);
		}
	}, []);

	function accept(): void {
		localStorage.setItem(STORAGE_KEY, "accepted");

		setVisible(false);
	}

	function decline(): void {
		localStorage.setItem(STORAGE_KEY, "declined");

		setVisible(false);
	}

	if (!visible)
		return null;

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-5 bg-cream border-t border-beige">
			<div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
				<p className="font-sans text-sm text-dark/70 flex-1 leading-relaxed">
					{translations.cookies.message}
				</p>

				<div className="flex items-center gap-4 shrink-0">
					<button
						onClick={decline}
						className="font-sans text-sm text-muted hover:text-dark transition-colors"
					>
						{translations.cookies.decline}
					</button>

					<button
						onClick={accept}
						className="font-sans text-sm bg-canal-green text-cream rounded-full px-5 py-2 hover:bg-canal-green/80 transition-colors"
					>
						{translations.cookies.accept}
					</button>
				</div>
			</div>
		</div>
	);
}