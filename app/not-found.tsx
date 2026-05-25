import Link from "next/link";
import type { JSX } from "react";

export default function NotFound(): JSX.Element {
	return (
		<div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
			<div className="mb-4">
				<p className="font-serif text-[6rem] leading-none font-[500] text-canal-green/25 select-none mb-10">
					404
				</p>
				<h1 className="relative font-serif text-3xl sm:text-4xl text-dark font-light">
					You&rsquo;ve drifted off course
				</h1>
			</div>

			<p className="font-sans text-muted text-sm leading-relaxed max-w-xs mb-10">
				This page doesn&rsquo;t seem to exist. You may have followed a broken
				link or typed the address incorrectly.
			</p>

			<Link
				href="/"
				className="inline-block bg-canal-green text-cream font-sans font-semibold text-sm tracking-wide px-10 py-4 rounded-full hover:bg-canal-green/85 transition-colors duration-300 shadow-md"
			>
				Back to home
			</Link>
		</div>
	);
}