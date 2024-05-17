import { useEffect, useState } from "react";

import { useStateWithHistory } from "hooks/useStateWithHistory";
import useApi from "hooks/api";
import Select from "components/select";
import Tag from "components/tag";
import AnimalCard from "components/animalcard";
import BackButton from 'components/backbutton';

export default function PetList() {
  const [shelters, setShelters] = useState([{ value: 1, label: 'Ulbra Canoas' }]);
  const [selectedShelters, setSelectedShelters] = useState({});
  const [tags, setTags] = useState([
    { value: 1, label: 'Caramelo' },
    { value: 2, label: 'Pelo curto' },
    { value: 3, label: 'Bravo' },
    { value: 4, label: 'Castrado' },
    { value: 5, label: 'Macho' },
    { value: 6, label: 'Obeso' },
    { value: 7, label: 'Vira Lata' }
  ]);
  const [selectedTags, setSelectedTags] = useStateWithHistory([]);
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
        <BackButton onClick={() => window.location.href = '/'} />

        <h2 className="mt-2">Secione um abrigo:</h2>

        <Select
          className="mt-2"
          options={shelters}
          value={selectedShelters}
          onChange={(e) => setSelectedShelters(e)}
        />

        <b className='mt-2 text-gray-700'>Caracteristicas</b>

        <div className="flex flex-row flex-wrap my-2">
          {
            tags.map((tag, index) => (
              <Tag
                id={tag.value}
                key={index}
                description={tag.label}
                selected={selectedTags?.includes(tag.value)}
                onClick={() => {
                  if (selectedTags.includes(tag.value)) {
                    setSelectedTags(selectedTags.filter((t: any) => t !== tag.value))
                    return;
                  }
                  setSelectedTags([...selectedTags, tag.value])
                }}
              />
            ))
          }
        </div>

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