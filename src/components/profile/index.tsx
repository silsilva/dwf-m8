import Button from "../../ui/Button";
import { editUser } from "../../lib/api";
import Header from "../../ui/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { token, useToken } from "../../hooks/atoms";
import { useRecoilState } from "recoil";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function Profiles() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [userToken, setUserToken] = useToken();

  const { register, handleSubmit, formState } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const response = await editUser(
      userToken,
      data.email,
      data.password.toString()
    );
    setIsLoading(false);
    navigate("/");
  };

  return (
    <main>
      <Header></Header>
      <div className="contenedor">
        <h2>Editar Tu Perfil</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <p>Nombre</p>
            <input
              type="text"
              {...register("name", { required: "nombre obligatorio" })}
            />
          </label>

          <label>
            <p>Contraseña</p>
            <input
              type="password"
              {...register("password", {
                required: "contraseña obligatoria",
              })}
            />
          </label>
          <button id="button">Registrate</button>
        </form>
      </div>
    </main>
  );
}
