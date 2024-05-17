import Button from "components/button";

export default function ShelterManagement() {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col overflow-auto max-w-96 w-full">
        <h1 className="self-start mt-7 mb-4 text-lg font-semibold text-gray-700">
          Gerenciamento do abrigo
        </h1>

        <Button
          label={"Cadastrar novo Pet"}
          className="w-full"
          onClick={() => (window.location.href = "/find-pet")}
        />

        <Button
          label={"Ver lista de Pets recuperados"}
          className="w-full"
          onClick={() => (window.location.href = "/find-pet")}
        />

        <Button
          label={"Ver lista de Pets lar temporário"}
          className="w-full"
          onClick={() => (window.location.href = "/find-pet")}
        />

        <Button
          label={"Aprovar lar temporário"}
          className="w-full"
          variant="secondary"
          onClick={() => (window.location.href = "/find-pet")}
        />

        <Button
          label={"Aprovar Pet recuperado"}
          className="w-full"
          variant="secondary"
          onClick={() => (window.location.href = "/find-pet")}
        />

        <Button
          label={"Ver Pets perdidos"}
          className="w-full"
          variant="tertiary"
          onClick={() => (window.location.href = "/find-pet")}
        />
      </div>
    </div>
  );
}
