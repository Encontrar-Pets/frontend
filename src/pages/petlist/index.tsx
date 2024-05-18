import { useEffect, useState } from "react";

import useApi from "hooks/api";
import { useStateWithHistory } from "hooks/useStateWithHistory";
import BackButton from 'components/backbutton';
import Select from "components/select";
import AnimalCard from "components/animalcard";
import Tag from "components/tag";
import Input from "components/input";
import Button from "components/button";

import { IPet } from "types/generic";

type Option = { value: number; label: string };

export default function PetList() {
  const [shelters, setShelters] = useState<Option[]>([]);
  const [selectedShelter, setSelectedShelter] = useState<Option | null>(null);
  const [tags, setTags] = useStateWithHistory([
    { value: 1, label: 'Caramelo' },
    { value: 2, label: 'Pelo curto' },
    { value: 3, label: 'Bravo' },
    { value: 4, label: 'Castrado' },
    { value: 5, label: 'Macho' },
    { value: 6, label: 'Obeso' },
    { value: 7, label: 'Vira Lata' }
  ]);
  const [selectedTags, setSelectedTags] = useStateWithHistory([]);
  const [pets, setPets] = useState<IPet[]>([]);
  const [textInput, setTextInput] = useState('');

  const serviceShelters = useApi("coreServer", 'GET', 'shelters', {});
  const servicePetList = useApi("coreServer", 'GET', '', {});

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
      if (selectedShelter) {
        const response = await servicePetList.fetch({
          dynamicRoutes: `pets?shelter_id=${selectedShelter.value}`
        });
        if (response) setPets(response.data);
      }
    })()
  }, [selectedShelter, tags]);

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
            tags.map((tag: Option, index: number) => (
              <Tag
                id={tag.value}
                key={index + 1}
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
              setTags([...tags, { value: tags.length + 1, label: textInput }]);
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
          onClick={() => { }}
        />

        <div className="overflow-y-scroll  p-4">
          {
            pets.map((pet) => (
              <AnimalCard
                key={pet.id}
                imageUrl={pet.image}
                onClick={() => window.location.href = `${window.location.origin}/pet/${pet.id}`}
                title={pet.name}
                description={pet.description}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}