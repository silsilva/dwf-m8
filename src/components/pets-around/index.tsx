import Card from "../../ui/Card";
import { useState, useEffect } from "react";

import { useGeoloc } from "../../hooks/atoms";
import { useNavigate } from "react-router-dom";

import { getPetsAround } from "../../lib/api";

export default function LostPet() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isLocation, setIsLocation] = useGeoloc();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPets(userCoords) {
      try {
        const data = await getPetsAround(userCoords.lat, userCoords.lng);
        setPets(data);
        setIsLocation(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    async function getLocation() {
      try {
        const position = (await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        })) as any;

        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        getPets({ lat: userLat, lng: userLng });
      } catch {
        setIsLoading(false);
      }
    }

    getLocation();
  }, []);

  const handleOnReport = async (data) => {
    setIsLoading(true);

    navigate(0);
  };
  console.log(pets, "PETS DESDE PAGE");

  return isLoading ? (
    <div></div>
  ) : isLocation ? (
    pets.length != 0 ? (
      <main>
        <h1>Mascotas perdidas cerca</h1>

        {pets.map((pet) => {
          return (
            <Card
              id={pet.id}
              key={pet.id}
              imageURL={pet.pictureUrl}
              name={pet.petName}
              place={pet.zone}
              page={"lost"}
              onReport={(data) => {
                handleOnReport(data);
              }}
            />
          );
        })}
      </main>
    ) : (
      <main>
        <h1>No hay mascotas perdidas cerca de tu ubicación</h1>
      </main>
    )
  ) : (
    <main>
      <h1>...</h1>
    </main>
  );
}
