type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: "filled" | "outline";
  variant?: "primary" | "secondary" | "tertiary";
};

export default function Button({
  label,
  onClick,
  variant = "primary",
  type = "filled",
}: ButtonProps) {
  const isFilled = () => type === "filled";

  const bgVariants = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
  }

  const borderVariants = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    tertiary: 'border-tertiary',
  }

  if (isFilled()) {
    return (
      <button
        className={`my-2 mx-6 rounded p-4 ${bgVariants[variant]}`}
        onClick={onClick}
      >
        <span className={`text-sm font-bold text-white`}>{label}</span>
      </button>
    );
  }

  return (
    <button
      className={`my-2 mx-6 border-2 ${borderVariants[variant]} rounded p-[14px] bg-white`}
      onClick={onClick}
    >
      <span className={`text-sm font-bold text-black`}>{label}</span>
    </button>
  );
}
