import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import useApi from "hooks/api";
import { useStateWithHistory } from "hooks/useStateWithHistory";
import BackButton from 'components/back-button';
import Select from "components/select";
import AnimalCard from "components/animal-card";
import Tag from "components/tag";
import Input from "components/input";
import Button from "components/button";
import { useLoading } from "context/loadingContext";

import { IPet } from "types/generic";

type Option = { value: number; label: string };

export default function PetList() {
  const [shelters, setShelters] = useState<Option[]>([]);
  const [selectedShelter, setSelectedShelter] = useState<Option | null>(null);
  const [tags, setTags] = useStateWithHistory([]);
  const [selectedTags, setSelectedTags] = useStateWithHistory([]);
  const [pets, setPets] = useState<IPet[]>([]);
  const [textInput, setTextInput] = useState('');

  const serviceShelters = useApi("coreServer", 'GET', 'shelters', {});
  const serviceTags = useApi("coreServer", 'GET', 'tags', {});
  const servicePetList = useApi("coreServer", 'GET', '', {});

  const { showLoading, hideLoading } = useLoading();

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

  async function searchPets() {
    showLoading();
    const response = await servicePetList.fetch({
      dynamicRoutes: `pets?shelter_id=${selectedShelter?.value}&status=A&tags=${selectedTags.join(',')}`
    });
    if (response) setPets(response.data);
    hideLoading();
  }

  return (
    <div className='flex w-full justify-center px-4'>
      <div className="flex flex-col max-w-96">
        <BackButton onClick={() => window.location.href = '/'} />

        <h2 className="mt-2">Secione um abrigo:</h2>
        <Select
          className="mt-2"
          options={shelters}
          value={selectedShelter}
          onChange={setSelectedShelter}
        />

        <b className='mt-3 text-gray-700'>Caracteristicas</b>
        <span className='text-gray-500'>selecione as opções abaixo:</span>
        <div className="flex flex-row flex-wrap my-2">
          {
            tags.map((tag: { id: string, description: string }, index: number) => {
              if (!tag.id) return
              return (
                <Tag
                  id={tag.id}
                  key={index + 1}
                  description={tag.description}
                  selected={selectedTags?.includes(tag.id)}
                  onClick={() => {
                    if (selectedTags.includes(tag.id)) {
                      setSelectedTags(selectedTags.filter((t: any) => t !== tag.id))
                      return;
                    }
                    setSelectedTags([...selectedTags, tag.id])
                  }}
                />
              )
            })
          }
        </div>

        <div className="flex flex-row mt-2">
          <Input
            className="mr-2"
            placeholder="Ou pesquise por uma nova"
            value={textInput}
            onChange={(value) => {
              setTextInput(value);
            }}
          />
          <button
            disabled={textInput === ''}
            onClick={() => {
              if (textInput === '') return;
              setTags([...tags, { id: tags.length + 1, description: textInput }]);
              setSelectedTags([...selectedTags, tags.length + 1]);
              setTextInput('');
            }}
            className={`flex ${textInput === '' ? 'bg-primary-light' : 'bg-primary'} h-12 w-14 rounded-lg items-center justify-center`}
          >
            <span className="text-white text-[36px] mb-1">+</span>
          </button>
        </div>
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