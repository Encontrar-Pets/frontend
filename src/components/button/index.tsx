type ButtonProps = {
  label: string;
  onClick: (e: any) => any | void;
  className?: string;
  type?: "filled" | "outline" | "text";
  variant?: "primary" | "secondary" | "tertiary";
};

export default function Button({
  label,
  onClick,
  variant = "primary",
  type = "filled",
  className,
}: ButtonProps) {
  const bgVariants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    tertiary: "bg-tertiary",
  };

  const borderVariants = {
    primary: "border-primary",
    secondary: "border-secondary",
    tertiary: "border-tertiary",
  };

  switch (type) {
    case "text":
      return (
        <button
          className={`h-[50px] my-1.5 rounded p-[14px] border-2 border-transparent bg-transparent hover:opacity-80 hover:border-primary-gray ${className}`}
          onClick={onClick}
        >
          <span className={`text-sm font-bold text-primary-gray`}>{label}</span>
        </button>
      );

    case "outline":
      return (
        <button
          className={`h-[50px] my-1.5 border-2 ${borderVariants[variant]} rounded p-[8px] bg-white hover:opacity-70 ${className}`}
          onClick={onClick}
        >
          <span className={`text-sm font-bold text-black`}>{label}</span>
        </button>
      );

    case "filled":
    default:
      return (
        <button
          className={`h-[50px] my-1.5 rounded p-2 ${bgVariants[variant]} hover:opacity-80 ${className}`}
          onClick={onClick}
        >
          <span className={`text-sm font-bold text-white`}>{label}</span>
        </button>
      );
  }
}
