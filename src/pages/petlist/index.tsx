import { useEffect, useState } from "react";

import useApi from "hooks/api";
import AnimalCard from "components/animalcard";

export default function PetList() {
  const [shelters, setShelters] = useState([]);
  const [selectedShelters, setSelectedShelters] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [pets, setPets] = useState([{}]);

  const serviceShelters = useApi("coreServer", 'GET', 'shelters', {});
  const servicePetList = useApi("coreServer", 'POST', '', {});

  useEffect(() => {
    (async () => {
      // const response = await serviceShelters.fetch({});
      // if (response) setShelters(response.data);
    })()
  }, []);

  useEffect(() => {
    // (async () => {
    //   const response = await servicePetList.fetch({
    //     dynamicRoutes: `pets?shelter_id=${selectedShelters.id}&tag_ids=${selectedTags.join('%2C')}`
    //   });
    //   if (response) setPets(response.data);
    // })()
  }, [selectedShelters, tags]);


  return (
    <div className='flex w-full justify-center px-4'>
      <div className="flex flex-col max-w-96">

        <b className='mt-6 text-gray-700'>Caracteristicas</b>

        <div className="overflow-y-scroll  p-4">
          {
            pets.map((pet, index) => (
              <AnimalCard
                key={index}
                imageUrl="https://i0.statig.com.br/bancodeimagens/78/pt/gs/78ptgsfeddfh638dkkzya5p3y.jpg"
                onClick={() => window.location.href = '/pet/1'}
                title="Caramelo Médio"
                description="Galpão 1 ULBRA - Corredor 4 - Baia 112"
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}