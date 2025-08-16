import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform hover:scale-[1.03] active:scale-[0.97] w-auto",
  {
    variants: {
      variant: {
        primary: "bg-[var(--btn)] text-white shadow-lg hover:bg-[var(--btn-hover)] focus-visible:ring-[var(--btn)] hover:shadow-xl",
        secondary: "bg-black/30 text-[var(--txt)] px-6 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300 ease-in-out hover:bg-[var(--txt)]/40",
        danger: "bg-transparent text-white shadow-lg hover:bg-red-500 focus-visible:ring-red-500 hover:shadow-xl",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 py-1.5 text-xs",
        lg: "h-18 px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({
  className,
  variant,
  size,
  asChild = false,
  color,
  motionProps = {},
  children,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : motion.button

  const style = color
    ? { backgroundColor: color, ...props.style }
    : props.style;

  const defaultMotion = {
    initial: { opacity: 0, y: 10, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    whileHover: { scale: 1.04, y: -2 },
    whileTap: { scale: 0.96 },
  };

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      style={style}
      {...{ ...defaultMotion, ...motionProps }}
      {...props}
    >
      {children}
    </Comp>
  )
})

Button.displayName = "Button"

export { Button, buttonVariants }