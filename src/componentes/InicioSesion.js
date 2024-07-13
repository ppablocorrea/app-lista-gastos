import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import Boton from "../elementos/Boton";
import {
  Formulario,
  Input,
  ContenedorBoton,
} from "../elementos/ElementosDeFormulario";
import { ReactComponent as SvgLogin } from "../imagenes/login.svg";
import styled from "styled-components";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem;
  margin-bottom: 1.25rem;
`;

function InicioSesion() {
  return (
    <>
      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesión</Titulo>
          <div>
            <Boton to="/crear-cuenta">Registrarse</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario>
        <Svg />
        <Input type="email" name="email" placeholder="Correo Electrónico" />
        <Input type="password" name="password" placeholder="Contraseña" />
        <ContenedorBoton>
          <Boton as="button" type="submit" $primario>
            Iniciar Sesión
          </Boton>
        </ContenedorBoton>
      </Formulario>
    </>
  );
}

export default InicioSesion;
