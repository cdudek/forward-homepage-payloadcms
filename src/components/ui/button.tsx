'use client'

import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import { ArrowRightIcon } from '@radix-ui/react-icons'

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap relative text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-semantic-background-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer w-auto`,
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
        primary: 'text-white overflow-hidden rounded-3xl',
        primaryIcon: 'text-white overflow-hidden group rounded-3xl',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost:
          'hover:bg-semantic-background-secondary hover:text-semantic-text-primary rounded-3xl',
        link: 'text-semantic-text-primary items-start justify-start hover:underline underline-offset-8 underline-transparent transition-all duration-300',
        linkLight:
          "text-semantic-text-primary items-start justify-start relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-fwd-black after:transition-all after:duration-300",
        linkDark:
          "text-semantic-text-primary items-start justify-start relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-300",
        linkGradient:
          "text-semantic-text-primary items-start justify-start relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-fwd-purple after:via-fwd-red after:to-fwd-orange after:transition-all after:duration-300",
        nav: 'text-semantic-text-primary items-start justify-start',
        outline: `border border-white text-white bg-transparent hover:bg-white/10 rounded-3xl`,
        outlineIcon: `border border-white text-white bg-transparent hover:bg-white/10 group rounded-3xl`,
        outlineDark: `border border-fwd-black text-fwd-black bg-white hover:bg-fwd-black/20 active:bg-fwd-black/30 transition-all duration-300 rounded-3xl`,
        outlineDarkIcon: `border border-fwd-black text-fwd-black bg-white hover:bg-fwd-black/20 active:bg-fwd-black/30 group transition-all duration-300 rounded-3xl`,
        secondary: 'text-white overflow-hidden hover:opacity-90 transition-opacity rounded-3xl',
        secondaryIcon:
          'text-white overflow-hidden hover:opacity-90 transition-opacity group rounded-3xl',
      },
    },
  },
)

const GRADIENT_CLASSES = 'bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange'

const fillStyles = {
  primary: {
    filled: `p-0 ${GRADIENT_CLASSES} transition-all duration-300
      after:absolute after:rounded-3xl after:inset-[1px] after:bg-fwd-black after:content-[""] after:z-[0] 
      [&>*]:relative [&>*]:z-[1]
      active:after:inset-shadow-md
      transition-all
      duration-300 ease-in-out
      after:transition-opacity after:duration-300
      hover:after:opacity-80
      active:after:opacity-70`,
    outline: `relative bg-transparent p-0 border-0 transition-all duration-300 
      before:absolute before:inset-0 before:rounded-3xl before:${GRADIENT_CLASSES} before:z-[-1] 
      after:absolute after:rounded-3xl after:inset-[1px] after:bg-transparent after:content-[""] after:z-[0] 
      [&>*]:relative [&>*]:z-[1]
      before:transition-opacity before:duration-300
      transition-all
      duration-300 ease-in-out
      hover:before:opacity-90
      active:before:opacity-80`,
  },
  primaryIcon: {
    filled: `p-0 ${GRADIENT_CLASSES} transition-all duration-300
      after:absolute after:rounded-3xl after:inset-[1px] after:bg-fwd-black after:content-[""] after:z-[0] 
      [&>*]:relative [&>*]:z-[1]
      
      transition-all
      duration-300 ease-in-out
      active:after:inset-shadow-md
      after:transition-opacity after:duration-300
      hover:after:opacity-80
      active:after:opacity-70`,
    outline: `relative bg-transparent p-0 border-0 transition-all duration-300 
      before:absolute before:inset-0 before:rounded-3xl before:${GRADIENT_CLASSES} before:z-[-1] 
      after:absolute after:rounded-3xl after:inset-[1px] after:bg-transparent after:content-[""] after:z-[0] 
      [&>*]:relative [&>*]:z-[1]
      before:transition-opacity before:duration-300
      transition-all
      duration-300 ease-in-out
      hover:before:opacity-90
      active:before:opacity-80`,
  },
  secondary: {
    filled: `${GRADIENT_CLASSES} hover:brightness-110 active:brightness-125 transition-all duration-300`,
    outline: `relative bg-transparent p-0 border-0 transition-all duration-300 
      before:absolute before:inset-0 before:rounded-3xl before:${GRADIENT_CLASSES} before:z-[-1] before:opacity-10 
      hover:before:opacity-20 active:before:opacity-30 before:transition-opacity before:duration-300 
      after:absolute after:rounded-3xl after:inset-[1px] after:bg-semantic-background-primary after:content-[""] after:z-[0] 
      [&>*]:relative [&>*]:z-[1]`,
  },
  secondaryIcon: {
    filled: `${GRADIENT_CLASSES} hover:brightness-110 active:brightness-125 transition-all duration-300`,
    outline: `relative bg-transparent p-0 border-0 transition-all duration-300 
      before:absolute before:inset-0 before:rounded-3xl before:${GRADIENT_CLASSES} before:z-[-1] before:opacity-10 
      hover:before:opacity-20 active:before:opacity-30 before:transition-opacity before:duration-300 
      after:absolute after:rounded-3xl after:inset-[1px] after:bg-semantic-background-primary after:content-[""] after:z-[0] 
      [&>*]:relative [&>*]:z-[1]`,
  },
  outline: {
    filled: 'transition-all duration-300 ease-in-out',
    outline: 'transition-all duration-300 ease-in-out',
  },
  outlineIcon: {
    filled: 'transition-all duration-300 ease-in-out',
    outline: 'transition-all duration-300 ease-in-out',
  },
  outlineDark: {
    filled: `border border-fwd-black text-fwd-black bg-white hover:bg-fwd-black/20 active:bg-fwd-black/30 transition-all duration-300`,
    outline: 'transition-all duration-300 ease-in-out',
  },
  outlineDarkIcon: {
    filled: `border border-fwd-black text-fwd-black bg-white hover:bg-fwd-black/20 active:bg-fwd-black/30 transition-all duration-300`,
    outline: 'transition-all duration-300 ease-in-out',
  },
  linkLight: {
    filled: 'after:bg-fwd-black',
    outline: 'after:bg-fwd-black',
  },
  linkDark: {
    filled: 'after:bg-white',
    outline: 'after:bg-white',
  },
  linkGradient: {
    filled: 'after:bg-gradient-to-r after:from-fwd-purple after:via-fwd-red after:to-fwd-orange',
    outline: 'after:bg-gradient-to-r after:from-fwd-purple after:via-fwd-red after:to-fwd-orange',
  },
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  noFill?: boolean
  ref?: React.Ref<HTMLButtonElement>
  persistHover?: boolean
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size = 'default',
  variant = 'primary',
  noFill = false,
  ref,
  children,
  persistHover = false,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  const [isHovered, setIsHovered] = React.useState(false)
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const isIconVariant =
    variant && ['primaryIcon', 'outlineIcon', 'secondaryIcon', 'outlineDarkIcon'].includes(variant)

  const isLinkVariant = variant && ['linkLight', 'linkDark', 'linkGradient'].includes(variant)

  const needsZIndexedContent = [
    'primary',
    'secondary',
    'primaryIcon',
    'secondaryIcon',
    'outline',
    'outlineIcon',
    'outlineDark',
    'outlineDarkIcon',
  ].includes(variant as string)

  const baseVariant =
    isIconVariant && (variant as string).endsWith('Icon')
      ? (variant as string).replace('Icon', '')
      : variant

  const variantToUse =
    fillStyles[variant as keyof typeof fillStyles] ||
    fillStyles[baseVariant as keyof typeof fillStyles]
  const fillStyle = variantToUse ? (noFill ? variantToUse.outline : variantToUse.filled) : ''

  const effectiveVariant = isIconVariant ? (baseVariant as typeof variant) : variant

  // Handle hover with exit delay for link variants
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (isLinkVariant) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false)
      }, 100)
    } else {
      setIsHovered(false)
    }
  }

  // Clean up timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  // Link hover state classes
  const linkHoverStateClass = isLinkVariant
    ? isHovered || persistHover
      ? 'after:w-full'
      : 'after:w-0 hover:after:w-full'
    : ''

  return (
    <Comp
      className={cn(
        buttonVariants({ className, size, variant: effectiveVariant }),
        fillStyle,
        isIconVariant ? 'group' : '',
        linkHoverStateClass,
      )}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {isIconVariant ? (
        <span className="relative z-10 inline-flex items-center justify-center gap-2 py-2 pl-8 pr-6">
          {children}
          <ArrowRightIcon className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
        </span>
      ) : needsZIndexedContent ? (
        <span className="relative z-10 inline-flex items-center justify-center px-8 py-2 leading-none">
          {children}
        </span>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
