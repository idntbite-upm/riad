import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Jost, Fraunces } from 'next/font/google';

// Initialize fonts
const jost = Jost({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600'],
    variable: '--font-jost',
});

const fraunces = Fraunces({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600'],
    variable: '--font-fraunces',
});

const Footer = () => {
    return (
        <footer className={`bg-[#0c0c0c] border-t border-[#1a1a1a] pt-16 pb-8 ${jost.variable} ${fraunces.variable}`}>
            <div className="max-w-[1300px] mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/images/logo.png"
                                alt="Riad Emberiza Sahari"
                                width={200}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-white/70 text-sm leading-relaxed font-jost">
                            Un havre de paix au cœur de la médina de Marrakech. Notre riad traditionnel allie authenticité, confort moderne et hospitalité marocaine.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Media Icons */}
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#d1a163] transition-colors" aria-label="Facebook">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#d1a163] transition-colors" aria-label="Instagram">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#d1a163] transition-colors" aria-label="Twitter">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </a>
                            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#d1a163] transition-colors" aria-label="Pinterest">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 0a12 12 0 00-4.373 23.178c-.035-.87-.065-2.204.014-3.154.073-.835.471-5.33.471-5.33s-.122-.243-.122-.6c0-.565.327-.987.735-.987.347 0 .514.26.514.57 0 .349-.223.868-.338 1.35-.095.405.203.736.6.736.723 0 1.277-.763 1.277-1.867 0-.975-.661-1.656-1.599-1.656-1.09 0-1.732.775-1.732 1.572 0 .311.12.644.27.821.03.36.34.95-.012.128-.111.46-.36 1.588-.36 1.588-.09.372-.3.455-.3.212 0-.659.006-1.347.01-1.97C7.383 15.21 7.999 14.25 9.5 14.25c1.862 0 3.183 1.349 3.183 3.15 0 1.89-1.063 3.396-2.635 3.396-.526 0-1.019-.273-1.188-.585 0 0-.26.987-.32 1.229-.116.444-.343.897-.552 1.246.414.122.851.189 1.302.189a6 6 0 100-12 6 6 0 000 12z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Accommodations Column */}
                    <div>
                        <h3 className={`text-white text-lg font-medium mb-4 font-fraunces`}>Hébergement</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/rooms" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Nos Chambres
                                </Link>
                            </li>
                            <li>
                                <Link href="/rooms/suite-royale" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Suite Royale
                                </Link>
                            </li>
                            <li>
                                <Link href="/rooms/chambre-deluxe" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Chambre Deluxe
                                </Link>
                            </li>
                            <li>
                                <Link href="/rooms/suite-familiale" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Suite Familiale
                                </Link>
                            </li>
                            <li>
                                <Link href="/rooms/suite-terrasse" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Suite avec Terrasse
                                </Link>
                            </li>
                            <li>
                                <Link href="/reservation" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Réservation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className={`text-white text-lg font-medium mb-4 font-fraunces`}>Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/restaurant" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Restaurant
                                </Link>
                            </li>
                            <li>
                                <Link href="/spa" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Spa & Hammam
                                </Link>
                            </li>
                            <li>
                                <Link href="/excursions" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Excursions
                                </Link>
                            </li>
                            <li>
                                <Link href="/cooking-classes" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Cours de Cuisine
                                </Link>
                            </li>
                            <li>
                                <Link href="/transfers" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Transferts
                                </Link>
                            </li>
                            <li>
                                <Link href="/entertainment" className="text-white/70 hover:text-[#d1a163] transition-colors text-sm">
                                    Soirées Folkloriques
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className={`text-white text-lg font-medium mb-4 font-fraunces`}>Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#d1a163] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span className="text-white/70 text-sm">
                                    23 Derb Khoshba Zaouia El Abbassia, Marrakech 40000 Morocco<br />
                                    ( Beside Bab Taghzout Car Park )
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#d1a163] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <span className="text-white/70 text-sm">
                                    +212 666‑619127
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#d1a163] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span className="text-white/70 text-sm">
                                    contact@riad-emberiza-sahari.com
                                </span>
                            </li>
                            <li className="pt-2">
                                <Link href="/contact" className="inline-flex items-center text-[#d1a163] text-sm group">
                                    <span>Nous Contacter</span>
                                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mt-12 md:mt-16 border-t border-[#1a1a1a] pt-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="md:w-1/2 mb-6 md:mb-0">
                            <h4 className={`text-white text-lg font-medium mb-2 font-fraunces`}>Restez informé</h4>
                            <p className="text-white/70 text-sm">
                                Inscrivez-vous pour recevoir nos offres spéciales et actualités.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Votre adresse email"
                                    className="flex-1 bg-[#161616] border border-[#2a2a2a] text-white px-4 py-2 text-sm focus:outline-none focus:border-[#d1a163]"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-[#d1a163] text-white px-5 py-2 text-sm hover:bg-amber-700 transition-colors"
                                >
                                    S'inscrire
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 md:mt-12 border-t border-[#1a1a1a] pt-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="text-white/50 text-xs mb-4 md:mb-0">
                            &copy; {new Date().getFullYear()} Riad Emberiza Sahari. Tous droits réservés.
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/privacy" className="text-white/50 hover:text-white/80 text-xs transition-colors">
                                Politique de confidentialité
                            </Link>
                            <Link href="/terms" className="text-white/50 hover:text-white/80 text-xs transition-colors">
                                Conditions générales
                            </Link>
                            <Link href="/sitemap" className="text-white/50 hover:text-white/80 text-xs transition-colors">
                                Plan du site
                            </Link>
                            <Link href="/cookies" className="text-white/50 hover:text-white/80 text-xs transition-colors">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;