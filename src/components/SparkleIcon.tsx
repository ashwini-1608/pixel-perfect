import { cn } from "@/lib/utils";

interface SparkleIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const SparkleIcon = ({ size = 16, color = "#F5C518", className }: SparkleIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={cn("animate-sparkle-pulse", className)}
  >
    <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
  </svg>
);

export default SparkleIcon;
