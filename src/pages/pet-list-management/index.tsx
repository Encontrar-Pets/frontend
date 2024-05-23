import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

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

export default function PetListManagement() {
  const petTypes = [{ value: 'D', label: 'Cachorro' }, { value: 'C', label: 'Gato' }];
  const status = [
    { value: 'L', label: 'Perdido' },
    { value: 'A', label: 'Disponivel' },
    { value: 'P', label: 'Pendente de Aprovação de Recuperação' },
    { value: 'R', label: 'Recuperado Pelo Tutor' },
    { value: 'X', label: 'Pendente de Aprovação de Lar Temporário' },
    { value: 'T', label: 'Lar Temporário Adotivo' },
  ];

  const [selectedPetType, setSelectedPetType] = useState({} as Option);
  const [selectedStatus, setSelectedStatus] = useState({} as Option);
  const [tags, setTags] = useStateWithHistory([]);
  const [selectedTags, setSelectedTags] = useStateWithHistory([]);
  const [pets, setPets] = useState<IPet[]>([]);
  const [textInput, setTextInput] = useState('');

  const serviceTags = useApi("coreServer", 'GET', 'tags', {});
  const servicePetList = useApi("coreServer", 'GET', '', {});

  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await serviceTags.fetch({});
      if (response) setTags(response.data);
    })()
  }, []);

  async function searchPets() {
    showLoading();
    const response = await servicePetList.fetch({
      //TODO add the correct shelterId based on the user logged in
      dynamicRoutes: `pets?type=${selectedPetType.value}&shelter_id=clwcmt7qx000kxg42u9b646vk&status=${selectedStatus.value}&tags=${selectedTags.join(',')}`
    });
    if (response) setPets(response.data);
    hideLoading();
  }

  return (
    <div className='flex w-full justify-center px-4'>
      <div className="flex flex-col w-full max-w-96">
        <BackButton onClick={() => navigate('/')} />

        <h2 className="mt-2">Selecione o tipo do pet:</h2>
        <Select
          className="mt-2"
          options={petTypes}
          value={selectedPetType}
          onChange={setSelectedPetType}
        />

        <h2 className="mt-2">Selecione o status:</h2>
        <Select
          className="mt-2"
          options={status}
          value={selectedStatus}
          onChange={setSelectedStatus}
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
                  key={tag.id}
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