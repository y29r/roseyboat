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
		desc1: string;
		desc2: string;
		includedLabel: string;
		items: Array<{ label: string; detail: string }>;
	};
	location: {
		label: string;
		heading: string;
		mooringHeading: string;
		mooringText1: string;
		mooringText2: string;
		nearbyLabel: string;
		cyclingLabel: string;
		privacyNote: string;
		nearby: Array<{ label: string; detail: string }>;
		cycling: string[];
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

const dict: Record<Language, Translations> = {
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
			desc1:
				"Everything needed for a peaceful few days on the water — nothing excessive, nothing missing. The boat is compact by nature, but thoughtfully fitted out for comfort in all seasons.",
			desc2:
				"Cyclists are particularly well catered for, with secure storage and direct access to the Canal du Midi greenway from the mooring.",
			includedLabel: "Included during your stay",
			items: [
				{ label: "Heating", detail: "Diesel heating for cooler months" },
				{ label: "Towels & linen", detail: "Provided for all guests" },
				{ label: "Kitchen", detail: "Hob, oven, and fridge — self-cater as you please" },
				{ label: "Coffee & tea", detail: "Complimentary, with a French press on board" },
				{ label: "Snacks & drinks", detail: "Crisps, something sweet, cold beers, and bottled water" },
				{ label: "Bike storage", detail: "Secure lock points on the towpath" },
				{ label: "Parking", detail: "Free, a short walk from the mooring" },
				{ label: "Check-in", detail: "From 15:00 · self check-in by lockbox" },
				{ label: "Check-out", detail: "Before 11:00" },
			],
		},
		location: {
			label: "Location",
			heading: "Moored near Capestang on the Canal du Midi",
			mooringHeading: "About the mooring",
			mooringText1:
				"La Vie En Rose is moored near Capestang — a small village on the Canal du Midi, surrounded by vineyards and garrigue, in the Hérault département of southern France.",
			mooringText2:
				"The canal here is quiet and unhurried. Capestang village is on foot. Béziers is a short ride east. The plane tree canopy is unbroken for miles in either direction.",
			nearbyLabel: "Nearby",
			cyclingLabel: "Cycling Access",
			privacyNote:
				"Exact mooring location is shared with guests after booking confirmation.",
			nearby: [
				{ label: "Capestang", detail: "Village bakery, café & weekly market — on foot" },
				{ label: "Béziers", detail: "Historic city, covered market, Friday brocante — 20 km" },
				{ label: "Narbonne", detail: "Roman city, canal du Midi junction — 30 km" },
				{ label: "Carcassonne", detail: "Medieval citadel & vineyard routes — 55 km" },
				{ label: "Colombiers", detail: "Canal locks, quiet towpath village — 8 km" },
			],
			cycling: [
				"Canal du Midi Greenway (EuroVelo 8) runs directly alongside",
				"Flat, shaded towpath east to Béziers — approx. 20 km, all abilities",
				"West toward Colombiers locks and the Tunnel de Malpas — a full day ride",
				"Bike hire available in Béziers and Capestang village",
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
			desc1:
				"Tout le nécessaire pour quelques jours tranquilles sur l'eau — rien d'excessif, rien de manquant. Le bateau est compact par nature, mais aménagé avec soin pour le confort en toutes saisons.",
			desc2:
				"Les cyclistes sont particulièrement bien accueillis, avec un rangement sécurisé et un accès direct à la véloroute du Canal du Midi depuis l'amarrage.",
			includedLabel: "Inclus pendant votre séjour",
			items: [
				{ label: "Chauffage", detail: "Chauffage diesel pour les mois plus froids" },
				{ label: "Serviettes & literie", detail: "Fournies pour tous les hôtes" },
				{ label: "Cuisine", detail: "Plaques, four et réfrigérateur — cuisinez à votre guise" },
				{ label: "Café & thé", detail: "Offerts, avec une cafetière à piston à bord" },
				{ label: "Snacks & boissons", detail: "Chips, quelque chose de sucré, bières froides et eau en bouteille" },
				{ label: "Rangement vélos", detail: "Points d'attache sécurisés sur le chemin de halage" },
				{ label: "Parking", detail: "Gratuit, à quelques minutes à pied de l'amarrage" },
				{ label: "Arrivée", detail: "Dès 15h00 · arrivée autonome par boîte à clés" },
				{ label: "Départ", detail: "Avant 11h00" },
			],
		},
		location: {
			label: "Localisation",
			heading: "Amarré près de Capestang sur le Canal du Midi",
			mooringHeading: "L'emplacement",
			mooringText1:
				"La Vie En Rose est amarrée près de Capestang — un petit village sur le Canal du Midi, entouré de vignobles et de garrigue, dans le département de l'Hérault en France.",
			mooringText2:
				"Le canal est ici calme et sans hâte. Le village de Capestang est accessible à pied. Béziers est à courte distance à vélo vers l'est. La voûte des platanes est ininterrompue sur des kilomètres.",
			nearbyLabel: "Aux alentours",
			cyclingLabel: "Accès vélo",
			privacyNote:
				"L'emplacement exact de l'amarrage est communiqué aux locataires après confirmation de la réservation.",
			nearby: [
				{ label: "Capestang", detail: "Boulangerie, café & marché hebdomadaire — à pied" },
				{ label: "Béziers", detail: "Ville historique, marché couvert, brocante le vendredi — 20 km" },
				{ label: "Narbonne", detail: "Ville romaine, jonction du Canal du Midi — 30 km" },
				{ label: "Carcassonne", detail: "Citadelle médiévale & routes viticoles — 55 km" },
				{ label: "Colombiers", detail: "Écluses du canal, village tranquille — 8 km" },
			],
			cycling: [
				"La véloroute du Canal du Midi (EuroVelo 8) longe directement le bateau",
				"Chemin de halage plat et ombragé vers Béziers — environ 20 km, tous niveaux",
				"Vers l'ouest, les écluses de Colombiers et le Tunnel de Malpas — une journée entière",
				"Location de vélos disponible à Béziers et au village de Capestang",
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
			desc1:
				"Alles Notwendige für ein paar ruhige Tage auf dem Wasser — nichts Überflüssiges, nichts fehlt. Das Boot ist von Natur aus kompakt, aber in jeder Jahreszeit durchdacht für Komfort eingerichtet.",
			desc2:
				"Radfahrer werden besonders gut versorgt, mit sicherer Aufbewahrung und direktem Zugang zum Canal du Midi-Radweg vom Liegeplatz.",
			includedLabel: "Im Aufenthalt inbegriffen",
			items: [
				{ label: "Heizung", detail: "Diesel-Heizung für kühlere Monate" },
				{ label: "Handtücher & Bettwäsche", detail: "Für alle Gäste bereitgestellt" },
				{ label: "Küche", detail: "Herd, Backofen und Kühlschrank — selbst kochen nach Belieben" },
				{ label: "Kaffee & Tee", detail: "Kostenlos, mit einer French Press an Bord" },
				{ label: "Snacks & Getränke", detail: "Chips, etwas Süßes, kalte Biere und Mineralwasser" },
				{ label: "Fahrradaufbewahrung", detail: "Sichere Schlösser am Leinpfad" },
				{ label: "Parkplatz", detail: "Kostenlos, kurzer Fußweg vom Liegeplatz" },
				{ label: "Check-in", detail: "Ab 15:00 Uhr · Selbst-Check-in per Schlüsselbox" },
				{ label: "Check-out", detail: "Vor 11:00 Uhr" },
			],
		},
		location: {
			label: "Lage",
			heading: "Vertäut bei Capestang am Canal du Midi",
			mooringHeading: "Über den Liegeplatz",
			mooringText1:
				"La Vie En Rose liegt bei Capestang — einem kleinen Dorf am Canal du Midi, umgeben von Weinbergen und Garrigue, im Département Hérault in Südfrankreich.",
			mooringText2:
				"Der Kanal ist hier ruhig und ohne Eile. Das Dorf Capestang ist zu Fuß erreichbar. Béziers liegt eine kurze Radfahrt östlich. Das Platanendach ist kilometerlang ununterbrochen.",
			nearbyLabel: "In der Nähe",
			cyclingLabel: "Radwege",
			privacyNote:
				"Der genaue Liegeplatz wird Gästen nach Buchungsbestätigung mitgeteilt.",
			nearby: [
				{ label: "Capestang", detail: "Dorfbäckerei, Café & Wochenmarkt — zu Fuß" },
				{ label: "Béziers", detail: "Historische Stadt, überdachter Markt, Freitagsflohmarkt — 20 km" },
				{ label: "Narbonne", detail: "Römerstadt, Canal du Midi-Kreuzung — 30 km" },
				{ label: "Carcassonne", detail: "Mittelalterliche Zitadelle & Weinbergrouten — 55 km" },
				{ label: "Colombiers", detail: "Kanalschleusen, ruhiges Dorf — 8 km" },
			],
			cycling: [
				"Canal du Midi-Radweg (EuroVelo 8) verläuft direkt nebenan",
				"Flacher, schattiger Leinpfad östlich nach Béziers — ca. 20 km, für alle Niveaus",
				"Westlich Richtung Schleusen von Colombiers und Tunnel de Malpas — ein ganzer Radtag",
				"Fahrradverleih in Béziers und im Dorf Capestang verfügbar",
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
			desc1:
				"Alles wat nodig is voor een rustige paar dagen op het water — niets overbodig, niets mist. De boot is compact van aard, maar doordacht ingericht voor comfort in alle seizoenen.",
			desc2:
				"Fietsers zijn bijzonder goed voorzien, met veilige opslag en directe toegang tot het Canal du Midi-fietspad vanuit de aanlegplaats.",
			includedLabel: "Inbegrepen tijdens uw verblijf",
			items: [
				{ label: "Verwarming", detail: "Dieselverwarming voor de koelere maanden" },
				{ label: "Handdoeken & beddengoed", detail: "Verzorgd voor alle gasten" },
				{ label: "Keuken", detail: "Kookplaat, oven en koelkast — zelf koken naar wens" },
				{ label: "Koffie & thee", detail: "Gratis, met een French press aan boord" },
				{ label: "Snacks & dranken", detail: "Chips, iets zoets, koude bieren en flessenwater" },
				{ label: "Fietsopslag", detail: "Veilige slotpunten op het jaagpad" },
				{ label: "Parkeren", detail: "Gratis, op korte loopafstand van de aanlegplaats" },
				{ label: "Inchecken", detail: "Vanaf 15:00 · zelf inchecken via sleutelkluis" },
				{ label: "Uitchecken", detail: "Vóór 11:00" },
			],
		},
		location: {
			label: "Locatie",
			heading: "Aangemeerd bij Capestang aan het Canal du Midi",
			mooringHeading: "Over de aanlegplaats",
			mooringText1:
				"La Vie En Rose ligt aangemeerd bij Capestang — een klein dorp aan het Canal du Midi, omringd door wijngaarden en garrigue, in het departement Hérault in Zuid-Frankrijk.",
			mooringText2:
				"Het kanaal is hier rustig en zonder haast. Het dorp Capestang is op loopafstand. Béziers ligt een korte fietsrit naar het oosten. Het platanendak is kilometers lang ononderbroken.",
			nearbyLabel: "In de buurt",
			cyclingLabel: "Fietsmogelijkheden",
			privacyNote:
				"De exacte aanlegplaats wordt gedeeld met gasten na bevestiging van de boeking.",
			nearby: [
				{ label: "Capestang", detail: "Dorpsbakker, café & weekmarkt — op loopafstand" },
				{ label: "Béziers", detail: "Historische stad, overdekte markt, vrijdagse rommelmarkt — 20 km" },
				{ label: "Narbonne", detail: "Romeinse stad, Canal du Midi-kruispunt — 30 km" },
				{ label: "Carcassonne", detail: "Middeleeuwse citadel & wijngaardroutes — 55 km" },
				{ label: "Colombiers", detail: "Kanaalsluizen, rustig jaagpaddorp — 8 km" },
			],
			cycling: [
				"Canal du Midi-fietsroute (EuroVelo 8) loopt direct langs de boot",
				"Vlak, beschaduwd jaagpad oostwaarts naar Béziers — ca. 20 km, voor alle niveaus",
				"Westwaarts richting sluizen van Colombiers en de Tunnel de Malpas — een volledige dagrit",
				"Fietsverhuur beschikbaar in Béziers en het dorp Capestang",
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
	setLanguage: (l: Language) => void;
	translations: Translations;
}> = createContext<{
	language: Language;
	setLanguage: (l: Language) => void;
	translations: Translations;
}>({ language: "EN", setLanguage: () => { }, translations: dict.EN });

export function I18nProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguageState]: [Language, (language: Language) => void] = useState<Language>("EN");

	useEffect(() => {
		try {
			const saved: Language | null = localStorage.getItem("language") as Language | null;

			if (saved && dict[saved] !== undefined)
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
		<I18nContext.Provider value={{ language, setLanguage, translations: dict[language] }}>
			{children}
		</I18nContext.Provider>
	);
}

export function useTranslation() {
	return useContext(I18nContext);
}
