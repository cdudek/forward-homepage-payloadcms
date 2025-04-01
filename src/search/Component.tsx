'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchForm: React.FC = () => {
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') || '')
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          value={value}
          placeholder="Search"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}

export const Search: React.FC = () => {
  return (
    <React.Suspense
      fallback={
        <div>
          <form>
            <Label htmlFor="search-loading" className="sr-only">
              Search
            </Label>
            <Input id="search-loading" placeholder="Search" disabled />
            <button type="submit" className="sr-only">
              submit
            </button>
          </form>
        </div>
      }
    >
      <SearchForm />
    </React.Suspense>
  )
}
