import React from "react";
import 'antd/dist/antd.css';
import "./Inicio.css";
import Registro from "../assets/registro.png";
import Impresora from "../assets/impresora.png";
import Caja from "../assets/caja.png";
import Tablamotivos from "../componentes/tablamotivos";
import Tablaestatus from "../componentes/tablaestatus";
import Tablaregion from "../componentes/tablaregion";
import Tablasucxregion from "../componentes/tablasucurxregion";
import Tablausuxregion from "../componentes/tablausuxregion";

const Inicio = () => {
  return (
    <>
      <div className="header">
        <h2 className="title">Cancelaciones</h2>
        <p className="user">Usuario: Testing React</p>
      </div>
      <div className="motivos">
        <h3 className="subtitle">Motivos</h3>
        <img src={Registro} alt="registro" className="registro" />
        <img src={Impresora} alt="impresora" className="impresora" />
        <img src={Caja} alt="caja" className="caja" />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <Tablasucxregion/>
    </>
  );
};

export default Inicio;
