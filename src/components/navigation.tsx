"use client";

import Link from "next/link";
export function Navigation() {

  const navItems = [
    { name: "About", href: "#about" },
    { name: "News", href: "#news-section" },
    { name: "Publications", href: "#research-section" },
    { name: "Projects", href: "#projects-section" },
    { name: "CV", href: "/HadiKhalaf_CV.pdf" },
  ];

  return (
    <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-[900px] mx-auto px-6 py-3">
        <div className="flex items-center justify-start gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-black hover:text-gray-600 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
