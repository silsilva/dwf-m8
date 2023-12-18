import Button from "../../ui/Button";
import Dropzone from "../../ui/DropzoneComponent";
import MapboxComponent from "../../ui/MapBox";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { token, useToken, useImageDataURL, useGeoloc } from "../../hooks/atoms";
import { createPet } from "../../lib/api";
import Header from "../../ui/Header";
type Inputs = {
  name: string;
  description: string;
};

export default function CreatePets() {
  const navigate = useNavigate();
  const [pictureURL, setPictureURL] = useImageDataURL();
  const [location, setLocation] = useGeoloc();
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useToken();
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let petLocation: { lat?: number; lng?: number; name?: string } = location;

    setIsLoading(true);
    const response: any = await createPet(
      userToken,
      data.name,
      pictureURL,
      petLocation.lat,
      petLocation.lng,
      petLocation.name
    );

    navigate("/my-pets");
    return response;
  };

  const handleLocation = (data) => {
    setLocation(data);
  };

  const handleURL = (url) => {
    setPictureURL(url);
  };

  return (
    <main>
      <Header></Header>
      <div className="contenedor4">
        <h1>Reportar mascota perdida</h1>
        <h2>
          Ingresá los siguientes datos para realizar el reporte de tu mascota
          perdida
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <p>Nombre</p>
            <input
              type="text"
              {...register("name", { required: "El nombre es obligatorio" })}
              id="petName"
              autoComplete="off"
            />
          </label>

          <p>Foto de tu mascota</p>
          <Dropzone pictureURL={handleURL} isActive={true} />

          <p>Marcá en el mapa el útlimo lugar en donde la viste</p>
          <MapboxComponent onSetLocation={handleLocation} />

          <Button>Enviar información</Button>
        </form>
      </div>
    </main>
  );
}
