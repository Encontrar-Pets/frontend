import AnimalCard from "components/animalcard";

export default function PetList() {
  return (
    <div className='flex w-full justify-center px-4'>
      <div className="flex flex-col max-w-96">

        <b className='mt-6 text-gray-700'>Caracteristicas</b>

        <AnimalCard
          imageUrl="https://i0.statig.com.br/bancodeimagens/78/pt/gs/78ptgsfeddfh638dkkzya5p3y.jpg"
          onClick={() => window.location.href = '/pet/1'}
          title="Caramelo Médio"
          description="Galpão 1 ULBRA - Corredor 4 - Baia 112"
        />
      </div>
    </div>
  );
}