type AnimalCardProps = {
  title: string;
  imageUrl: string;
  description: string;
  onClick: () => void;
};

export default function AnimalCard({ title, description, imageUrl, onClick }: AnimalCardProps) {
  return (
    <button onClick={onClick}>
      <div className="flex flex-col  max-w-sm rounded-lg overflow-hidden shadow-lg bg-white mb-5">
        <img className="rounded-t-lg h-44" src={imageUrl} alt={title} />

        <h1 className="self-start ml-2 mt-1 text-lg font-semibold">{title}</h1>
        <span className="self-start ml-2 text-sm mb-2 text-primary-gray">{description}</span>
      </div>
    </button>
  )
}