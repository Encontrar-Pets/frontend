import Button from "components/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import BackButton from "components/back-button";

export default function ShelterManagement() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col overflow-auto max-w-96 w-full">
        <BackButton
          onClick={() => navigate('/')}
        />

        <h1 className="self-start mt-2 mb-4 text-lg font-semibold text-gray-700">
          Gerenciamento do abrigo
        </h1>

        <Link
          to={`/add-pet`}
          state={{ shelter_id: 'clwcmt7qx000ixg42g2j3h5h4' }}
        >
          <Button
            label={"Cadastrar novo Pet"}
            className="w-full"
            onClick={() => { }}
          />
        </Link>

        <Button
          label={"Ver lista de Pets"}
          className="w-full"
          variant="secondary"
          onClick={() => navigate("/pets-list-management")}
        />

        <Button
          label={"Ver Pets perdidos"}
          className="w-full"
          variant="tertiary"
          onClick={() => navigate("/find-pet")}
        />
      </div>
    </div>
  );
}
