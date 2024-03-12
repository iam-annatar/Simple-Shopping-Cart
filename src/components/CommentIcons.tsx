import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CommentIconsProps {
  color?: string;
  icon: ReactNode;
  children?: ReactNode;
  isActive?: boolean;
}

export const CommentIcons = ({
  color,
  icon,
  children,
  isActive,
  ...props
}: CommentIconsProps) => {
  return (
    <button
      className={twMerge(
        "flex first:mr-2",
        "w-7 transition-all duration-500 ease-in-out hover:text-blue-600 first:hover:text-muted-foreground ",
        color === "red"
          ? "text-red-500 hover:text-red-600"
          : "text-muted-foreground",
        isActive && "icon-btn-active text-red-400 hover:text-red-500",
      )}
      {...props}
    >
      <span className={twMerge(children != null ? "mr-1" : "", color || "")}>
        {icon}
      </span>
      {children}
    </button>
  );
};
