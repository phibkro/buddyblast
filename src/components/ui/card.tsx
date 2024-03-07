import { useText } from "@/hooks/useText";
import { cn } from "@/lib/utils";
import { Flag, Heart } from "lucide-react";
import * as React from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    children?: React.ReactNode;
    onHeartClick?: () => void;
    onFlagClick?: () => void;
    defaultHeartState?: boolean;
  }
>(
  (
    {
      children,
      className,
      onHeartClick,
      onFlagClick,
      defaultHeartState,
      ...props
    },
    ref,
  ) => {
    const [isHeartRed, setIsHeartRed] = React.useState(defaultHeartState);
    console.log(defaultHeartState);
    const [name] = useText("name");

    const handleHeartClick = () => {
      if (name) {
        setIsHeartRed(!isHeartRed);
        if (onHeartClick) {
          onHeartClick();
        }
      }
    };

    const handleFlagClick = () => {
      if (onFlagClick) {
        onFlagClick();
      }
    };

    return (
      <h3
        ref={ref}
        className={cn(
          "flex items-center justify-between text-2xl font-semibold leading-none tracking-tight",
          className,
        )}
        {...props}
      >
        <span className="flex items-center">
          {children}
          <button
            onClick={handleHeartClick}
            className="ml-2 focus:outline-none"
          >
            <Heart className={cn({ "fill-red-500": isHeartRed })} />
          </button>
        </span>
        <button
          onClick={handleFlagClick}
          className="inline-flex items-center focus:outline-none"
        >
          <Flag />
        </button>
      </h3>
    );
  },
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
