import { Header, Titulo } from "../elementos/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";

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
      <BarraTotalGastado />
    </>
  );
}

export default GastosPorCategoria;
