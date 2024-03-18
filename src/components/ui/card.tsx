import { useText } from "@/hooks/useText";
import { cn } from "@/lib/utils";
import { Flag, Heart } from "lucide-react";
import * as React from "react";
import { incrementPostReportCount } from "@/lib/updatePost";

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
    defaultFlagState?: boolean;
    reportCount: number;
  }
>(
  (
    {
      children,
      className,
      onHeartClick,
      onFlagClick,
      defaultHeartState,
      defaultFlagState,
      reportCount: initialReportCount,
      ...props
    },
    ref,
  ) => {
    const [isHeartRed, setIsHeartRed] = React.useState(defaultHeartState);
    const [isFlagFilled, setIsFlagFilled] = React.useState(defaultFlagState);
    const [flagTextVisible, setFlagTextVisible] = React.useState(false);
    const [localReportCount, setLocalReportCount] =
      React.useState(initialReportCount);
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
        if (name == "admin") {
          setLocalReportCount((current) => current + 3);
        } else {
          setLocalReportCount((current) => current + 1);
        }
      }
    };

    const handleFlagMouseDown = () => {
      setIsFlagFilled(true);
      setFlagTextVisible(true);

      setTimeout(() => {
        setFlagTextVisible(false);
      }, 2000);
    };

    const handleFlagMouseUp = () => {
      setIsFlagFilled(false);
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
            <Heart
              className={cn(
                { "fill-red-500": isHeartRed },
                "transition-colors hover:border-opacity-100 hover:bg-primary/10",
                className,
              )}
            />
          </button>
        </span>

        <button
          onClick={handleFlagClick}
          onMouseDown={handleFlagMouseDown}
          onMouseUp={handleFlagMouseUp}
          onMouseLeave={handleFlagMouseUp}
          className="transform px-4 py-3 text-red-500 outline-none transition-transform active:scale-75"
        >
          <Flag
            className={cn(
              { "fill-red-500": isFlagFilled },
              "transition-colors hover:border-opacity-100 hover:bg-primary/10",
              className,
            )}
          />
          <span className=" text-lg text-black">{localReportCount}</span>
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
