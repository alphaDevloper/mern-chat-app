import React from "react";

const Button = React.forwardRef(
  (
    {
      children,
      variant = "default",
      size = "default",
      className = "",
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default:
        "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-900",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
      outline:
        "border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-900 focus-visible:ring-slate-900",
      secondary:
        "bg-slate-200 text-slate-900 hover:bg-slate-300 focus-visible:ring-slate-900",
      ghost: "hover:bg-slate-100 text-slate-900 focus-visible:ring-slate-900",
      link: "text-slate-900 underline-offset-4 hover:underline focus-visible:ring-slate-900",
      success:
        "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600",
      warning:
        "bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-500",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    };

    const variantClass = variants[variant] || variants.default;
    const sizeClass = sizes[size] || sizes.default;

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
