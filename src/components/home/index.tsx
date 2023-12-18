import { Link, useNavigate } from "react-router-dom";
import Header from "../../ui/Header";
import Button from "../../ui/Button";

export default function Homes() {
  const goTo = useNavigate();

  const check = async (e) => {
    e.preventDefault();

    goTo("/lost-pets");
  };
  return (
    <main>
      <div className="contenedor5">
        <Header></Header>
        <div id="homeb">
          <p>
            Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
            conocer tu ubicación.
          </p>
          <Button onClick={check}>Dar mi ubicacion</Button>
        </div>
      </div>
    </main>
  );
}
