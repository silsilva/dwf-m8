const API_BASE_URL = "https://proyecto7-fecm.onrender.com";

//CREAR MASCOTAS
export async function createPet(
  token,
  petName: string,
  pictureUrl: string,
  lat: number,
  lng: number,

  zone: string
) {
  const response = await fetch("https://proyecto7-fecm.onrender.com/pets", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token.token}`,
    },
    body: JSON.stringify({
      zone,
      petName,
      pictureUrl,
      lat,
      lng,
    }),
  });

  const data = await response.json();

  return data.newPet;
}

//ELIMINAR MASCOTA
export async function deleteOnePet(token, petId: number) {
  const response = await fetch(
    "https://proyecto7-fecm.onrender.com/pets/" + petId,
    {
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token.token,
      },
    }
  );

  const data = await response.json();
  console.log(data, "DATA DELETEONE");

  return data;
}
//
export async function getOnePet(petId: number) {
  const response = await fetch(
    "https://proyecto7-fecm.onrender.com/pets/" + petId,
    {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
}
//
export async function getMyPets(token) {
  const response = await fetch("https://proyecto7-fecm.onrender.com/me/pets", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token.token}`,
    },
  });

  const data = await response.json();

  return data.pets;
}
//
export async function getPetsAround(lat: number, lng: number) {
  const response = await fetch(
    "https://proyecto7-fecm.onrender.com/pets-around?lat=" +
      lat +
      "&lng=" +
      lng,
    {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const data = await response.json();
  console.log(data.lostPets, "DESDE LA API");

  return data.lostPets;
}
//ACA NO VEO QUE SE USE MIRAR MEJOR
export async function setPetFound(token, petId: number) {
  const response = await fetch(
    "https://proyecto7-fecm.onrender.com/pets/" + petId,
    {
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token.token,
      },
      body: JSON.stringify({
        state: "found",
      }),
    }
  );

  const data = await response.json();

  return data;
}
//
export async function editPet(
  token,
  petId: number,
  petName: string,
  petLastLocationLat: number,
  petLastLocationLng: number,
  petLastSeen: string,
  pictureUrl: string
) {
  const response = await fetch(
    "https://proyecto7-fecm.onrender.com/pets/" + petId,
    {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${token.token}`,
      },
      body: JSON.stringify({
        petName: petName,
        pictureUrl: pictureUrl,
        lat: petLastLocationLat,
        lng: petLastLocationLng,
        zone: petLastSeen,
      }),
    }
  );

  const data = await response.json();

  return data;
}

//AUTH
export async function createUser(
  name: string,
  email: string,

  password: string
) {
  try {
    const response = await fetch("https://proyecto7-fecm.onrender.com/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data, "data DE LA APIS");

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function logIn(email: string, password: string) {
  const response = await fetch(
    "https://proyecto7-fecm.onrender.com/auth/token",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();

    localStorage.setItem("pet-finder", JSON.stringify({ token: data }));
    return data;
  } else {
    alert("ERROR");
    throw new Error("Error al iniciar sesión");
  }
}
//USER

export async function editUser(token, name: string, password: string) {
  const response = await fetch("https://proyecto7-fecm.onrender.com/me", {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: `bearer ${token.token}`,
    },
    body: JSON.stringify({
      name: name,
      password: password,
    }),
  });

  const data = await response.json();
  console.log(token, "desde LA APIHOLAAA");

  return data;
}
