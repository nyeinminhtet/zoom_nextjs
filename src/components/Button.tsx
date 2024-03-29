import React, { ButtonHTMLAttributes, FC } from "react";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<Props> = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 rounded-full bg-blue-500 px-3 py-2 font-semibold text-white transition-colors hover:bg-blue-600 active:bg-blue-600 disabled:bg-gray-200",
        className,
      )}
      {...props}
    />
  );
};

export default Button;
