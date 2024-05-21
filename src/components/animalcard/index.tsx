type AnimalCardProps = {
  title: string;
  imageUrl: string;
  description: string;
  onClick: () => void;
};

export default function AnimalCard({ title, description, imageUrl, onClick }: AnimalCardProps) {
  console.log(imageUrl)
  return (
    <button onClick={onClick} className="block w-full">
      <div className="flex flex-col max-w-sm rounded-lg overflow-hidden shadow-lg bg-white mb-5">
        <img className="flex rounded-t-lg w-full" src={`data:image/png;base64,${imageUrl}`} alt={title} style={{ width: '100%', height: 300 }} />

        <h1 className="self-start ml-2 mt-1 text-lg font-semibold text-gray-700">{title}</h1>
        <span className="self-start ml-2 text-sm mb-2 text-primary-gray">{description}</span>
      </div>
    </button>
  )
}
