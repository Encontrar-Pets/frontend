import { useState } from "react";

import { useStateWithHistory } from "hooks/useStateWithHistory";
import BackButton from "components/backbutton";
import Select, { Option } from "components/select";
import Tag from "components/tag";
import Input from "components/input";
import Button from "components/button";
import useForm from "hooks/form";

import { IPet } from "types/generic";
import ImageUpload from "components/image-upload/image-upload";
import { validate } from "utils/validate";

const addPetValidations = {
  name: [validate.isEmpty()],
  description: [validate.isEmpty()],
  type: [validate.isEmpty()],
};

export default function AddPet() {
  const [image, setImage] = useState<string | null>(null);
  const [form, onChangeForm] = useForm({
    validations: addPetValidations,
  });
  const [tags, setTags] = useStateWithHistory([
    { value: 1, label: "Caramelo" },
    { value: 2, label: "Pelo curto" },
    { value: 3, label: "Bravo" },
    { value: 4, label: "Castrado" },
    { value: 5, label: "Macho" },
    { value: 6, label: "Obeso" },
    { value: 7, label: "Vira Lata" },
  ]);
  const [selectedTags, setSelectedTags] = useStateWithHistory([]);
  const [textInput, setTextInput] = useState("");

  const onAddPet = () => {
    // TODO: integrate with API
    const request = form.values;
    const type = (request["type"] as Option<string>).value;
    // TODO: read shelterId from context
    const shelterId = 0;
    const pet: IPet = {
      id: 0,
      name: request["name"] as string,
      description: request["description"] as string,
      type: type,
      image: image ?? "",
      pet_tag_ids: selectedTags,
      shelter_id: shelterId,
    };
    console.log("Add pet called", pet);
  };

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col max-w-96">
        <BackButton
          onClick={() => (window.location.href = "/shelter-management")}
        />

        <h1 className="self-start mt-7 mb-4 text-lg font-semibold text-gray-700">
          Cadastrat Pet
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
        {/* TODO: check if types come from API */}
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
        <b className="mt-3 text-gray-700">Características</b>
        <span className="text-gray-500">Selecione as opções abaixo:</span>
        <div className="flex flex-row flex-wrap my-2">
          {tags.map((tag: Option<number>, index: number) => (
            <Tag
              id={tag.value}
              key={index + 1}
              description={tag.label}
              selected={selectedTags?.includes(tag.value)}
              onClick={() => {
                if (selectedTags.includes(tag.value)) {
                  setSelectedTags(
                    selectedTags.filter((t: any) => t !== tag.value)
                  );
                  return;
                }
                setSelectedTags([...selectedTags, tag.value]);
              }}
            />
          ))}
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
            disabled={textInput === ""}
            onClick={() => {
              if (textInput === "") return;
              setTags([...tags, { value: tags.length + 1, label: textInput }]);
              setTextInput("");
            }}
            className={`flex ${
              textInput === "" ? "bg-primary-light" : "bg-primary"
            } h-12 w-14 rounded-lg items-center justify-center`}
          >
            <span className="text-white text-[36px] mb-1">+</span>
          </button>
        </div>
        <Button
          className="mt-4"
          variant="secondary"
          label="Cadastrat Pet"
          onClick={form.trySave(onAddPet)}
        />
      </div>
    </div>
  );
}
