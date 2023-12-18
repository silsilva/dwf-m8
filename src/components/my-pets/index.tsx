import { useState, useEffect } from "react";
import Card from "../../ui/Card";
import { token, useToken } from "../../hooks/atoms";
import { useNavigate } from "react-router-dom";
import { getMyPets } from "../../lib/api";
import Header from "../../ui/Header";
export default function MyPet() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    async function getPets() {
      const data = await getMyPets(userToken);
      setPets(data);
      setIsLoading(false);
    }

    getPets();
  }, []);

  return pets.length !== 0 ? (
    <main>
      <Header></Header>
      <div className="contenedor4">
        <h1>Mis mascotas reportadas</h1>

        {pets.map((pet) => {
          return (
            <Card
              id={pet.id}
              key={pet.id}
              imageURL={pet.pictureUrl}
              name={pet.petName}
              page={"published"}
              place={pet.zone}
              found={pet.state}
            />
          );
        })}
      </div>
    </main>
  ) : (
    <main>
      <h3>...No se encuentran mascotas</h3>
    </main>
  );
}
