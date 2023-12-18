import Button from "../../ui/Button";
import { createUser } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Header from "../../ui/Header";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function Subscribes() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const response = await createUser(
        data.name,
        data.email,
        data.password.toString()
      );
      setFormError(response[0].user.email);
    } catch (error) {
      setFormError("ERROR, por favor intentalo de nuevo");
      setIsLoading(false);
    }
    navigate("/");
  };

  return (
    <main>
      <Header></Header>
      <div className="contenedor">
        <h2>Ingresá los siguientes datos para registrarte</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <p>Nombre</p>
            <input
              type="text"
              {...register("name", { required: "nombre obligatorio" })}
            />
          </label>

          <label>
            <p>Email</p>
            <input
              type="email"
              {...register("email", { required: "email obligatorio" })}
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
        </form>
        <button id="button">Registrate</button>
      </div>
    </main>
  );
}
