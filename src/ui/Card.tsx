import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  id;
  imageURL;
  name;
  place;
  page;
  found?;
  onDeletePet?;
  onReport?;
};

type Inputs = {
  name: string;
  phoneNumber: number;
  lastSeen: string;
};

export default function Card({
  id,
  imageURL,
  name,
  place,
  page,
  found,
  onDeletePet,
  onReport,
}: Props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleClickOnEdit = () => {
    navigate("/edit-pet/" + id);
  };
  const reportar = () => {
    navigate("/edit-pet/" + id);
  };

  const onReportSubmit: SubmitHandler<Inputs> = (data) => {
    onReport({ data, id, name });
  };

  return (
    <div id="card">
      <div>
        <img id="img-card" src={imageURL} />
      </div>
      <div id="card-text">
        <div>
          <p>{name}</p>
          <p>{place}</p>
        </div>

        {page === "lost" ? (
          <Button onClick={reportar} type={"button"}>
            Reportar
          </Button>
        ) : (
          <Button onClick={handleClickOnEdit} type={"button"}>
            Editar
          </Button>
        )}
      </div>

      {found === "found" ? (
        <div>
          <Button type={"submit"} onClick={onDeletePet}>
            Eliminar reporte
          </Button>
        </div>
      ) : null}
    </div>
  );
}
