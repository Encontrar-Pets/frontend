import { useEffect, useState } from "react";

import { useStateWithHistory } from "hooks/useStateWithHistory";
import BackButton from "components/back-button";
import Select, { Option } from "components/select";
import Tag from "components/tag";
import Input from "components/input";
import Button from "components/button";
import useForm from "hooks/form";

import { IPet } from "types/generic";
import ImageUpload from "components/image-upload/image-upload";
import { validate } from "utils/validate";
import { useLocation } from "react-router-dom";
import useApi from "hooks/api";
import { useLoading } from "context/loadingContext";

const addPetValidations = {
  name: [validate.isEmpty()],
  description: [validate.isEmpty()],
  type: [validate.isEmpty()],
};

export default function AddPet() {
  const location = useLocation();
  const [image, setImage] = useState<string | null>(null);
  const [form, onChangeForm] = useForm({
    validations: addPetValidations,
  });
  const [tags, setTags] = useStateWithHistory([]);
  const [selectedTags, setSelectedTags] = useStateWithHistory([]);
  const [textInput, setTextInput] = useState("");

  const { showLoading, hideLoading } = useLoading();

  const serviceTags = useApi("coreServer", 'GET', 'tags', {});
  const pets = useApi("coreServer", "POST", "pets/new", {});

  async function onAddPet() {
    const request = form.values;
    const type = (request["type"] as Option<string>).value;
    const shelterId = location.state.shelter_id;
    const pet: IPet = {
      id: 0,
      name: request["name"] as string,
      description: request["description"] as string,
      type: type,
      img_url: image ?? "",
      pet_tag_ids: selectedTags,
      shelter_id: shelterId,
    };
    showLoading();
    const response = await pets.fetch({
      dynamicParams: { ...pet, status: "A" },
    });
    hideLoading();
    // TODO: handle response and errors
    alert(response);
  }

  useEffect(() => {
    (async () => {
      const response = await serviceTags.fetch({});
      if (response) setTags(response.data);
    })()
  }, []);

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col max-w-96">
        <BackButton
          onClick={() => (window.location.href = "/shelter-management")}
        />

        <h1 className="self-start mt-7 mb-4 text-lg font-semibold text-gray-700">
          Cadastrar Pet
        </h1>

        <ImageUpload
          className="my-4 w-full"
          placeholder="Adicionar foto"
          onChange={setImage}
        />
        <Input
          className="mt-2"
          placeholder="Nome"
          value={(form.getValue("name") as string) ?? ""}
          error={form.getError("name")}
          onChange={onChangeForm("name")}
        />
        <Input
          className="mt-4"
          placeholder="Descrição"
          value={(form.getValue("description") as string) ?? ""}
          error={form.getError("description")}
          onChange={onChangeForm("description")}
        />
        <h2 className="mt-2">Tipo:</h2>
        <Select
          className="mt-2"
          options={[
            { value: "D", label: "Cachorro" },
            { value: "C", label: "Gato" },
          ]}
          value={form.getValue("type") as Option<string>}
          onChange={onChangeForm("type")}
          error={form.getError("type")}
        />

        {/* TODO: migrate to new component (PetProperties?) */}
        {/* disabling broken component for now */}
        {/* <b className="mt-3 text-gray-700">Características</b>
        <span className="text-gray-500">Selecione as opções abaixo:</span>
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
        </div> */}

        {/* <div className="flex flex-row mt-2">
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
        </div> */}
        <Button
          className="mt-4"
          variant="secondary"
          label="Cadastrar Pet"
          onClick={form.trySave(onAddPet)}
        />
      </div>
    </div>
  );
}
