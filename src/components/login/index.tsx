import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { token, useToken } from "../../hooks/atoms";
import Button from "../../ui/Button";
import { logIn } from "../../lib/api";

import Header from "../../ui/Header";

export default function Logins() {
  const goTo = useNavigate();
  const [token, setUserToken] = useToken();
  const check = async (e) => {
    e.preventDefault();
    const inputValue = e.target.email.value;
    const inputPassword = e.target.password.value;
    const response = await logIn(inputValue, inputPassword);
    setUserToken(response);
    goTo("/");
  };

  return (
    <main>
      <Header></Header>
      <div className="contenedor">
        <h4>Ingresá los siguientes datos para inciar sesión</h4>
        <form onSubmit={check}>
          <label>
            <p>Email</p>
            <input type="email" name="email" id="logInEmail" />
          </label>

          <label>
            <p>Contraseña</p>
            <input type="password" name="password" id="logInPassword" />
          </label>

          <p>
            No tenés cuenta?
            <Link to={"/subscribe"}>Registrate</Link>
          </p>
          <button id="button">Iniciar sesión</button>
        </form>
      </div>
    </main>
  );
}
