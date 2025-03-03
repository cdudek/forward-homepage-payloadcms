import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []
  const socialLinks = footerData?.socialLinks || []
  const legalLinks = footerData?.legalLinks || []

  return (
    <footer className="bg-brand-dark mt-auto border-t border-border text-white">
      <div className="container py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-6">
          <div className="col-span-1 sm:col-span-1 md:col-span-1">
            <Link href="/" className="mb-4 inline-block sm:mb-0">
              <Logo />
            </Link>
          </div>

          <div className="col-span-1 sm:col-span-1 md:col-span-1">
            <div className="mb-3 text-lg font-medium sm:mb-4">Site navigation</div>
            <nav className="flex flex-col space-y-2">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className="font-light text-gray-200 transition-colors hover:text-white hover:underline"
                />
              ))}
            </nav>
          </div>

          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="mb-3 text-lg font-medium sm:mb-4">Connect with us</div>
            <nav className="flex flex-col space-y-2">
              {socialLinks.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className="font-light text-gray-200 transition-colors hover:text-white hover:underline"
                />
              ))}
            </nav>
          </div>

          <div className="hidden md:col-span-1 md:block">{/* Intentionally left empty */}</div>

          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <div className="mb-3 text-lg font-medium sm:mb-4">Subscribe</div>
            <div className="mb-3 flex w-full sm:mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-800 px-3 py-2 text-white sm:px-4"
              />
              <button className="bg-white p-2 text-black sm:p-3" aria-label="Subscribe">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
            <div className="text-xs text-gray-400 sm:text-sm">
              By subscribing you agree to with our{' '}
              <Link
                href="/privacy-policy"
                className="text-xs text-gray-200 transition-colors hover:text-white hover:underline sm:text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-4 sm:mt-12 sm:pt-6 md:mt-16">
          <div className="flex flex-col justify-between sm:flex-row">
            <div className="mb-4 flex flex-wrap gap-4 sm:mb-0 sm:gap-6">
              {legalLinks.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className="font-light text-gray-200 transition-colors hover:text-white hover:underline"
                />
              ))}
            </div>

            <div className="sm:text-md font-light text-gray-400">
              © {new Date().getFullYear()} Forward Labs. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
