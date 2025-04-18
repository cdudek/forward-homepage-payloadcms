import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        gradient: 'gradient 3s linear infinite',
        indeterminate1: 'indeterminate1 1.5s infinite cubic-bezier(0.65, 0.815, 0.735, 0.395)',
        indeterminate2: 'indeterminate2 1.5s infinite cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        semantic: {
          background: {
            primary: 'hsl(var(--semantic-background-primary))',
            secondary: 'hsl(var(--semantic-background-secondary))',
            tertiary: 'hsl(var(--semantic-background-tertiary))',
          },
          text: {
            primary: 'hsl(var(--semantic-text-primary))',
            secondary: 'hsl(var(--semantic-text-secondary))',
            tertiary: 'hsl(var(--semantic-text-tertiary))',
            inactive: 'hsl(var(--semantic-text-inactive))',
            'alternate-primary': 'hsl(var(--semantic-text-alternate-primary))',
            'alternate-secondary': 'hsl(var(--semantic-text-alternate-secondary))',
          },
          border: {
            primary: 'hsl(var(--semantic-border-primary))',
          },
        },

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        /* Brand Colors */
        'fwd-purple': {
          DEFAULT: 'var(--color-fwd-purple)',
          50: 'var(--color-fwd-purple-50)',
          100: 'var(--color-fwd-purple-100)',
          200: 'var(--color-fwd-purple-200)',
          300: 'var(--color-fwd-purple-300)',
          400: 'var(--color-fwd-purple-400)',
          500: 'var(--color-fwd-purple-500)',
          600: 'var(--color-fwd-purple-600)',
          700: 'var(--color-fwd-purple-700)',
          800: 'var(--color-fwd-purple-800)',
          900: 'var(--color-fwd-purple-900)',
          950: 'var(--color-fwd-purple-950)',
        },
        'fwd-lipstick': {
          DEFAULT: 'var(--color-fwd-lipstick)',
          50: 'var(--color-fwd-lipstick-50)',
          100: 'var(--color-fwd-lipstick-100)',
          200: 'var(--color-fwd-lipstick-200)',
          300: 'var(--color-fwd-lipstick-300)',
          400: 'var(--color-fwd-lipstick-400)',
          500: 'var(--color-fwd-lipstick-500)',
          600: 'var(--color-fwd-lipstick-600)',
          700: 'var(--color-fwd-lipstick-700)',
          800: 'var(--color-fwd-lipstick-800)',
          900: 'var(--color-fwd-lipstick-900)',
          950: 'var(--color-fwd-lipstick-950)',
        },
        'fwd-red': {
          DEFAULT: 'var(--color-fwd-red)',
          50: 'var(--color-fwd-red-50)',
          100: 'var(--color-fwd-red-100)',
          200: 'var(--color-fwd-red-200)',
          300: 'var(--color-fwd-red-300)',
          400: 'var(--color-fwd-red-400)',
          500: 'var(--color-fwd-red-500)',
          600: 'var(--color-fwd-red-600)',
          700: 'var(--color-fwd-red-700)',
          800: 'var(--color-fwd-red-800)',
          900: 'var(--color-fwd-red-900)',
          950: 'var(--color-fwd-red-950)',
        },

        'fwd-coral-red': {
          DEFAULT: 'var(--color-fwd-coral-red)',
          50: 'var(--color-fwd-coral-red-50)',
          100: 'var(--color-fwd-coral-red-100)',
          200: 'var(--color-fwd-coral-red-200)',
          300: 'var(--color-fwd-coral-red-300)',
          400: 'var(--color-fwd-coral-red-400)',
          500: 'var(--color-fwd-coral-red-500)',
          600: 'var(--color-fwd-coral-red-600)',
          700: 'var(--color-fwd-coral-red-700)',
          800: 'var(--color-fwd-coral-red-800)',
          900: 'var(--color-fwd-coral-red-900)',
          950: 'var(--color-fwd-coral-red-950)',
        },
        'fwd-orange': {
          DEFAULT: 'var(--color-fwd-orange)',
          50: 'var(--color-fwd-orange-50)',
          100: 'var(--color-fwd-orange-100)',
          200: 'var(--color-fwd-orange-200)',
          300: 'var(--color-fwd-orange-300)',
          400: 'var(--color-fwd-orange-400)',
          500: 'var(--color-fwd-orange-500)',
          600: 'var(--color-fwd-orange-600)',
          700: 'var(--color-fwd-orange-700)',
          800: 'var(--color-fwd-orange-800)',
          900: 'var(--color-fwd-orange-900)',
          950: 'var(--color-fwd-orange-950)',
        },
        /* Neutral Colors */
        'fwd-black': {
          DEFAULT: 'var(--color-fwd-black)',
          50: 'var(--color-fwd-black-50)',
          100: 'var(--color-fwd-black-100)',
          200: 'var(--color-fwd-black-200)',
          300: 'var(--color-fwd-black-300)',
          400: 'var(--color-fwd-black-400)',
          500: 'var(--color-fwd-black-500)',
          600: 'var(--color-fwd-black-600)',
          700: 'var(--color-fwd-black-700)',
          800: 'var(--color-fwd-black-800)',
          900: 'var(--color-fwd-black-900)',
          950: 'var(--color-fwd-black-950)',
        },
        'fwd-white': {
          DEFAULT: 'var(--color-fwd-white)',
          50: 'var(--color-fwd-white-50)',
          100: 'var(--color-fwd-white-100)',
          200: 'var(--color-fwd-white-200)',
          300: 'var(--color-fwd-white-300)',
          400: 'var(--color-fwd-white-400)',
          500: 'var(--color-fwd-white-500)',
        },
        'fwd-grey': {
          DEFAULT: 'var(--color-fwd-grey)',
          50: 'var(--color-fwd-grey-50)',
          100: 'var(--color-fwd-grey-100)',
          200: 'var(--color-fwd-grey-200)',
          300: 'var(--color-fwd-grey-300)',
          400: 'var(--color-fwd-grey-400)',
          500: 'var(--color-fwd-grey-500)',
          600: 'var(--color-fwd-grey-600)',
          700: 'var(--color-fwd-grey-700)',
          800: 'var(--color-fwd-grey-800)',
          900: 'var(--color-fwd-grey-900)',
          950: 'var(--color-fwd-grey-950)',
        },

        /* System Colors */
        success: {
          DEFAULT: 'hsl(var(--color-success))',
          light: 'hsl(var(--color-success-light))',
        },
        error: {
          DEFAULT: 'hsl(var(--color-error))',
          light: 'hsl(var(--color-error-light))',
        },
        /* Legacy Colors - mapped to new system */
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        warning: 'hsl(var(--warning))',
        /* Legacy Brand colors */

        gradient: {
          start: 'hsl(var(--brand-gradient-start))',
          middle: 'hsl(var(--brand-gradient-middle))',
          end: 'hsl(var(--brand-gradient-end))',
        },
      },
      fontFamily: {
        fustat: ['var(--font-fustat)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        indeterminate1: {
          '0%': { left: '-35%', right: '100%' },
          '60%': { left: '100%', right: '-90%' },
          '100%': { left: '100%', right: '-90%' },
        },
        indeterminate2: {
          '0%': { left: '-200%', right: '100%' },
          '60%': { left: '107%', right: '-8%' },
          '100%': { left: '107%', right: '-8%' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontSize: '2.5rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h2: {
                fontSize: '2.25rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h3: {
                fontSize: '1.75rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h4: {
                fontSize: '1.5rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h5: {
                fontSize: '1.25rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h6: {
                fontSize: '1.125rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              p: {
                fontSize: '1.125rem',
                fontWeight: 300,
                lineHeight: '1.5',
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              div: {
                fontSize: '1.125rem',
                fontWeight: 300,
              },
              a: {
                fontWeight: 300,
              },
              ul: {
                paddingLeft: '0.0rem',
              },
              li: {
                fontSize: '1.125rem',
                fontWeight: 300,
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h2: {
                fontSize: '2.25rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h3: {
                fontSize: '1.75rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h4: {
                fontSize: '1.5rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h5: {
                fontSize: '1.25rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h6: {
                fontSize: '1.125rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              p: {
                fontSize: '1.125rem',
                fontWeight: 300,
                lineHeight: '1.5',
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              div: {
                fontSize: '1.125rem',
                fontWeight: 300,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              a: {
                fontWeight: 300,
              },
              ul: {
                paddingLeft: '0.0rem',
              },
              li: {
                fontSize: '1.125rem',
                fontWeight: 300,
              },
            },
          ],
        },

        sm: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h2: {
                fontSize: '2.25rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h3: {
                fontSize: '1.75rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h4: {
                fontSize: '1.5rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h5: {
                fontSize: '1.25rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h6: {
                fontSize: '1.125rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              p: {
                fontSize: '1.125rem',
                fontWeight: 300,
                lineHeight: '1.5',
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              div: {
                fontSize: '1.125rem',
                fontWeight: 300,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              a: {
                fontWeight: 300,
              },
              ul: {
                paddingLeft: '0.0rem',
              },
              li: {
                fontSize: '1.125rem',
                fontWeight: 300,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '4.25rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h2: {
                fontSize: '3.25rem',
                fontWeight: 600,
                lineHeight: 1.3,
                paddingBottom: '1rem',
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h3: {
                fontSize: '2.375rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h4: {
                fontSize: '1.75rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h5: {
                fontSize: '1.5rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h6: {
                fontSize: '1.3125rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              p: {
                fontSize: '1.25rem',
                fontWeight: 300,
                lineHeight: '1.5',
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              div: {
                fontSize: '1.25rem',
                fontWeight: 300,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              a: {
                fontWeight: 300,
              },
              ul: {
                paddingLeft: '0.0rem',
              },
              li: {
                fontSize: '1.25rem',
                fontWeight: 300,
              },
            },
          ],
        },
        lg: {
          css: [
            {
              h1: {
                fontSize: '6.0rem',
                paddingBottom: '1rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h2: {
                fontSize: '4.25rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h3: {
                fontSize: '3.25rem',
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h4: {
                fontSize: '2.25rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h5: {
                fontSize: '1.75rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              h6: {
                fontSize: '1.5rem',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              p: {
                fontSize: '1.25rem',
                fontWeight: 300,
                lineHeight: '1.5',
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              div: {
                fontSize: '1.25rem',
                fontWeight: 300,
                marginBottom: '0.25rem',
                marginTop: '0.25rem',
              },
              a: {
                fontWeight: 300,
              },
              ul: {
                paddingLeft: '0.0rem',
              },
              li: {
                fontSize: '1.25rem',
                fontWeight: 300,
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
