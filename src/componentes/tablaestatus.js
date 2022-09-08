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

function createData(clave, estatus, descripcion, borrar, actualizar) {
  return { clave, estatus, descripcion, borrar, actualizar };
}

const rows = [
  createData(
    "PEN",
    "Pendiente",
    "Este estatus lo asigna la plataforma cuando una Solicitud se captura y queda pendiente de ser terminada para iniciar el proceso de Cancelación.",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "SOL",
    "Solicitud",
    "Estatus para Indicar que la Solicitud se ha creado en la Tienda",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "CAN",
    "Cancelada",
    "Estatus que permite cancelar una Solicitud",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "TER",
    "Terminada",
    "Estatus para Indicar que la Solicitud a terminado su proceso",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "AGE",
    "Gerencia",
    "Estatus para Indicar que la Solicitud a sido Autorizada por Gerencia de Tiendas o Gerencia Comercial",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "REV",
    "Revisada",
    "Estatus que Indica que la Solicitud ha Sido Revisada por área de pagos",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "APA",
    "Autoriza Pago",
    "Estatus que indica que la Solicitud a sido Autorizada para Pago",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
];

const Tablaestatus = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="table-title">
            <TableCell align="left">Clave</TableCell>
            <TableCell align="left">Estatus</TableCell>
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
              <TableCell align="left">{row.estatus}</TableCell>
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

export default Tablaestatus;
