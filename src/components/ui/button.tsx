import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "liquid-glass-btn text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 liquid-glass-btn",
        outline:
          "liquid-glass-btn text-foreground",
        secondary:
          "liquid-glass-btn text-foreground",
        ghost: "hover:bg-muted/50 hover:text-accent-foreground backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline",
        glow: "liquid-glass-btn text-foreground shadow-[0_0_20px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]",
        hero: "liquid-glass-solid text-foreground font-semibold",
        glass: "liquid-glass-btn text-foreground",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-xl px-4",
        lg: "h-12 rounded-2xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
