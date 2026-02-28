//=== Imports ===
import Link from "next/link";
import Image from "next/image";

//=== Footer Links Data ===
const footerLinks = {
  company: [
    { label: "About Us", href: "/" },
    { label: "Contact", href: "/" },
    { label: "Careers", href: "/" },
  ],
  resources: [
    { label: "Blog", href: "/" },
    { label: "Help Center", href: "/" },
    { label: "FAQ", href: "/" },
  ],
};

//=== Footer Component ===
const Footer = () => {
  return (
    <footer className="bg-[#202430] text-white">
      <div className="site-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {/* === Brand Column === */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/Images/logo.png"
                alt="QuickHire Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-white">QuickHire</span>
            </Link>
            <p className="text-[#7C8493] text-sm leading-relaxed max-w-xs">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>
          </div>

          {/* === Company Links Column === */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#7C8493] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === Resources Links Column === */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">
              Resources
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#7C8493] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* === Footer Bottom Bar === */}
        <div className="border-t border-[#2C2F3F] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#7C8493] text-sm">
            © 2025 QuickHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
