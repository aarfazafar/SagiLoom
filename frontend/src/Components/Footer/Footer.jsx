import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react";
import logo from '../../assets/logoNoBg.png'

const Footer = () => {
  return (
    <footer className="bg-black text-crimson px-4 py-16 font-sans">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-4 lg:px-30">
        {/* Brand Section */}
        <div className="flex flex-col justify-start">
          <div className="flex items-center mb-8">
            {/* <div className="w-14">
              <img src={logo} alt="" className="w-full" />
            </div> */}
            <h1 className="text-3xl font-serif text-[#fbf7f6]">SAGILoom</h1>
          </div>
          <p className="grotesk mb-6 leading-relaxed text-gray-400 tracking-wide text-sm">
            SAGILoom blends Indian tradition with modern style. We create premium, limited-edition ethnic wear that’s timeless, elegant, and made to stand out.
          </p>
          <div className="text-gray-400">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">MON - SAT</span>
              <span>10:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* Explore Section */}
        <div className="mt-1">
          <div className="md:ml-12 ml-0">
            <h3 className="text-lg font-semibold playfair-display tracking-wide text-white mb-6">Explore</h3>
            <ul className="space-y-3 text-gray-400 tracking-wide text-sm">
              <li><a href="/" className="hover:text-white">Shop</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-semibold playfair-display tracking-wide text-white mb-6">Contact Info</h3>
          <div className="text-gray-400 space-y-6">
            <div className="flex gap-4 items-start tracking-wide text-sm">
              <MapPin size={20} className="text-white/80 mt-1" />
              <p>
                Garhwa, Jharkhand<br />
                822114
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <Phone size={20} className="text-white/80 mt-top" />
              <p>99422 37797</p>
            </div>
            <div className="flex gap-4 items-start">
              <Mail size={20} className="text-white/80 mt-top" />
              <p>sagiloom@gmail.com </p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold playfair-display tracking-wide text-white mb-6">Newsletter</h3>
          <p className="text-gray-400 mb-6 tracking-wide text-sm">
            Join our subscribers list to get the latest news and special offers.
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-4 py-3 border border-gray-700 bg-transparent text-white rounded-md"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-white text-[#1a1d21] rounded-md hover:bg-gray-200 transition"
            >
              →
            </button>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <input type="checkbox" id="privacy" className="accent-white" />
            <label htmlFor="privacy">I agree to the Privacy Policy</label>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-screen-xl mx-auto mt-12 pt-8 border-t border-gray-600 flex flex-col sm:flex-row justify-between items-center text-gray-600 px-4">
        <p className="text-center text-sm sm:text-left mb-4 sm:mb-0">
          © Copyright 2025 SAGILoom. All Rights Reserved
        </p>
        <div className="flex gap-4">
          {/* You can update or remove other social icons if not needed */}
          <a href="https://www.instagram.com/_sagiloom?igsh=MWxydTh0N2RqMGIzcg==" aria-label="Instagram" className="hover:text-white" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
          <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={20} /></a>
          <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter size={20} /></a>
          <a href="#" aria-label="Youtube" className="hover:text-white"><Youtube size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
