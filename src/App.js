import { Helmet } from "react-helmet";
import {
  ContenedorBotones,
  ContenedorHeader,
  Header,
  Titulo,
} from "./elementos/Header";
import Boton from "./elementos/Boton";
import BotonCerrarSesion from "./componentes/BotonCerrarSesion";

function App() {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gasto</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categorías</Boton>
            <Boton to="/lista">Lista de Gastos</Boton>
            <BotonCerrarSesion></BotonCerrarSesion>
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>
    </>
  );
}

export default App;
