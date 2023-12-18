import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { token, userProfile } from "../hooks/atoms";

export default function Header() {
  const [offcanvas, setOffcanvas] = useState(false);
  const [userToken, setUserToken] = useRecoilState(token);
  const userProfileInfo = useRecoilValue(userProfile);
  const navigate = useNavigate();

  const toggleOffcanvas = () => {
    setOffcanvas(!offcanvas);
  };

  const handleLogOut = () => {
    localStorage.removeItem("pet-finder");
    navigate("/");
    navigate(0);
  };

  return (
    <header>
      <nav>
        <Link to={"/"}>
          <img
            src={logo}
            width={"60px"}
            alt="Pet Finder App Logo"
            onClick={() => {
              setOffcanvas(false);
            }}
          />
        </Link>

        <button
          onClick={toggleOffcanvas}
          className="transition"
          type="button"
          id="menu-button"
        >
          <i>MENU</i>
        </button>
      </nav>

      <div
        className={`${offcanvas ? "translate-x-0" : "translate-x-full"} `}
        id="header"
      >
        <button onClick={toggleOffcanvas} type="button">
          <i>x</i>
        </button>

        <ul>
          <li>
            <Link to="/profile" onClick={toggleOffcanvas}>
              Mi perfil
            </Link>
          </li>
          <li>
            <Link to="/lost-pets" onClick={toggleOffcanvas}>
              Mascotas cerca
            </Link>
          </li>
          <li>
            <Link to="/create-pet" onClick={toggleOffcanvas}>
              Reportar mascota
            </Link>
          </li>
          <li>
            <Link to="/my-pets" onClick={toggleOffcanvas}>
              Mis mascotas
            </Link>
          </li>
        </ul>

        {userProfileInfo ? (
          <p id="link">{userProfileInfo.email}</p>
        ) : (
          <p id="link">
            <Link to="/login" onClick={toggleOffcanvas}>
              iniciar sesión
            </Link>
          </p>
        )}
      </div>
    </header>
  );
}
