type TagProps = {
  id: number;
  description: string;
  onClick?: () => void;
};

export default function Tag({ description, onClick }: TagProps) {
  return (
    <div
      onClick={onClick}
      className="items-center rounded-3xl bg-primary w-fit py-1.5 px-3 font-sans text-xs font-semibold text-white"
    >
      <span className="">{description}</span>
    </div>
  );
}
