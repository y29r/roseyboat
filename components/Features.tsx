const features = [
	"Sleeps 2–4",
	"Shower & Toilet",
	"Cyclist Friendly",
	"Kitchen Included",
];

export default function Features() {
	return (
		<section className="bg-[#EFECE4] border-b border-beige/40 py-5">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				{/* Desktop: single row with dot separators */}
				<ul className="hidden sm:flex items-center justify-center flex-wrap gap-x-0">
					{features.map((label, i) => (
						<li key={label} className="flex items-center">
							<span className="font-sans text-sm text-dark/60 font-light tracking-wide">
								{label}
							</span>
							{i < features.length - 1 && (
								<span className="mx-4 text-beige select-none" aria-hidden>·</span>
							)}
						</li>
					))}
				</ul>

				{/* Mobile: two compact rows */}
				<div className="sm:hidden flex flex-col gap-2 items-center">
					<ul className="flex items-center gap-x-0">
						{features.slice(0, 2).map((label, i) => (
							<li key={label} className="flex items-center">
								<span className="font-sans text-xs text-dark/60 font-light">{label}</span>
								{i < 1 && <span className="mx-3 text-beige select-none" aria-hidden>·</span>}
							</li>
						))}
					</ul>
					<ul className="flex items-center gap-x-0">
						{features.slice(2).map((label, i) => (
							<li key={label} className="flex items-center">
								<span className="font-sans text-xs text-dark/60 font-light">{label}</span>
								{i < features.slice(2).length - 1 && (
									<span className="mx-3 text-beige select-none" aria-hidden>·</span>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
