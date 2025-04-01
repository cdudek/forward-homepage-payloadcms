'use client'

import React, { useState } from 'react'

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubscribe = () => {
    if (email === '') {
      setError('Please enter your email address')
    } else if (validateEmail(email)) {
      const formUrl = `https://share-eu1.hsforms.com/2HWcYnuFRSJG2As6uzTzhZg2ena7i?email=${encodeURIComponent(email)}`
      window.open(formUrl, '_blank')
      setError('')
    } else {
      setError('Please enter a valid email address')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error && (e.target.value === '' || validateEmail(e.target.value))) {
      setError('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubscribe()
    }
  }

  return (
    <div className="mb-1 w-full">
      <div className="flex w-full items-stretch">
        <input
          type="email"
          placeholder="Enter your email"
          className={`w-full border bg-gray-800 px-3 py-2 text-white outline-none transition-all duration-300 sm:px-4 ${
            error
              ? `border-fwd-red-500 focus:border-fwd-red-300 focus:[filter:drop-shadow(0_0_3px_rgba(255,0,130,0.4))] focus-visible:border-fwd-red-300 focus-visible:outline-none focus-visible:[filter:drop-shadow(0_0_3px_rgba(255,0,130,0.4))] active:border-fwd-red-300 active:[filter:drop-shadow(0_0_3px_rgba(255,0,130,0.4))]`
              : `border-transparent focus:border-fwd-purple focus:[filter:drop-shadow(0_0_3px_rgba(255,0,130,0.4))] focus-visible:border-fwd-purple focus-visible:outline-none focus-visible:[filter:drop-shadow(0_0_3px_rgba(255,0,130,0.4))] active:border-fwd-purple active:[filter:drop-shadow(0_0_3px_rgba(255,0,130,0.4))]`
          }`}
          value={email}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="flex items-center justify-center border border-transparent bg-white p-2 text-fwd-black outline-none transition-all duration-300 focus:border-fwd-purple focus:[filter:drop-shadow(0_0_3px_rgba(255,0,130,0.4))] active:border-fwd-purple active:[filter:drop-shadow(0_0_3px_rgba(255,0,130,0.4))] sm:p-3"
          aria-label="Subscribe"
          onClick={handleSubscribe}
        >
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
      <div
        className={`mt-1 h-5 overflow-hidden transition-all duration-300 ease-in-out ${
          error ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-xs text-fwd-red-500">{error}</div>
      </div>
    </div>
  )
}
