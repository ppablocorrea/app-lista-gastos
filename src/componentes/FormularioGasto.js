import { useEffect, useState } from "react";
import Boton from "../elementos/Boton";
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from "../elementos/ElementosDeFormulario";
import { ReactComponent as IconoPlus } from "../imagenes/plus.svg";
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicker";
import agregarGasto from "../firebase/agregarGasto";
import { fromUnixTime, getUnixTime } from "date-fns";
import { useAuth } from "../contextos/AuthContext";
import Alerta from "../elementos/Alerta";
import { useNavigate } from "react-router-dom";
import editarGasto from "../firebase/editarGasto";

const FormularioGasto = ({ gasto }) => {
  const [inputDescripcion, cambiarInputDescripcion] = useState("");
  const [inputCantidad, cambiarInputCantidad] = useState("");
  const [categoria, cambiarCategoria] = useState("hogar");
  const [fecha, cambiarFecha] = useState(new Date());
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (gasto) {
      if (gasto.data().uidUsuario === usuario.uid) {
        cambiarCategoria(gasto.data().categoria);
        cambiarFecha(fromUnixTime(gasto.data().fecha));
        cambiarInputDescripcion(gasto.data().descripcion);
        cambiarInputCantidad(gasto.data().cantidad);
      } else {
        navigate("/lista");
      }
    }
  }, [gasto, usuario, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "descripcion") {
      cambiarInputDescripcion(e.target.value);
    } else if (e.target.name === "cantidad") {
      cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ""));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let cantidad = parseFloat(inputCantidad).toFixed(2);

    if (inputDescripcion !== "" && inputCantidad !== "") {
      if (cantidad) {
        if (gasto) {
          editarGasto({
            id: gasto.id,
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha),
          })
            .then(() => {
              navigate("/lista");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          agregarGasto({
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha),
            uidUsuario: usuario.uid,
          })
            .then(() => {
              cambiarCategoria("hogar");
              cambiarInputDescripcion("");
              cambiarInputCantidad("");
              cambiarFecha(new Date());
              cambiarEstadoAlerta(true);
              cambiarAlerta({
                tipo: "exito",
                mensaje: "El gasto fue agregado correctamente.",
              });
            })
            .catch((error) => {
              cambiarEstadoAlerta(true);
              cambiarAlerta({
                tipo: "error",
                mensaje: "Hubo un problema al intentar agregar tu gasto.",
              });
            });
        }
      } else {
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: "error",
          mensaje: "El valor que ingresaste no es correcto.",
        });
      }
    } else {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos.",
      });
    }
  };

  return (
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias
          categoria={categoria}
          cambiarCategoria={cambiarCategoria}
        />
        <DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
      </ContenedorFiltros>
      <div>
        <Input
          type="text"
          name="descripcion"
          id="descripcion"
          placeholder="Descripción del Gasto"
          value={inputDescripcion}
          onChange={handleChange}
        />
        <InputGrande
          type="text"
          name="cantidad"
          id="cantidad"
          placeholder="$0.00"
          value={inputCantidad}
          onChange={handleChange}
        />
      </div>
      <ContenedorBoton>
        <Boton as="button" primario={"true"} conicono={"true"} type="submit">
          {gasto ? "Editar Gasto" : "Agregar Gasto"} <IconoPlus />
        </Boton>
      </ContenedorBoton>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </Formulario>
  );
};

export default FormularioGasto;
