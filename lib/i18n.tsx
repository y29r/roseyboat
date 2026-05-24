"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";

export type Language = "EN" | "FR" | "DE" | "NL";
export const LANGUAGES: Language[] = ["EN", "FR", "DE", "NL"];

export type Translations = {
	nav: {
		experience: string;
		gallery: string;
		amenities: string;
		location: string;
		cta: string;
		language: string;
	};
	hero: {
		preheading: string;
		heading: string;
		subtitle: string;
		cta1: string;
		cta2: string;
		scroll: string;
	};
	features: {
		sleeps: string;
		shower: string;
		cycling: string;
		kitchen: string;
	};
	experience: {
		label: string;
		heading: string;
		moments: Array<{ tag: string; heading: string; text: string }>;
	};
	gallery: {
		label: string;
		heading: string;
		desc: string;
		photos: string;
		films: string;
		browseAll: string;
		playFilm: string;
	};
	booking: {
		label: string;
		heading: string;
		bookHeading: string;
		bookDesc: string;
		perNight: string;
		minStay: string;
		minStayVal: string;
		checkIn: string;
		checkInVal: string;
		checkOut: string;
		checkOutVal: string;
		capacity: string;
		capacityVal: string;
		airbnbBtn: string;
		inquiryBtn: string;
		calNote: string;
		available: string;
		booked: string;
		months: string[];
		days: string[];
	};
	amenities: {
		label: string;
		heading: string;
		intro: string;
		groups: Array<{
			label: string;
			items: Array<{ label: string; detail: string }>;
		}>;
		detailsLabel: string;
		showMoreLabel: string;
		details: Array<{
			label: string;
			items: Array<{ question: string; answer: string }>;
		}>;
	};
	location: {
		label: string;
		heading: string;
		intro: string;
		quicklook: string[];
		privacyNote: string;
		tabs: { nearby: string; cycling: string; dayTrips: string };
		nearby: Array<{ label: string; detail: string }>;
		cycling: Array<{ direction: string; label: string; detail: string }>;
		cyclingNotes: string[];
		dayTrips: Array<{ label: string; detail: string }>;
	};
	testimonials: {
		label: string;
		ratingText: string;
	};
	cta: {
		preheading: string;
		heading: string;
		subtext: string;
		button: string;
	};
	footer: {
		tagline: string;
		contact: string;
		follow: string;
		language: string;
		bookAirbnb: string;
		built: string;
	};
	mobile: {
		checkAvailability: string;
	};
};

const dictionary: Record<Language, Translations> = {
	EN: {
		nav: {
			experience: "Experience",
			gallery: "Gallery",
			amenities: "Amenities",
			location: "Location",
			cta: "Check Availability",
			language: "Language",
		},
		hero: {
			preheading: "Canal du Midi · Southern France",
			heading: "Stay aboard a traditional canal boat",
			subtitle:
				"Slow travel through vineyards, medieval villages, and the ancient waterway of southern France. Cycle, drift, and simply be.",
			cta1: "Check Availability",
			cta2: "View Gallery",
			scroll: "Scroll",
		},
		features: {
			sleeps: "Sleeps 2–4",
			shower: "Shower & Toilet",
			cycling: "Cyclist Friendly",
			kitchen: "Kitchen Included",
		},
		experience: {
			label: "The Experience",
			heading: "Slow down. Let the canal set the pace.",
			moments: [
				{
					tag: "Morning",
					heading: "Coffee before the world wakes",
					text: "Sit on the rear deck with a warm cup as mist lifts off the water. Hear only birdsong and the distant sound of locks opening.",
				},
				{
					tag: "Cycling",
					heading: "Miles of quiet towpath",
					text: "The Canal du Midi greenway runs directly alongside. Ride to Carcassonne, Béziers, or simply stop at a village café when you feel like it.",
				},
				{
					tag: "Markets",
					heading: "Markets & village life",
					text: "Nearby villages hold weekly markets. Return with cheese, bread, and local wine — everything you need for an evening on the water.",
				},
				{
					tag: "Evenings",
					heading: "Evenings that slow down time",
					text: "Watch boats pass in the golden light. The plane trees cast long shadows across the water. There is nowhere else to be.",
				},
			],
		},
		gallery: {
			label: "Gallery",
			heading: "Life on the water",
			desc: "Every corner of La Vie En Rose has been restored with care. Light, wood, water, and silence.",
			photos: "{n} photographs",
			films: "{n} films",
			browseAll: "Browse all",
			playFilm: "Play film",
		},
		booking: {
			label: "Availability",
			heading: "When would you like to stay?",
			bookHeading: "Book La Vie En Rose",
			bookDesc:
				"La Vie En Rose is listed on Airbnb for secure online booking and payment. Use the button below to check live availability and reserve your dates.",
			perNight: "/ night",
			minStay: "Min. stay",
			minStayVal: "3 nights",
			checkIn: "Check-in",
			checkInVal: "From 15:00",
			checkOut: "Check-out",
			checkOutVal: "Before 11:00",
			capacity: "Capacity",
			capacityVal: "Up to 4 guests",
			airbnbBtn: "Book on Airbnb",
			inquiryBtn: "Send an Inquiry",
			calNote:
				"Calendar availability is updated regularly. For the most accurate dates, check the Airbnb listing directly.",
			available: "Available",
			booked: "Booked",
			months: [
				"January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December",
			],
			days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
		},
		amenities: {
			label: "Practical Info",
			heading: "A comfortable stay, simply equipped",
			intro: "Everything needed for a comfortable few days on the water — nothing excessive, nothing missing.",
			groups: [
				{
					label: "On board",
					items: [
						{ label: "Heating", detail: "Diesel, all seasons" },
						{ label: "Linen & towels", detail: "Provided for all guests" },
						{ label: "Kitchen", detail: "Hob, oven & fridge" },
						{ label: "Coffee & tea", detail: "French press, complimentary" },
						{ label: "Snacks & drinks", detail: "Beers, water & something sweet" },
					],
				},
				{
					label: "Access & logistics",
					items: [
						{ label: "Parking", detail: "Free, short walk from the mooring" },
						{ label: "Bike storage", detail: "Secure lock points on the towpath" },
						{ label: "Pets", detail: "Well-behaved pets are welcome on board" },
					],
				},
				{
					label: "Stay details",
					items: [
						{ label: "Check-in", detail: "From 15:00 · self check-in by lockbox" },
						{ label: "Check-out", detail: "Before 11:00" },
						{ label: "Privacy", detail: "Entirely private — no shared spaces" },
					],
				},
			],
			detailsLabel: "Need more details?",
			showMoreLabel: "See more questions",
			details: [
				{
					label: "Booking & access",
					items: [
						{ question: "How do I make a booking?", answer: "Via Airbnb for secure payment, or send a direct inquiry if you prefer." },
						{ question: "How does check-in work?", answer: "Self check-in via a secure key lockbox — no waiting. Full instructions arrive with your booking confirmation." },
						{ question: "What time is check-in and check-out?", answer: "Check-in from 15:00, check-out before 11:00." },
						{ question: "How do I receive the exact location after booking?", answer: "The precise mooring location is shared by message after your booking is confirmed." },
					],
				},
				{
					label: "Location & privacy",
					items: [
						{ question: "Is the boat completely private?", answer: "Yes — no shared spaces, no other guests. The entire boat is yours for the duration of your stay." },
						{ question: "Where exactly is the boat located?", answer: "Moored near Capestang on the Canal du Midi. The exact address is sent after booking." },
						{ question: "Is the canal area safe and quiet at night?", answer: "Yes. The towpath is calm and well-used by locals. Most evenings on the water are beautifully still." },
					],
				},
				{
					label: "Comfort & facilities",
					items: [
						{ question: "Is there heating on board?", answer: "Yes — diesel heating keeps the boat warm throughout the cooler months." },
						{ question: "Is there a shower and what is it like?", answer: "Yes, a compact private shower and toilet are on board — clean, functional, and well-fitted." },
						{ question: "Is there Wi-Fi available?", answer: "There is no dedicated Wi-Fi on board. Mobile data coverage in the area is generally good." },
					],
				},
				{
					label: "Access & logistics",
					items: [
						{ question: "Is parking really free and how far is it from the boat?", answer: "Yes, free — a short walk, typically 3–5 minutes from the mooring." },
						{ question: "Are pets allowed on board?", answer: "Well-behaved pets are welcome. The towpath is ideal for morning walks." },
					],
				},
				{
					label: "Good to know",
					items: [
						{ question: "What should I bring with me?", answer: "Towels and linen are provided. Bring your own food and drink, or stock up in Capestang village on arrival." },
					],
				},
			],
		},
		location: {
			label: "Location",
			heading: "Moored near Capestang on the Canal du Midi",
			intro: "The boat is moored near Capestang — a village of plane trees and stone lanes, edged by vine rows, on the quietest stretch of the Canal du Midi.",
			quicklook: [
				"Capestang village — on foot",
				"Béziers — 20 km east",
				"Canal du Midi towpath — direct access",
				"Vineyards & weekly markets nearby",
			],
			tabs: { nearby: "Nearby", cycling: "Cycling", dayTrips: "Day Trips" },
			privacyNote: "Exact mooring location is shared with guests after booking confirmation.",
			nearby: [
				{ label: "Capestang", detail: "Village bakery, café & weekly market — on foot" },
				{ label: "Colombiers", detail: "Canal locks & quiet towpath village — 8 km" },
				{ label: "Béziers", detail: "Historic city, covered market & Friday brocante — 20 km" },
				{ label: "Narbonne", detail: "Roman city & canal du Midi junction — 30 km" },
			],
			cycling: [
				{ direction: "East", label: "Béziers", detail: "20 km · flat, shaded towpath" },
				{ direction: "West", label: "Tunnel de Malpas", detail: "scenic all-day route via Colombiers locks" },
			],
			cyclingNotes: [
				"EuroVelo 8 · direct towpath access from the mooring",
				"Bike hire available in Béziers and Capestang village",
			],
			dayTrips: [
				{ label: "Carcassonne", detail: "Medieval citadel & vineyard routes — 55 km" },
				{ label: "Mediterranean coast", detail: "Sète, Agde & Cap d'Agde — 40–60 km" },
				{ label: "Minerve", detail: "Perched village above the Gorges de la Cesse — 45 km" },
				{ label: "Saint-Guilhem-le-Désert", detail: "Medieval village & gorge walk — 70 km" },
			],
		},
		testimonials: {
			label: "Guest Reviews",
			ratingText: "· 42 reviews",
		},
		cta: {
			preheading: "La Vie En Rose · Canal du Midi",
			heading: "Ready for a slower stay in southern France?",
			subtext:
				"A few days on the water changes the way you experience time. Book early — dates fill quickly in summer.",
			button: "Check Availability",
		},
		footer: {
			tagline:
				"A restored traditional canal boat on the Canal du Midi, near Capestang in southern France.",
			contact: "Contact",
			follow: "Follow",
			language: "Language",
			bookAirbnb: "Book on Airbnb",
			built: "Built with care. No clutter.",
		},
		mobile: {
			checkAvailability: "Check Availability",
		},
	},

	FR: {
		nav: {
			experience: "L'Expérience",
			gallery: "Galerie",
			amenities: "Équipements",
			location: "Localisation",
			cta: "Vérifier les disponibilités",
			language: "Langue",
		},
		hero: {
			preheading: "Canal du Midi · Sud de la France",
			heading: "Séjournez à bord d'un bateau canal traditionnel",
			subtitle:
				"Voyagez lentement entre vignobles, villages médiévaux et l'ancienne voie navigable du sud de la France. Pédalez, dérivez et profitez.",
			cta1: "Vérifier les disponibilités",
			cta2: "Voir la galerie",
			scroll: "Défiler",
		},
		features: {
			sleeps: "2–4 personnes",
			shower: "Douche & WC",
			cycling: "Accès cyclistes",
			kitchen: "Cuisine équipée",
		},
		experience: {
			label: "L'Expérience",
			heading: "Ralentissez. Laissez le canal dicter le rythme.",
			moments: [
				{
					tag: "Matin",
					heading: "Café avant que le monde ne s'éveille",
					text: "Assis sur le pont arrière avec une tasse chaude, regardez la brume se lever au-dessus de l'eau. Seuls le chant des oiseaux et le son distant des écluses qui s'ouvrent.",
				},
				{
					tag: "Vélo",
					heading: "Des kilomètres de chemin de halage tranquille",
					text: "La véloroute du Canal du Midi longe directement le bateau. Roulez jusqu'à Carcassonne, Béziers, ou arrêtez-vous au café d'un village quand l'envie vous prend.",
				},
				{
					tag: "Marchés",
					heading: "Marchés & vie de village",
					text: "Les villages environnants tiennent des marchés hebdomadaires. Revenez avec du fromage, du pain et du vin local — tout ce qu'il faut pour une soirée sur l'eau.",
				},
				{
					tag: "Soirées",
					heading: "Des soirées qui ralentissent le temps",
					text: "Regardez les bateaux passer dans la lumière dorée. Les platanes projettent de longues ombres sur l'eau. Il n'y a nulle part ailleurs où être.",
				},
			],
		},
		gallery: {
			label: "Galerie",
			heading: "La vie sur l'eau",
			desc: "Chaque recoin de La Vie En Rose a été restauré avec soin. Lumière, bois, eau et silence.",
			photos: "{n} photographies",
			films: "{n} films",
			browseAll: "Tout parcourir",
			playFilm: "Lire le film",
		},
		booking: {
			label: "Disponibilités",
			heading: "Quand souhaitez-vous séjourner ?",
			bookHeading: "Réserver La Vie En Rose",
			bookDesc:
				"La Vie En Rose est référencée sur Airbnb pour une réservation et un paiement sécurisés. Utilisez le bouton ci-dessous pour vérifier les disponibilités en temps réel.",
			perNight: "/ nuit",
			minStay: "Durée min.",
			minStayVal: "3 nuits",
			checkIn: "Arrivée",
			checkInVal: "Dès 15h00",
			checkOut: "Départ",
			checkOutVal: "Avant 11h00",
			capacity: "Capacité",
			capacityVal: "Jusqu'à 4 personnes",
			airbnbBtn: "Réserver sur Airbnb",
			inquiryBtn: "Envoyer une demande",
			calNote:
				"La disponibilité du calendrier est mise à jour régulièrement. Pour les dates les plus récentes, consultez directement l'annonce Airbnb.",
			available: "Disponible",
			booked: "Réservé",
			months: [
				"Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
				"Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
			],
			days: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
		},
		amenities: {
			label: "Infos pratiques",
			heading: "Un séjour confortable, simplement équipé",
			intro: "Tout le nécessaire pour quelques jours tranquilles sur l'eau — rien d'excessif, rien de manquant.",
			groups: [
				{
					label: "À bord",
					items: [
						{ label: "Chauffage", detail: "Diesel, toutes saisons" },
						{ label: "Linge & serviettes", detail: "Fournis pour tous les hôtes" },
						{ label: "Cuisine", detail: "Plaques, four & réfrigérateur" },
						{ label: "Café & thé", detail: "Cafetière à piston, offerts" },
						{ label: "Snacks & boissons", detail: "Bières, eau & quelque chose de sucré" },
					],
				},
				{
					label: "Accès & logistique",
					items: [
						{ label: "Parking", detail: "Gratuit, à quelques minutes de l'amarrage" },
						{ label: "Rangement vélos", detail: "Points d'attache sécurisés sur le halage" },
						{ label: "Animaux", detail: "Bienvenus à bord" },
					],
				},
				{
					label: "Informations séjour",
					items: [
						{ label: "Arrivée", detail: "Dès 15h00 · boîte à clés autonome" },
						{ label: "Départ", detail: "Avant 11h00" },
						{ label: "Intimité", detail: "Entièrement privatif — aucun espace partagé" },
					],
				},
			],
			detailsLabel: "Plus de détails ?",
			showMoreLabel: "Voir plus de questions",
			details: [
				{
					label: "Réservation & accès",
					items: [
						{ question: "Comment effectuer une réservation ?", answer: "Via Airbnb pour un paiement sécurisé, ou envoyez une demande directe si vous préférez." },
						{ question: "Comment fonctionne l'arrivée ?", answer: "Accès autonome via une boîte à clés sécurisée — aucune attente. Les instructions complètes arrivent avec votre confirmation." },
						{ question: "Quels sont les horaires d'arrivée et de départ ?", answer: "Arrivée dès 15h00, départ avant 11h00." },
						{ question: "Comment reçois-je l'adresse exacte après ma réservation ?", answer: "L'emplacement précis de l'amarrage est communiqué par message après confirmation de votre réservation." },
					],
				},
				{
					label: "Lieu & intimité",
					items: [
						{ question: "Le bateau est-il entièrement privatif ?", answer: "Oui — aucun espace partagé, aucun autre voyageur. Le bateau est entièrement à vous." },
						{ question: "Où se trouve exactement le bateau ?", answer: "Amarré près de Capestang sur le Canal du Midi. L'adresse exacte est envoyée après réservation." },
						{ question: "Le canal est-il sûr et calme la nuit ?", answer: "Oui. Le chemin de halage est tranquille et fréquenté par les locaux. Les soirées sur l'eau sont généralement paisibles." },
					],
				},
				{
					label: "Confort & équipements",
					items: [
						{ question: "Y a-t-il un chauffage à bord ?", answer: "Oui — le chauffage diesel maintient le bateau au chaud pendant les mois plus frais." },
						{ question: "Y a-t-il une douche et comment est-elle ?", answer: "Oui, une douche privée compacte et des toilettes sont à bord — propres, fonctionnelles et bien équipées." },
						{ question: "Y a-t-il le Wi-Fi ?", answer: "Il n'y a pas de Wi-Fi dédié à bord. La couverture réseau mobile dans la zone est généralement bonne." },
					],
				},
				{
					label: "Accès & logistique",
					items: [
						{ question: "Le parking est-il vraiment gratuit et à quelle distance du bateau ?", answer: "Oui, gratuit — à quelques minutes à pied, généralement 3 à 5 minutes de l'amarrage." },
						{ question: "Les animaux sont-ils acceptés ?", answer: "Les animaux bien tenus sont les bienvenus. Le chemin de halage est idéal pour les promenades matinales." },
					],
				},
				{
					label: "Bon à savoir",
					items: [
						{ question: "Que dois-je apporter ?", answer: "Les serviettes et le linge de lit sont fournis. Prévoyez vos provisions ou faites vos courses au village de Capestang." },
					],
				},
			],
		},
		location: {
			label: "Localisation",
			heading: "Amarré près de Capestang sur le Canal du Midi",
			intro: "Le bateau est amarré près de Capestang — un village de platanes et de ruelles en pierre, bordé de vignes, sur le tronçon le plus calme du Canal du Midi.",
			quicklook: [
				"Village de Capestang — à pied",
				"Béziers — 20 km à l'est",
				"Chemin de halage du Canal du Midi — accès direct",
				"Vignobles & marchés hebdomadaires à proximité",
			],
			tabs: { nearby: "Alentours", cycling: "Vélo", dayTrips: "Excursions" },
			privacyNote: "L'emplacement exact de l'amarrage est communiqué aux locataires après confirmation de la réservation.",
			nearby: [
				{ label: "Capestang", detail: "Boulangerie, café & marché hebdomadaire — à pied" },
				{ label: "Colombiers", detail: "Écluses du canal & village tranquille — 8 km" },
				{ label: "Béziers", detail: "Ville historique, marché couvert & brocante — 20 km" },
				{ label: "Narbonne", detail: "Ville romaine & jonction du Canal du Midi — 30 km" },
			],
			cycling: [
				{ direction: "Est", label: "Béziers", detail: "20 km · chemin de halage plat et ombragé" },
				{ direction: "Ouest", label: "Tunnel de Malpas", detail: "circuit panoramique via les écluses de Colombiers" },
			],
			cyclingNotes: [
				"EuroVelo 8 · accès direct au chemin de halage depuis l'amarrage",
				"Location de vélos disponible à Béziers et au village de Capestang",
			],
			dayTrips: [
				{ label: "Carcassonne", detail: "Cité médiévale & routes viticoles — 55 km" },
				{ label: "Côte méditerranéenne", detail: "Sète, Agde & Cap d'Agde — 40–60 km" },
				{ label: "Minerve", detail: "Village perché sur les Gorges de la Cesse — 45 km" },
				{ label: "Saint-Guilhem-le-Désert", detail: "Village médiéval & randonnée dans les gorges — 70 km" },
			],
		},
		testimonials: {
			label: "Avis clients",
			ratingText: "· 42 avis",
		},
		cta: {
			preheading: "La Vie En Rose · Canal du Midi",
			heading: "Prêt pour un séjour au rythme plus doux dans le sud de la France ?",
			subtext:
				"Quelques jours sur l'eau changent la façon dont vous percevez le temps. Réservez tôt — les dates se remplissent vite en été.",
			button: "Vérifier les disponibilités",
		},
		footer: {
			tagline:
				"Un bateau canal traditionnel restauré sur le Canal du Midi, près de Capestang dans le sud de la France.",
			contact: "Contact",
			follow: "Suivre",
			language: "Langue",
			bookAirbnb: "Réserver sur Airbnb",
			built: "Fait avec soin. Sans superflu.",
		},
		mobile: {
			checkAvailability: "Vérifier les disponibilités",
		},
	},

	DE: {
		nav: {
			experience: "Erlebnis",
			gallery: "Galerie",
			amenities: "Ausstattung",
			location: "Lage",
			cta: "Verfügbarkeit prüfen",
			language: "Sprache",
		},
		hero: {
			preheading: "Canal du Midi · Südfrankreich",
			heading: "Übernachten Sie an Bord eines traditionellen Kanalboots",
			subtitle:
				"Langsames Reisen durch Weinberge, mittelalterliche Dörfer und den antiken Wasserweg Südfrankreichs. Radfahren, treiben lassen, einfach sein.",
			cta1: "Verfügbarkeit prüfen",
			cta2: "Galerie ansehen",
			scroll: "Scrollen",
		},
		features: {
			sleeps: "2–4 Personen",
			shower: "Dusche & WC",
			cycling: "Fahrradfreundlich",
			kitchen: "Küche vorhanden",
		},
		experience: {
			label: "Das Erlebnis",
			heading: "Entschleunigen. Den Canal den Rhythmus vorgeben lassen.",
			moments: [
				{
					tag: "Morgen",
					heading: "Kaffee, bevor die Welt erwacht",
					text: "Sitzen Sie auf dem Achterdeck mit einer warmen Tasse, während sich der Nebel vom Wasser hebt. Nur Vogelgesang und das ferne Geräusch der sich öffnenden Schleusen.",
				},
				{
					tag: "Radfahren",
					heading: "Kilometer ruhiger Leinpfade",
					text: "Der Canal du Midi-Radweg verläuft direkt nebenan. Fahren Sie nach Carcassonne, Béziers oder halten Sie einfach an einem Dorfcafé an, wann immer es Ihnen gefällt.",
				},
				{
					tag: "Märkte",
					heading: "Märkte & Dorfleben",
					text: "Nahegelegene Dörfer veranstalten wöchentliche Märkte. Kehren Sie mit Käse, Brot und lokalem Wein zurück — alles, was man für einen Abend auf dem Wasser braucht.",
				},
				{
					tag: "Abende",
					heading: "Abende, die die Zeit verlangsamen",
					text: "Beobachten Sie Boote, die im goldenen Licht vorbeiziehen. Die Platanen werfen lange Schatten auf das Wasser. Es gibt keinen anderen Ort, an dem man sein müsste.",
				},
			],
		},
		gallery: {
			label: "Galerie",
			heading: "Leben auf dem Wasser",
			desc: "Jede Ecke von La Vie En Rose wurde mit Sorgfalt restauriert. Licht, Holz, Wasser und Stille.",
			photos: "{n} Fotos",
			films: "{n} Filme",
			browseAll: "Alle ansehen",
			playFilm: "Film abspielen",
		},
		booking: {
			label: "Verfügbarkeit",
			heading: "Wann möchten Sie bleiben?",
			bookHeading: "La Vie En Rose buchen",
			bookDesc:
				"La Vie En Rose ist auf Airbnb gelistet für sichere Online-Buchung und Zahlung. Nutzen Sie den Button unten, um die aktuelle Verfügbarkeit zu prüfen und Ihre Termine zu reservieren.",
			perNight: "/ Nacht",
			minStay: "Mind. Aufenthalt",
			minStayVal: "3 Nächte",
			checkIn: "Check-in",
			checkInVal: "Ab 15:00 Uhr",
			checkOut: "Check-out",
			checkOutVal: "Vor 11:00 Uhr",
			capacity: "Kapazität",
			capacityVal: "Bis zu 4 Gäste",
			airbnbBtn: "Auf Airbnb buchen",
			inquiryBtn: "Anfrage senden",
			calNote:
				"Die Kalenderverfügbarkeit wird regelmäßig aktualisiert. Für die aktuellsten Daten überprüfen Sie bitte direkt das Airbnb-Inserat.",
			available: "Verfügbar",
			booked: "Gebucht",
			months: [
				"Januar", "Februar", "März", "April", "Mai", "Juni",
				"Juli", "August", "September", "Oktober", "November", "Dezember",
			],
			days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
		},
		amenities: {
			label: "Ausstattung",
			heading: "Ein komfortabler Aufenthalt, einfach ausgestattet",
			intro: "Alles Notwendige für ein paar ruhige Tage auf dem Wasser — nichts Überflüssiges, nichts fehlt.",
			groups: [
				{
					label: "An Bord",
					items: [
						{ label: "Heizung", detail: "Diesel, ganzjährig" },
						{ label: "Bettwäsche & Handtücher", detail: "Für alle Gäste bereitgestellt" },
						{ label: "Küche", detail: "Herd, Backofen & Kühlschrank" },
						{ label: "Kaffee & Tee", detail: "French Press, kostenlos" },
						{ label: "Snacks & Getränke", detail: "Biere, Wasser & etwas Süßes" },
					],
				},
				{
					label: "Zugang & Logistik",
					items: [
						{ label: "Parkplatz", detail: "Kostenlos, kurzer Fußweg vom Liegeplatz" },
						{ label: "Fahrradaufbewahrung", detail: "Sichere Schlösser am Leinpfad" },
						{ label: "Haustiere", detail: "An Bord willkommen" },
					],
				},
				{
					label: "Aufenthaltsdetails",
					items: [
						{ label: "Check-in", detail: "Ab 15:00 Uhr · Selbst-Check-in per Schlüsselbox" },
						{ label: "Check-out", detail: "Vor 11:00 Uhr" },
						{ label: "Privatsphäre", detail: "Vollständig privat — keine geteilten Bereiche" },
					],
				},
			],
			detailsLabel: "Noch Fragen?",
			showMoreLabel: "Weitere Fragen anzeigen",
			details: [
				{
					label: "Buchung & Zugang",
					items: [
						{ question: "Wie kann ich buchen?", answer: "Über Airbnb für sichere Zahlung, oder senden Sie eine direkte Anfrage." },
						{ question: "Wie funktioniert der Check-in?", answer: "Selbst-Check-in per Schlüsselbox — kein Warten. Vollständige Anweisungen werden mit Ihrer Buchungsbestätigung zugesandt." },
						{ question: "Wann ist Check-in und Check-out?", answer: "Check-in ab 15:00 Uhr, Check-out vor 11:00 Uhr." },
						{ question: "Wie erhalte ich nach der Buchung den genauen Standort?", answer: "Der genaue Liegeplatz wird nach Buchungsbestätigung per Nachricht mitgeteilt." },
					],
				},
				{
					label: "Lage & Privatsphäre",
					items: [
						{ question: "Ist das Boot vollständig privat?", answer: "Ja — keine geteilten Bereiche, keine anderen Gäste. Das gesamte Boot gehört Ihnen." },
						{ question: "Wo genau liegt das Boot?", answer: "Vertäut bei Capestang am Canal du Midi. Die genaue Adresse wird nach der Buchung zugesandt." },
						{ question: "Ist der Kanalbereich nachts sicher und ruhig?", answer: "Ja. Der Leinpfad ist ruhig und von Einheimischen genutzt. Die Abende auf dem Wasser sind meist sehr still." },
					],
				},
				{
					label: "Komfort & Ausstattung",
					items: [
						{ question: "Gibt es Heizung an Bord?", answer: "Ja — eine Diesel-Heizung hält das Boot in den kühleren Monaten warm." },
						{ question: "Gibt es eine Dusche und wie ist sie?", answer: "Ja, eine kompakte private Dusche und Toilette sind an Bord — sauber, funktional und gut ausgestattet." },
						{ question: "Gibt es WLAN an Bord?", answer: "Es gibt kein dediziertes WLAN an Bord. Die mobile Datenverbindung in der Gegend ist im Allgemeinen gut." },
					],
				},
				{
					label: "Zugang & Logistik",
					items: [
						{ question: "Ist der Parkplatz wirklich kostenlos und wie weit ist er vom Boot?", answer: "Ja, kostenlos — ein kurzer Fußweg, in der Regel 3–5 Minuten vom Liegeplatz." },
						{ question: "Sind Haustiere erlaubt?", answer: "Gut erzogene Haustiere sind herzlich willkommen. Der Leinpfad ist ideal für Morgenrunden." },
					],
				},
				{
					label: "Gut zu wissen",
					items: [
						{ question: "Was sollte ich mitbringen?", answer: "Handtücher und Bettwäsche werden gestellt. Bringen Sie Lebensmittel mit oder kaufen Sie im Dorf Capestang ein." },
					],
				},
			],
		},
		location: {
			label: "Lage",
			heading: "Vertäut bei Capestang am Canal du Midi",
			intro: "Das Boot liegt bei Capestang vertäut — einem Dorf aus Platanen und Steingassen, umgeben von Weinreben, am ruhigsten Abschnitt des Canal du Midi.",
			quicklook: [
				"Dorf Capestang — zu Fuß",
				"Béziers — 20 km östlich",
				"Canal du Midi-Leinpfad — direkter Zugang",
				"Weinberge & Wochenmärkte in der Nähe",
			],
			tabs: { nearby: "Umgebung", cycling: "Radfahren", dayTrips: "Ausflüge" },
			privacyNote: "Der genaue Liegeplatz wird Gästen nach Buchungsbestätigung mitgeteilt.",
			nearby: [
				{ label: "Capestang", detail: "Dorfbäckerei, Café & Wochenmarkt — zu Fuß" },
				{ label: "Colombiers", detail: "Kanalschleusen & ruhiges Leinpfaddorf — 8 km" },
				{ label: "Béziers", detail: "Historische Stadt, überdachter Markt & Flohmarkt — 20 km" },
				{ label: "Narbonne", detail: "Römerstadt & Canal du Midi-Kreuzung — 30 km" },
			],
			cycling: [
				{ direction: "Ost", label: "Béziers", detail: "20 km · flacher, schattiger Leinpfad" },
				{ direction: "West", label: "Tunnel de Malpas", detail: "malerische Tagesroute über Schleusen Colombiers" },
			],
			cyclingNotes: [
				"EuroVelo 8 · direkter Leinpfadzugang vom Liegeplatz",
				"Fahrradverleih in Béziers und im Dorf Capestang",
			],
			dayTrips: [
				{ label: "Carcassonne", detail: "Mittelalterliche Zitadelle & Weinbergrouten — 55 km" },
				{ label: "Mittelmeerküste", detail: "Sète, Agde & Cap d'Agde — 40–60 km" },
				{ label: "Minerve", detail: "Hochgelegenes Dorf über den Gorges de la Cesse — 45 km" },
				{ label: "Saint-Guilhem-le-Désert", detail: "Mittelalterliches Dorf & Schluchtweg — 70 km" },
			],
		},
		testimonials: {
			label: "Gästebewertungen",
			ratingText: "· 42 Bewertungen",
		},
		cta: {
			preheading: "La Vie En Rose · Canal du Midi",
			heading: "Bereit für einen ruhigeren Aufenthalt in Südfrankreich?",
			subtext:
				"Ein paar Tage auf dem Wasser verändern, wie Sie Zeit wahrnehmen. Buchen Sie frühzeitig — die Termine sind im Sommer schnell vergeben.",
			button: "Verfügbarkeit prüfen",
		},
		footer: {
			tagline:
				"Ein restauriertes traditionelles Kanalboot am Canal du Midi, in der Nähe von Capestang in Südfrankreich.",
			contact: "Kontakt",
			follow: "Folgen",
			language: "Sprache",
			bookAirbnb: "Auf Airbnb buchen",
			built: "Mit Sorgfalt gebaut. Ohne Überfluss.",
		},
		mobile: {
			checkAvailability: "Verfügbarkeit prüfen",
		},
	},

	NL: {
		nav: {
			experience: "Ervaring",
			gallery: "Galerij",
			amenities: "Faciliteiten",
			location: "Locatie",
			cta: "Beschikbaarheid controleren",
			language: "Taal",
		},
		hero: {
			preheading: "Canal du Midi · Zuid-Frankrijk",
			heading: "Verblijf aan boord van een traditionele kanaalboot",
			subtitle:
				"Langzaam reizen door wijngaarden, middeleeuwse dorpjes en het eeuwenoude waterwegennetwerk van Zuid-Frankrijk. Fietsen, dobberen en gewoon zijn.",
			cta1: "Beschikbaarheid controleren",
			cta2: "Galerij bekijken",
			scroll: "Scroll",
		},
		features: {
			sleeps: "2–4 personen",
			shower: "Douche & toilet",
			cycling: "Fietsvriendelijk",
			kitchen: "Keuken aanwezig",
		},
		experience: {
			label: "De Ervaring",
			heading: "Vertragen. Laat het kanaal het tempo bepalen.",
			moments: [
				{
					tag: "Ochtend",
					heading: "Koffie voordat de wereld ontwaakt",
					text: "Zit op het achterdek met een warme kop terwijl de mist van het water opstijgt. Hoor alleen vogelgezang en het verre geluid van sluizen die opengaan.",
				},
				{
					tag: "Fietsen",
					heading: "Kilometers rustig jaagpad",
					text: "De Canal du Midi-fietsroute loopt direct langs de boot. Fiets naar Carcassonne, Béziers of stop gewoon bij een dorpscafé wanneer je er zin in hebt.",
				},
				{
					tag: "Markten",
					heading: "Markten & dorpsleven",
					text: "Nabijgelegen dorpjes houden wekelijkse markten. Keer terug met kaas, brood en lokale wijn — alles wat je nodig hebt voor een avond op het water.",
				},
				{
					tag: "Avonden",
					heading: "Avonden die de tijd vertragen",
					text: "Kijk hoe boten voorbijvaren in het gouden licht. De platanen werpen lange schaduwen over het water. Er is nergens anders om te zijn.",
				},
			],
		},
		gallery: {
			label: "Galerij",
			heading: "Leven op het water",
			desc: "Elke hoek van La Vie En Rose is met zorg gerestaureerd. Licht, hout, water en stilte.",
			photos: "{n} foto's",
			films: "{n} films",
			browseAll: "Alles bekijken",
			playFilm: "Film afspelen",
		},
		booking: {
			label: "Beschikbaarheid",
			heading: "Wanneer wilt u verblijven?",
			bookHeading: "La Vie En Rose boeken",
			bookDesc:
				"La Vie En Rose staat op Airbnb voor veilig online boeken en betalen. Gebruik de knop hieronder om de actuele beschikbaarheid te controleren en uw datums te reserveren.",
			perNight: "/ nacht",
			minStay: "Min. verblijf",
			minStayVal: "3 nachten",
			checkIn: "Inchecken",
			checkInVal: "Vanaf 15:00",
			checkOut: "Uitchecken",
			checkOutVal: "Vóór 11:00",
			capacity: "Capaciteit",
			capacityVal: "Tot 4 gasten",
			airbnbBtn: "Boeken via Airbnb",
			inquiryBtn: "Stuur een aanvraag",
			calNote:
				"De kalender wordt regelmatig bijgewerkt. Controleer de Airbnb-advertentie voor de meest actuele datums.",
			available: "Beschikbaar",
			booked: "Geboekt",
			months: [
				"Januari", "Februari", "Maart", "April", "Mei", "Juni",
				"Juli", "Augustus", "September", "Oktober", "November", "December",
			],
			days: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
		},
		amenities: {
			label: "Praktische info",
			heading: "Een comfortabel verblijf, eenvoudig uitgerust",
			intro: "Alles wat nodig is voor een rustige paar dagen op het water — niets overbodig, niets mist.",
			groups: [
				{
					label: "Aan boord",
					items: [
						{ label: "Verwarming", detail: "Diesel, het hele jaar" },
						{ label: "Beddengoed & handdoeken", detail: "Verzorgd voor alle gasten" },
						{ label: "Keuken", detail: "Kookplaat, oven & koelkast" },
						{ label: "Koffie & thee", detail: "French press, gratis" },
						{ label: "Snacks & dranken", detail: "Bieren, water & iets zoets" },
					],
				},
				{
					label: "Toegang & logistiek",
					items: [
						{ label: "Parkeren", detail: "Gratis, op loopafstand van de aanlegplaats" },
						{ label: "Fietsopslag", detail: "Veilige slotpunten op het jaagpad" },
						{ label: "Huisdieren", detail: "Welkom aan boord" },
					],
				},
				{
					label: "Verblijfsdetails",
					items: [
						{ label: "Inchecken", detail: "Vanaf 15:00 · zelf inchecken via sleutelkluis" },
						{ label: "Uitchecken", detail: "Vóór 11:00" },
						{ label: "Privacy", detail: "Volledig privé — geen gedeelde ruimtes" },
					],
				},
			],
			detailsLabel: "Meer weten?",
			showMoreLabel: "Meer vragen bekijken",
			details: [
				{
					label: "Boeking & toegang",
					items: [
						{ question: "Hoe maak ik een reservering?", answer: "Via Airbnb voor veilig betalen, of stuur een directe aanvraag als u dat prefereert." },
						{ question: "Hoe verloopt het inchecken?", answer: "Zelf inchecken via een beveiligde sleutelkluis — geen wachten. Volledige instructies volgen met uw boekingsbevestiging." },
						{ question: "Wat zijn de check-in en check-out tijden?", answer: "Check-in vanaf 15:00 uur, check-out vóór 11:00 uur." },
						{ question: "Hoe ontvang ik de exacte locatie na boeking?", answer: "De precieze aanlegplaats wordt na bevestiging van uw boeking per bericht gedeeld." },
					],
				},
				{
					label: "Locatie & privacy",
					items: [
						{ question: "Is de boot volledig privé?", answer: "Ja — geen gedeelde ruimtes, geen andere gasten. De hele boot is voor u." },
						{ question: "Waar ligt de boot precies?", answer: "Aangemeerd bij Capestang aan het Canal du Midi. Het exacte adres volgt na uw boeking." },
						{ question: "Is het kanaalgebied 's nachts veilig en rustig?", answer: "Ja. Het jaagpad is rustig en door locals goed gebruikt. De avonden op het water zijn doorgaans prachtig stil." },
					],
				},
				{
					label: "Comfort & faciliteiten",
					items: [
						{ question: "Is er verwarming aan boord?", answer: "Ja — dieselverwarming houdt de boot warm tijdens de koelere maanden." },
						{ question: "Is er een douche en hoe is die?", answer: "Ja, een compacte privédouche en toilet zijn aan boord — schoon, functioneel en goed uitgerust." },
						{ question: "Is er Wi-Fi beschikbaar?", answer: "Er is geen eigen Wi-Fi aan boord. Mobiele data-dekking in het gebied is over het algemeen goed." },
					],
				},
				{
					label: "Toegang & logistiek",
					items: [
						{ question: "Is parkeren echt gratis en hoe ver is het van de boot?", answer: "Ja, gratis — op een paar minuten lopen, doorgaans 3 tot 5 minuten van de aanlegplaats." },
						{ question: "Zijn huisdieren toegestaan?", answer: "Goed opgevoede huisdieren zijn welkom. Het jaagpad is ideaal voor ochtendwandelingen." },
					],
				},
				{
					label: "Handig om te weten",
					items: [
						{ question: "Wat moet ik meenemen?", answer: "Handdoeken en beddengoed zijn aanwezig. Breng uw eigen eten en drinken mee, of sla in op in het dorp Capestang." },
					],
				},
			],
		},
		location: {
			label: "Locatie",
			heading: "Aangemeerd bij Capestang aan het Canal du Midi",
			intro: "De boot ligt aangemeerd bij Capestang — een dorp van platanen en stenen steegjes, omringd door wijngaarden, op het rustigste stuk van het Canal du Midi.",
			quicklook: [
				"Dorp Capestang — op loopafstand",
				"Béziers — 20 km naar het oosten",
				"Canal du Midi-jaagpad — direct toegankelijk",
				"Wijngaarden & weekmarkten in de buurt",
			],
			tabs: { nearby: "Omgeving", cycling: "Fietsen", dayTrips: "Uitstapjes" },
			privacyNote: "De exacte aanlegplaats wordt gedeeld met gasten na bevestiging van de boeking.",
			nearby: [
				{ label: "Capestang", detail: "Dorpsbakker, café & weekmarkt — op loopafstand" },
				{ label: "Colombiers", detail: "Kanaalsluizen & rustig jaagpaddorp — 8 km" },
				{ label: "Béziers", detail: "Historische stad, overdekte markt & rommelmarkt — 20 km" },
				{ label: "Narbonne", detail: "Romeinse stad & Canal du Midi-kruispunt — 30 km" },
			],
			cycling: [
				{ direction: "Oost", label: "Béziers", detail: "20 km · vlak, beschaduwd jaagpad" },
				{ direction: "West", label: "Tunnel de Malpas", detail: "schilderachtige dagroute via sluizen Colombiers" },
			],
			cyclingNotes: [
				"EuroVelo 8 · direct jaagpadtoegang vanaf de aanlegplaats",
				"Fietsverhuur in Béziers en het dorp Capestang",
			],
			dayTrips: [
				{ label: "Carcassonne", detail: "Middeleeuwse citadel & wijngaardroutes — 55 km" },
				{ label: "Middellandse Zeekust", detail: "Sète, Agde & Cap d'Agde — 40–60 km" },
				{ label: "Minerve", detail: "Hoog gelegen dorp boven de Gorges de la Cesse — 45 km" },
				{ label: "Saint-Guilhem-le-Désert", detail: "Middeleeuws dorp & kloofdal — 70 km" },
			],
		},
		testimonials: {
			label: "Gastbeoordelingen",
			ratingText: "· 42 beoordelingen",
		},
		cta: {
			preheading: "La Vie En Rose · Canal du Midi",
			heading: "Klaar voor een rustiger verblijf in Zuid-Frankrijk?",
			subtext:
				"Een paar dagen op het water verandert de manier waarop u tijd ervaart. Boek vroeg — datums vullen snel in de zomer.",
			button: "Beschikbaarheid controleren",
		},
		footer: {
			tagline:
				"Een gerestaureerde traditionele kanaalboot aan het Canal du Midi, bij Capestang in Zuid-Frankrijk.",
			contact: "Contact",
			follow: "Volgen",
			language: "Taal",
			bookAirbnb: "Boeken via Airbnb",
			built: "Gemaakt met zorg. Zonder rommel.",
		},
		mobile: {
			checkAvailability: "Beschikbaarheid controleren",
		},
	},
};

const I18nContext: React.Context<{
	language: Language;
	setLanguage: (language: Language) => void;
	translations: Translations;
}> = createContext<{
	language: Language;
	setLanguage: (language: Language) => void;
	translations: Translations;
}>({ language: "EN", setLanguage: () => { }, translations: dictionary.EN });

export function I18nProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguageState]: [Language, (language: Language) => void] = useState<Language>("EN");

	useEffect(() => {
		try {
			const saved: Language | null = localStorage.getItem("language") as Language | null;

			if (saved && dictionary[saved] !== undefined)
				setLanguageState(saved);
		} catch {
			console.log("Could not access localStorage to get saved language preference.");
		}
	}, []);

	const setLanguage: (language: Language) => void = useCallback((language: Language) => {
		setLanguageState(language);

		try {
			localStorage.setItem("language", language);
		} catch {
			console.log("Could not access localStorage to save language preference.");
		}
	}, []);

	return (
		<I18nContext.Provider value={{ language, setLanguage, translations: dictionary[language] }}>
			{children}
		</I18nContext.Provider>
	);
}

export function useTranslation() {
	return useContext(I18nContext);
}
