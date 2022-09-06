import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Basura from "../assets/eliminar.png";
import Lapiz from "../assets/lapiz.png";
import "./Tablam.css";

function createData(clave, motivo, descripcion, borrar, actualizar) {
  return { clave, motivo, descripcion, borrar, actualizar };
}

const rows = [
  createData(
    "001",
    "No Puede Pagar",
    "El cliente manifiesta que no puede pagar",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "002",
    "Cambio de Residencia",
    "El Cliente manifiesta que va a cambiar de residencia",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "003",
    "Motivos Personales",
    "El Cliente manifiesta que por motivos personales desea cancelar",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "004",
    "Tardanza en entrega",
    "El cliente decide cancelar por que se tardo mucho en entregar la mercancía",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
];

const Tablamotivos = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="table-title">
            <TableCell align="left">Clave</TableCell>
            <TableCell align="left">Motivo</TableCell>
            <TableCell align="left">Descripcion</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.clave}
              </TableCell>
              <TableCell align="left">{row.motivo}</TableCell>
              <TableCell align="left">{row.descripcion}</TableCell>
              <TableCell align="left">{row.borrar}</TableCell>
              <TableCell align="left">{row.actualizar}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tablamotivos;
