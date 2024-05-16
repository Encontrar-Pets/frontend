type ButtonProps = {
  label: string;
  onClick: () => void;
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

  function getTextButtonClassName() {
    return `h-[60px] rounded p-[14px] border-2 border-transparent bg-transparent hover:opacity-80 hover:border-primary-gray  ${className}`;
  }

  function getOutlineClassName() {
    return `h-[60px] border-2 ${borderVariants[variant]} rounded p-[14px] bg-white hover:opacity-70 ${className}`;
  }

  function getFilledClassName() {
    return `h-[60px] rounded p-4 ${bgVariants[variant]} hover:opacity-80 ${className}`;
  }

  switch (type) {
    case "text":
      return (
        <button className={getTextButtonClassName()} onClick={onClick}>
          <span className={`text-sm font-bold text-primary-gray`}>{label}</span>
        </button>
      );

    case "outline":
      return (
        <button className={getOutlineClassName()} onClick={onClick}>
          <span className={`text-sm font-bold text-black`}>{label}</span>
        </button>
      );

    case "filled":
    default:
      return (
        <button className={getFilledClassName()} onClick={onClick}>
          <span className={`text-sm font-bold text-white`}>{label}</span>
        </button>
      );
  }
}
