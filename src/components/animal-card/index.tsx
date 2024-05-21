type AnimalCardProps = {
  title: string;
  imageUrl: string;
  description: string;
  onClick?: () => void;
};

export default function AnimalCard({ title, description, imageUrl, onClick }: AnimalCardProps) {
  return (
    <button onClick={onClick} className="block w-full">
      <div className="flex flex-col max-w-sm rounded-lg overflow-hidden shadow-lg bg-white mb-5">
        <img className="flex rounded-t-lg w-full" src={`data:image/png;base64,${imageUrl}`} alt={title} style={{ width: '100%', height: 300 }} />

        <div className="flex flex-col items-start ml-2 wrap">
          <h1 className="mt-1 text-lg font-semibold text-gray-700">{title}</h1>
          <span className="text-sm mb-2 text-primary-gray">{description}</span>
        </div>
      </div>
    </button>
  )
}
