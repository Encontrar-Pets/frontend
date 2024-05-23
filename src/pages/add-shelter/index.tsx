import { useNavigate } from "react-router-dom";

import useForm from "hooks/form";
import Button from "components/button";
import Input from "components/input";
import { validate } from "utils/validate";
import BackButton from "components/back-button";

const loginValidations = {
  email: [validate.isEmpty()],
  password: [validate.isEmpty()],
};

const addValidations = {
  name: [validate.isEmpty()],
  address: [validate.isEmpty()],
  newEmail: [validate.isEmpty()],
  newPassword: [validate.isEmpty()],
};

export default function AddShelter() {
  const [loginForm, onChangeLoginForm] = useForm({
    validations: loginValidations,
  });
  const [addForm, onChangeAddForm] = useForm({ validations: addValidations });
  const navigate = useNavigate();

  function handleLogin() {
    const request = loginForm.values;
    console.log("LOGIN", request);
    navigate("/shelter-management");
  }

  function handleSignUp() {
    const request = loginForm.values;
    console.log("SIGN UP", request);
    navigate("/shelter-management");
  }

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col w-full max-w-96">

        <BackButton
          onClick={() => navigate('/')}
        />

        <h2 className="mt-1 text-xl font-bold text-primary-gray">
          Entrar com conta existente
        </h2>

        <form className="my-2 space-y-2">
          <Input
            placeholder="Email"
            value={loginForm.getValue("email") as string}
            error={loginForm.getError("email")}
            onChange={onChangeLoginForm("email")}
          />
          <Input
            placeholder="Senha"
            value={loginForm.getValue("password") as string}
            error={loginForm.getError("password")}
            onChange={onChangeLoginForm("password")}
          />
        </form>

        <Button label="Entrar" onClick={loginForm.trySave(handleLogin)} />
        <h2 className="mt-4 text-xl font-bold text-primary-gray">
          Cadastrar um novo abrigo
        </h2>

        <form className="my-2 space-y-2">
          <Input
            placeholder="Nome do abrigo"
            value={addForm.getValue("name") as string}
            error={addForm.getError("name")}
            onChange={onChangeAddForm("name")}
          />
          <Input
            placeholder="Endereço completo"
            value={addForm.getValue("address") as string}
            error={addForm.getError("address")}
            onChange={onChangeAddForm("address")}
          />
          <Input
            placeholder="Email"
            value={addForm.getValue("newEmail") as string}
            error={addForm.getError("newEmail")}
            onChange={onChangeAddForm("newEmail")}
          />
          <Input
            placeholder="Senha"
            value={addForm.getValue("newPassword") as string}
            error={addForm.getError("newPassword")}
            onChange={onChangeAddForm("newPassword")}
          />
        </form>

        <Button
          label="Cadastrar abrigo"
          variant="secondary"
          onClick={addForm.trySave(handleSignUp)}
        />
      </div>
    </div>
  );
}
