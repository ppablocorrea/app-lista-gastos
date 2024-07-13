import { Header, Titulo } from "../elementos/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elementos/BtnRegresar";

function GastosPorCategoria() {
  return (
    <>
      <Helmet>
        <title>Gastos por Categoría</title>
      </Helmet>
      <Header>
        <BtnRegresar />
        <Titulo>Gastos por Categoría</Titulo>
      </Header>
    </>
  );
}

export default GastosPorCategoria;
