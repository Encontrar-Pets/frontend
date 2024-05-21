type TagProps = {
  id: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Tag({ description, selected, onClick, className }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={`items-center rounded-3xl m-1 hover:opacity-80 ${selected ? 'bg-primary' : 'bg-primary-light'} w-fit py-1.5 px-3 font-sans text-xs font-semibold text-white ${className}`}
    >
      <span className="">{description}</span>
    </button>
  );
}
