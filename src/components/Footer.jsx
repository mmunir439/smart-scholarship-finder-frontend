"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#0b1d3a] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                    {/* Left */}
                    <div>
                        <h2 className="text-lg font-bold mb-3">
                            🎓 <span>Scholar</span>
                            <span className="text-orange-500">Path</span>
                        </h2>

                        <p className="text-gray-300 mb-6">
                            Empowering Pakistani students to reach the world.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {[
                                {
                                    icon: <FaFacebookF />,
                                    link: "https://www.facebook.com/profile.php?id=100085467492304",
                                },
                                {
                                    icon: <FaTwitter />,
                                    link: "https://github.com/mmunir439",
                                },
                                {
                                    icon: <FaInstagram />,
                                    link: "https://github.com/mmunir439",
                                },
                                {
                                    icon: <FaLinkedinIn />,
                                    link: "https://www.linkedin.com/in/munirdev",
                                },
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center border border-gray-500 rounded-full hover:border-orange-500 hover:text-orange-400 hover:bg-white/5 transition"
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div> {/* ✅ FIX: closed left section */}

                    {/* Explore */}
                    <div>
                        <h3 className="text-orange-500 font-semibold mb-4">EXPLORE</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="hover:text-orange-400 cursor-pointer">Scholarships</li>
                            <li className="hover:text-orange-400 cursor-pointer">How It Works</li>
                            <li className="hover:text-orange-400 cursor-pointer">Get Started</li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-orange-500 font-semibold mb-4">COMPANY</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="hover:text-orange-400 cursor-pointer">About</li>
                            <li className="hover:text-orange-400 cursor-pointer">Contact</li>
                            <li className="hover:text-orange-400 cursor-pointer">Privacy</li>
                        </ul>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-gray-600 pt-6 text-center text-gray-400 text-sm">
                    © 2026 ScholarPath. All rights reserved.
                </div>

            </div>
        </footer>
    );
}