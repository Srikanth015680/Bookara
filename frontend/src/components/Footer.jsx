import React from 'react'
import { FOOTER_LINKS, FOOTER_CONTACT_INFO, SOCIALS } from '../assets/data'

const Footer = () => {
  return (
    <footer className="bg-gray-900 rounded-xl mb-2 text-gray-300 mt-20" >

      {/* Top Section */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

        {/* Links */}
        {FOOTER_LINKS.map((section, index) => (
          <div key={index}>
            <h4 className="text-white font-semibold mb-4 text-lg">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-sm hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">
            {FOOTER_CONTACT_INFO.title}
          </h4>
          <ul className="space-y-2">
            {FOOTER_CONTACT_INFO.links.map((item, i) => (
              <li key={i} className="text-sm">
                <span className="font-medium text-gray-400">
                  {item.label}:
                </span>{" "}
                {item.value}
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">
            {SOCIALS.title}
          </h4>
          <div className="flex gap-4">
            {SOCIALS.links.map((social, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-white hover:text-black transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Bookara. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer