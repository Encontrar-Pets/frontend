type TagProps = {
  id: number;
  description: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function Tag({ description, selected, onClick }: TagProps) {
  return (
    <div
      onClick={onClick}
      className={`items-center rounded-3xl m-1 ${selected ? 'bg-primary' : 'bg-primary-light'} w-fit py-1.5 px-3 font-sans text-xs font-semibold text-white`}
    >
      <span className="">{description}</span>
    </div>
  );
}
