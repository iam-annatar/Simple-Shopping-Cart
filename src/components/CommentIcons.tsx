import type { ReactNode } from "react";

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
      className={` flex first:mr-2 ${
        color === "red"
          ? "text-red-500 hover:text-red-600"
          : "text-muted-foreground"
      } ${
        isActive && "icon-btn-active text-red-400 hover:text-red-500"
      } w-7 transition duration-300 ease-in-out hover:-translate-y-1  hover:scale-110 hover:text-blue-600  first:hover:text-red-600 `}
      {...props}
    >
      <span className={`${children != null ? "mr-1" : ""} ${color || ""}`}>
        {icon}
      </span>
      {children}
    </button>
  );
};
