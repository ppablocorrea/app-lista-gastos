import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../contextos/AuthContext";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
const useObtenerGastos = () => {
  const [gastos, cambiarGastos] = useState([]);
  const [ultimoGasto, cambiarUltimoGasto] = useState(null);
  const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);
  const { usuario } = useAuth();

  const obtenerMasGastos = () => {
    const consulta = query(
      collection(db, "gastos"),
      where("uidUsuario", "==", usuario.uid),
      orderBy("fecha", "desc"),
      limit(10),
      startAfter(ultimoGasto)
    );

    const unsuscribe = onSnapshot(
      consulta,
      (snapshot) => {
        if (snapshot.docs.length > 0) {
          cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
          cambiarGastos(
            gastos.concat(
              snapshot.docs.map((gasto) => {
                return { ...gasto.data(), id: gasto.id };
              })
            )
          );
        } else {
          cambiarHayMasPorCargar(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    return unsuscribe;
  };

  useEffect(() => {
    const consulta = query(
      collection(db, "gastos"),
      where("uidUsuario", "==", usuario.uid),
      orderBy("fecha", "desc"),
      limit(10)
    );

    const unsuscribe = onSnapshot(consulta, (snapshot) => {
      if (snapshot.docs.length > 0) {
        cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
        cambiarHayMasPorCargar(true);
      } else {
        cambiarHayMasPorCargar(false);
      }

      cambiarGastos(
        snapshot.docs.map((gasto) => {
          return { ...gasto.data(), id: gasto.id };
        })
      );
    });

    return unsuscribe;
  }, [usuario]);

  return [gastos, obtenerMasGastos, hayMasPorCargar];
};

export default useObtenerGastos;
