import { ReactNode } from 'react';

type CommentIconsProps = {
  color?: string;
  icon: ReactNode;
  children?: ReactNode;
  isActive?: boolean;
};
export const CommentIcons = ({
  color,
  icon,
  children,
  isActive,
  ...props
}: CommentIconsProps) => {
  return (
    <>
      <button
        className={` flex first:mr-2 ${
          color === 'red'
            ? 'text-red-500 hover:text-red-600'
            : 'text-muted-foreground'
        } ${
          isActive && 'icon-btn-active text-red-400 hover:text-red-500'
        } w-7 first:hover:text-red-600 hover:text-blue-600 transition ease-in-out  hover:-translate-y-1 hover:scale-110  duration-300 `}
        {...props}
      >
        <span className={`${children != null ? 'mr-1' : ''} ${color || ''}`}>
          {icon}
        </span>
        {children}
      </button>
    </>
  );
};
