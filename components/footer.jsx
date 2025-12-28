"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Don't show footer on auth pages
  const isAuthPage =
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up");

  if (isAuthPage) return null;

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        
        {/* Top Section */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Capitize
            </h3>
            <p className="text-sm text-gray-600">
              AI-powered financial management platform for modern businesses and individuals.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#features" className="transition-colors hover:text-gray-900">
                  Features
                </a>
              </li>
              <li>
                <a href="#testimonials" className="transition-colors hover:text-gray-900">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="/dashboard" className="transition-colors hover:text-gray-900">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="https://www.linkedin.com/in/aryan-bhargava-0927b8316/"
                  className="transition-colors hover:text-gray-900"
                >
                  About us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          © 2025 Capitize. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
