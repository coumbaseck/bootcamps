'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Bootcamps" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-[#db4061]">Xarala</Link>
      <div className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-medium ${
              pathname === link.href ? "text-[#ff7f2a]" : "text-gray-700"
            } hover:text-[#db4061] transition`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
