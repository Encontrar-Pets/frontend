import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import useApi from "hooks/api";
import { useStateWithHistory } from "hooks/useStateWithHistory";
import BackButton from 'components/back-button';
import Select from "components/select";
import AnimalCard from "components/animal-card";
import { ITag, TagList } from 'components/tag-list';
import Button from "components/button";
import { useLoading } from "context/loadingContext";

import { IPet } from "types/generic";

type Option = { value: number; label: string };

export default function PetList() {
  const petTypes = [{ value: 'D', label: 'Cachorro' }, { value: 'C', label: 'Gato' }];
  const [selectedPetType, setSelectedPetType] = useState({} as Option);
  const [shelters, setShelters] = useState<Option[]>([]);
  const [selectedShelter, setSelectedShelter] = useState<Option | null>(null);
  const [tags, setTags] = useStateWithHistory([]);
  const [selectedTags, setSelectedTags] = useStateWithHistory([]);
  const [pets, setPets] = useState<IPet[]>([]);

  const serviceShelters = useApi("coreServer", 'GET', 'shelters', {});
  const serviceTags = useApi("coreServer", 'GET', 'tags', {});
  const servicePetList = useApi("coreServer", 'GET', '', {});

  const { showLoading, hideLoading } = useLoading();

  function addTag(newTag: ITag) {
    setTags([...tags, newTag]);
  }

  async function searchPets() {
    showLoading();
    const response = await servicePetList.fetch({
      dynamicRoutes: `pets?type=${selectedPetType.value}&shelter_id=${selectedShelter?.value}&status=A&tags=${selectedTags.join(',')}`
    });
    if (response) setPets(response.data);
    hideLoading();
  }

  useEffect(() => {
    (async () => {
      const response = await serviceShelters.fetch({});
      if (response) setShelters(response.data.map((shelter: any) => {
        if (!selectedShelter) setSelectedShelter({ value: shelter.id, label: shelter.name });
        return { value: shelter.id, label: shelter.name }
      }));
    })()
  }, []);

  useEffect(() => {
    (async () => {
      const response = await serviceTags.fetch({});
      if (response) setTags(response.data);
    })()
  }, []);

  return (
    <div className='flex w-full justify-center px-4'>
      <div className="flex flex-col w-full max-w-96">
        <BackButton onClick={() => window.location.href = '/'} />

        <h2 className="mt-2">Secione um abrigo:</h2>
        <Select
          className="mt-2"
          options={shelters}
          value={selectedShelter}
          onChange={setSelectedShelter}
        />

        <h2 className="mt-2">Selecione o tipo do pet:</h2>
        <Select
          className="mt-2"
          options={petTypes}
          value={selectedPetType}
          onChange={setSelectedPetType}
        />

        <b className='mt-3 text-gray-700'>Caracteristicas</b>
        <span className='text-gray-500'>selecione as opções abaixo:</span>

        <TagList addTag={addTag} selectedTags={selectedTags} setSelectedTags={setSelectedTags} tags={tags} />

        <Button
          className="mt-4"
          variant="secondary"
          label="Pesquisar"
          onClick={async () => await searchPets()}
        />

        <div className="overflow-y-scroll  p-4">
          {
            pets.map((pet) => (
              <Link
                key={pet.id}
                to={`/pet-details/${pet.id}`}
                state={{ pet }}
              >
                <AnimalCard
                  key={pet.id}
                  imageUrl={pet.img_url}
                  title={pet.name}
                  description={pet.description}
                />
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
}