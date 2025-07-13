import React from "react";
import { Link } from "react-router-dom";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";

/**
 * A clean, modern footer component.
 * ― Uses Tailwind for styling
 * ― Responsive grid layout (1‒4 columns)
 * ― Soft shadows + rounded corners for interactive elements
 * ― Newsletter form to capture leads
 */
const Footer: React.FC = () => {
    return (
        <footer className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-16 pb-8 w-full">
            {/* Decorative top glow */}
            <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0 blur-sm" />

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-6 grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {/* ───────────────── Brand & Store ───────────────── */}
                <div className="space-y-4">
                    <Link
                        to="/"
                        className="text-3xl font-extrabold tracking-wide text-white drop-shadow-sm"
                    >
                        E‑Market
                    </Link>
                    <p className="text-sm leading-relaxed">
                        Bole · Block 8, Addis Ababa, Ethiopia
                        <br />
                        melakuazene623@gmail.com
                        <br />
                        (+251) 918 219 856
                    </p>
                    <div className="flex space-x-3 pt-3">
                        {[
                            { icon: <FaFacebook size={18} />, href: "https://facebook.com" },
                            { icon: <FaInstagram size={18} />, href: "https://instagram.com" },
                            { icon: <FaTwitter size={18} />, href: "https://twitter.com" },
                            { icon: <FaYoutube size={18} />, href: "https://youtube.com" },
                        ].map(({ icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-2xl bg-gray-800/70 backdrop-blur-sm hover:bg-indigo-600 transition-all shadow-lg shadow-black/30"
                                aria-label="Social link"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* ───────────────── Shop ───────────────── */}
                <div>
                    <h4 className="text-lg font-semibold mb-5 text-white">Shop</h4>
                    <ul className="space-y-3 text-sm">
                        {[
                            "Computers",
                            "Tablets",
                            "Drones & Cameras",
                            "Audio",
                            "Mobile",
                            "TV & Home Cinema",
                        ].map((item) => (
                            <li key={item}>
                                <Link to="/" className="hover:text-white/80">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ───────────────── Customer Support ───────────────── */}
                <div>
                    <h4 className="text-lg font-semibold mb-5 text-white">Customer Support</h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/contact" className="hover:text-white/80">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/support/question" className="hover:text-white/80">
                                Customer Questions
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-white/80">
                                About Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* ───────────────── Policy ───────────────── */}
                <div>
                    <h4 className="text-lg font-semibold mb-5 text-white">Policy</h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/policy/shipping-returns" className="hover:text-white/80">
                                Shipping & Returns
                            </Link>
                        </li>
                        <li>
                            <Link to="/policy/terms-conditions" className="hover:text-white/80">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link to="/policy/payment-methods" className="hover:text-white/80">
                                Payment Methods
                            </Link>
                        </li>
                        <li>
                            <Link to="/faq" className="hover:text-white/80">
                                FAQ
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ───────────────── Newsletter ───────────────── */}
            <div className="max-w-4xl mx-auto px-6 pt-14">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col sm:flex-row items-center gap-4 bg-gray-800/60 rounded-2xl shadow-inner shadow-black/40 p-6 backdrop-blur-sm"
                >
                    <input
                        type="email"
                        required
                        placeholder="Join our newsletter"
                        className="flex-1 rounded-full bg-gray-900 px-5 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <button
                        type="submit"
                        className="rounded-full bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 text-sm font-semibold shadow-lg shadow-indigo-600/20"
                    >
                        Subscribe
                    </button>
                </form>
            </div>

            {/* ───────────────── Bottom bar ───────────────── */}
            <div className="mt-16 border-t border-white/10 pt-6 text-center">
                <p className="text-xs tracking-widest uppercase text-white/70">
                    &copy; {new Date().getFullYear()} E‑Market &mdash; All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
