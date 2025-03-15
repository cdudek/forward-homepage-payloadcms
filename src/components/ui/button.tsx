import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import { ChevronRightIcon, ArrowRightIcon } from '@radix-ui/react-icons'

// Extract constants for reuse
const BORDER_RADIUS = 'rounded-2xl'
const GRADIENT_CLASSES = 'bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange'

// Common button base styles without noFill variants
const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap relative ${BORDER_RADIUS} text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-semantic-background-primary disabled:pointer-events-none disabled:opacity-50`,
  {
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },

    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 px-8',
        sm: 'h-9 px-3',
        xl: 'h-12 px-6',
      },
      variant: {
        primary: 'text-white overflow-hidden',
        primaryIcon: 'text-white overflow-hidden group',
        // TODO: Add https://play.tailwindcss.com/9LSkQgkY7p
        // https://www.npmjs.com/package/tailwindcss-border-gradient-radius
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-semantic-background-secondary hover:text-semantic-text-primary',
        link: 'text-semantic-text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: `border border-semantic-border-primary bg-semantic-background-primary hover:bg-semantic-background-secondary hover:text-semantic-text-primary`,
        outlineIcon: `border border-semantic-border-primary bg-semantic-background-primary hover:bg-semantic-background-secondary hover:text-semantic-text-primary group`,
        secondary: 'text-white overflow-hidden hover:opacity-90 transition-opacity',
        secondaryIcon: 'text-white overflow-hidden hover:opacity-90 transition-opacity group',
      },
    },
  },
)

// Fill style classes for each variant
const fillStyles = {
  primary: {
    filled: `p-[1px] before:absolute before:inset-[1px] before:bg-fwd-black before:${BORDER_RADIUS} before:content-[""] before:z-[0] [&>*]:relative [&>*]:z-[1]`,
    outline: `bg-transparent before:absolute before:inset-0 before:${BORDER_RADIUS} before:p-[1px] before:${GRADIENT_CLASSES} before:-z-10 hover:before:opacity-75`,
    // filled: `p-[1px] ${GRADIENT_CLASSES} before:absolute before:inset-[1px] before:bg-fwd-black before:${BORDER_RADIUS} before:content-[""] before:z-[0] [&>*]:relative [&>*]:z-[1]`,
    // outline: `bg-transparent before:absolute before:inset-0 before:${BORDER_RADIUS} before:p-[1px] before:${GRADIENT_CLASSES} before:-z-10 hover:before:opacity-75`,
  },
  primaryIcon: {
    filled: `p-[1px] ${GRADIENT_CLASSES} before:absolute before:inset-[1px] before:bg-fwd-black before:${BORDER_RADIUS} before:content-[""] before:z-[0] [&>*]:relative [&>*]:z-[1]`,
    outline: `bg-transparent before:absolute before:inset-0 before:${BORDER_RADIUS} before:p-[1px] before:${GRADIENT_CLASSES} before:-z-10 hover:before:opacity-75`,
  },
  secondary: {
    filled: GRADIENT_CLASSES,
    outline: `border border-transparent before:absolute before:inset-0 before:${BORDER_RADIUS} before:${GRADIENT_CLASSES} before:opacity-10 hover:before:opacity-20 before:-z-10`,
  },
  secondaryIcon: {
    filled: GRADIENT_CLASSES,
    outline: `border border-transparent before:absolute before:inset-0 before:${BORDER_RADIUS} before:${GRADIENT_CLASSES} before:opacity-10 hover:before:opacity-20 before:-z-10`,
  },
  outline: {
    filled: '',
    outline: '',
  },
  outlineIcon: {
    filled: '',
    outline: '',
  },
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  noFill?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size = 'default',
  variant = 'primary',
  noFill = false,
  ref,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'

  // Determine if this is an icon button variant
  const isIconVariant = variant && ['primaryIcon', 'outlineIcon', 'secondaryIcon'].includes(variant)

  // Determine if this needs special content handling for z-index
  const needsZIndexedContent = [
    'primary',
    'secondary',
    'primaryIcon',
    'secondaryIcon',
    'outline',
    'outlineIcon',
  ].includes(variant as string)

  // Get the base variant name (without "Icon" suffix)
  const baseVariant =
    isIconVariant && (variant as string).endsWith('Icon')
      ? (variant as string).replace('Icon', '')
      : variant

  // Get fill styles if available for this variant or fall back to the base variant
  const variantToUse = variant as keyof typeof fillStyles
  const baseVariantToUse = baseVariant as keyof typeof fillStyles

  // First check for exact variant match, then fall back to base variant if needed
  const variantFillStyles = fillStyles[variantToUse] || fillStyles[baseVariantToUse]
  const fillStyle = variantFillStyles
    ? noFill
      ? variantFillStyles.outline
      : variantFillStyles.filled
    : ''

  // Use base variant for class name in icon variants while keeping the 'group' class
  const effectiveVariant = isIconVariant ? (baseVariant as typeof variant) : variant

  return (
    <Comp
      className={cn(
        buttonVariants({ className, size, variant: effectiveVariant }),
        fillStyle,
        isIconVariant ? 'group' : '',
      )}
      ref={ref}
      {...props}
    >
      {isIconVariant ? (
        <span className="relative z-10 inline-flex w-full items-center justify-center gap-2">
          {children}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ChevronRightIcon className="h-4 w-4 transition-opacity duration-300 group-hover:opacity-0" />
            <ArrowRightIcon className="absolute right-0 top-0 h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
        </span>
      ) : needsZIndexedContent ? (
        <span className="relative z-10">{children}</span>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
