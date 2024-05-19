import { useState } from "react";
import { validate } from "utils/validate";
import useForm from "hooks/form";
import Button from "components/button";
import ImageUpload from "components/image-upload/image-upload";
import Input from "components/input";

const recoverPetValidations = {
  name: [validate.isEmpty()],
  phone: [validate.isEmpty(), validate.isCellphone()],
};

export default function RecoverPet() {
  const [image, setImage] = useState("");
  const [form, onChangeForm] = useForm({
    validations: recoverPetValidations,
  });

  const onChangePhone = (value: string) => {
    if (value.length > 11) return;

    onChangeForm("phone")(value.replace(/\D/g, ""));
  };

  const onRecoverPet = async () => {
    const request = form.values;
    console.log("RECOVER", request);
    console.log("img", image);
  };

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col overflow-auto max-w-96 w-full">
        <h1 className="self-start mt-7 mb-4 text-lg font-semibold text-gray-700">
          Quero recuperar meu Pet
        </h1>

        <ImageUpload
          className="my-4 w-full"
          placeholder="Foto antiga de seu Pet"
          onChange={(value) => setImage(value)}
        />

        <form>
          <Input
            className="my-2"
            placeholder="Seu nome"
            value={(form.getValue("name") as string) ?? ""}
            error={form.getError("name")}
            onChange={onChangeForm("name")}
          />

          <Input
            className="my-2"
            placeholder="Seu telefone"
            value={(form.getValue("phone") as string) ?? ""}
            error={form.getError("phone")}
            onChange={onChangePhone}
          />
        </form>

        <Button
          label={"Recuperar meu Pet"}
          className="w-full my-4"
          onClick={form.trySave(onRecoverPet)}
        />
      </div>
    </div>
  );
}
