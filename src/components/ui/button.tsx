import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import { ChevronRightIcon, ArrowRightIcon } from '@radix-ui/react-icons'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-semantic-background-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
        lg: 'h-11 rounded px-8',
        sm: 'h-9 rounded px-3',
        xl: 'h-12 rounded px-6',
      },
      variant: {
        primaryIcon:
          'relative bg-fwd-black text-white hover:bg-black/85 rounded-full p-[1px] before:absolute before:inset-0 before:rounded-full before:p-[1px] before:bg-gradient-to-r before:from-[#7928CA] before:to-[#FF0080] before:-z-10 hover:before:opacity-75 transition-all duration-300 group',
        primary:
          'relative bg-fwd-black text-white hover:bg-black/85 rounded-full p-[1px] before:absolute before:inset-0 before:rounded-full before:p-[1px] before:bg-gradient-to-r before:from-[#7928CA] before:to-[#FF0080] before:-z-10 hover:before:opacity-75 transition-all duration-300',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-semantic-background-secondary hover:text-semantic-text-primary',
        link: 'text-semantic-text-primary items-start justify-start underline-offset-4 hover:underline',
        outline:
          'border border-semantic-border-primary bg-semantic-background-primary hover:bg-semantic-background-secondary hover:text-semantic-text-primary rounded-2xl',
        outlineIcon:
          'border border-semantic-border-primary bg-semantic-background-primary hover:bg-semantic-background-secondary hover:text-semantic-text-primary rounded-2xl group relative',
        secondary:
          'bg-semantic-background-secondary text-semantic-text-primary hover:bg-semantic-background-secondary/80 rounded-2xl',
        secondaryIcon:
          'bg-semantic-background-secondary text-semantic-text-primary hover:bg-semantic-background-secondary/80 rounded-2xl group relative',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props}>
      {variant && ['primaryIcon', 'outlineIcon', 'secondaryIcon'].includes(variant) ? (
        <>
          <span className="relative z-10 flex items-center gap-2">
            {children}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ChevronRightIcon className="h-4 w-4 transition-opacity duration-300 group-hover:opacity-0" />
              <ArrowRightIcon className="absolute right-0 top-0 h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
          </span>
          <span
            className={cn(
              'absolute inset-0 rounded border border-transparent opacity-10 transition-opacity duration-300 group-hover:opacity-20',
              'from-brand-gradient-start via-brand-gradient-middle to-brand-gradient-end bg-gradient-to-r',
            )}
            aria-hidden="true"
          />
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
