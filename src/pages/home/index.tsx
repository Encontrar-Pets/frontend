import Logo from "assets/images/rs_flag.png";

import Button from "components/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col max-w-96">
        <img src={Logo} alt="logo" />

        <h4 className="mt-4">
          Esse portal é destinado a encontrar tutores e lares temporários para
          os pets que estão em abrigos no RS devido a tragédia climática.
        </h4>

        <b className="mt-6 text-gray-700">Selecione uma opção:</b>

        <div className="flex flex-col mt-2 justify-center">
          <Button
            label="Encontrar Pet"
            type="outline"
            variant="secondary"
            onClick={() => {
              navigate("/find-pet");
            }}
          />

          <Button
            label="Gerenciar Abrigo"
            type="outline"
            variant="primary"
            onClick={() => {
              navigate("/shelter");
            }}
          />

          <Button
            label="Informar Pet Perdido"
            type="outline"
            variant="tertiary"
            onClick={() => {
              navigate("/info-pet");
            }}
          />
        </div>
      </div>
    </div>
  );
}
