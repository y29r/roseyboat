"use client";

import { useTranslation } from "@/lib/i18n";
import AvailabilityCalendar from "./AvailabilityCalendar";

export default function Booking() {
	const { translations }: { translations: any } = useTranslation();

	return (
		<section id="booking" className="py-20 lg:py-32 bg-cream">
			<div className="max-w-7xl mx-auto px-6 lg:px-10">
				<div className="max-w-xl mb-14">
					<p className="font-sans text-xs text-canal-green tracking-[0.2em] uppercase mb-4">
						{translations.booking.label}
					</p>
					<h2 className="font-serif text-4xl lg:text-5xl font-light text-dark leading-snug">
						{translations.booking.heading}
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
					<div className="bg-white rounded-2xl shadow-sm border border-beige/40 p-6 lg:p-8">
						<AvailabilityCalendar />
					</div>

					<div className="flex flex-col gap-6">
						<div className="bg-white rounded-2xl shadow-sm border border-beige/40 p-6 lg:p-8">
							<h3 className="font-serif text-2xl text-dark mb-2">{translations.booking.bookHeading}</h3>
							<p className="font-sans text-muted text-sm leading-relaxed mb-6">
								{translations.booking.bookDesc}
							</p>

							<div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-beige/40">
								<span className="font-serif text-4xl text-dark font-light">€180</span>
								<span className="font-sans text-sm text-muted">{translations.booking.perNight}</span>
							</div>

							<div className="space-y-3 mb-8">
								{[
									{ label: translations.booking.minStay, value: translations.booking.minStayVal },
									{ label: translations.booking.checkIn, value: translations.booking.checkInVal },
									{ label: translations.booking.checkOut, value: translations.booking.checkOutVal },
									{ label: translations.booking.capacity, value: translations.booking.capacityVal },
								].map(item => (
									<div key={item.label} className="flex justify-between items-center py-2 border-b border-beige/40 last:border-0">
										<span className="font-sans text-sm text-muted">{item.label}</span>
										<span className="font-sans text-sm font-medium text-dark">{item.value}</span>
									</div>
								))}
							</div>

							<a
								href="https://www.airbnb.com"
								target="_blank"
								rel="noopener noreferrer"
								className="block w-full text-center bg-canal-green text-white font-sans font-semibold text-sm tracking-wide py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 mb-3"
							>
								{translations.booking.airbnbBtn}
							</a>
							<a
								href="mailto:contact@labarque.fr"
								className="block w-full text-center bg-transparent text-canal-green border border-canal-green font-sans font-semibold text-sm tracking-wide py-4 rounded-full hover:bg-canal-green/5 transition-all duration-300"
							>
								{translations.booking.inquiryBtn}
							</a>
						</div>

						<p className="font-sans text-xs text-muted leading-relaxed px-1">
							{translations.booking.calNote}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}