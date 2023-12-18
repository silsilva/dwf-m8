import Button from "../../ui/Button";
import Dropzone from "../../ui/DropzoneComponent";
import MapboxComponent from "../../ui/MapBox";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteOnePet } from "../../lib/api";
import { useToken } from "../../hooks/atoms";
import Header from "../../ui/Header";
import { editPet } from "../../lib/api";

type Inputs = {
  name: string;
  description: string;
};

export default function EditPets() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pictureURL, setPictureURL] = useState();
  const [setLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useToken();
  const [formError, setFormError] = useState(null);
  const [petInfo, setPetInfo] = useState(null);
  const [petLocation, setPetLocation] = useState({
    lat: undefined,
    lng: undefined,
    name: undefined,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const response: any = await editPet(
      userToken,
      Number(location.pathname.split("/")[2]),
      data.name,
      petLocation.lat,
      petLocation.lng,
      petLocation.name,
      pictureURL
    );
    console.log(pictureURL);

    navigate("/my-pets");
    return response;
  };

  const handleLocation = (data) => {
    setPetLocation(data);
  };

  const handleURL = (url) => {
    setPictureURL(url);
  };
  const handleDelete = async () => {
    {
      setIsLoading(true);

      const response = await deleteOnePet(
        userToken,
        Number(location.pathname.split("/")[2])
      );

      navigate("/my-pets");
    }
  };
  return (
    <main>
      <Header></Header>
      <div className="contenedor4">
        <h1>Reportar mascota</h1>
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
        <Button type={"submit"} onClick={handleDelete}>
          Eliminar reporte
        </Button>
      </div>
    </main>
  );
}
