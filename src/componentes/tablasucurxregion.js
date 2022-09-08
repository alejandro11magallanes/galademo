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
import { TextField } from "@mui/material";

function createData(clave, sucursal, borrar, actualizar) {
  return { clave, sucursal , borrar, actualizar };
}

const rows = [
  createData(
    "680",
    "Hidalgo",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "685",
    "Misiones",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "690",
    "Soriana Revolución",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "691",
    "San Isidro",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "692",
    "Gran Class",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "693",
    "Gómez Palacio",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
];

const Tablasucxregion = () => {
  return (
    <div>
      <TextField id="outlined-basic" label="Región" variant="outlined" /><br></br><br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="table-title">
              <TableCell align="left">Clave</TableCell>
              <TableCell align="left">Sucursal</TableCell>
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
                <TableCell align="left">{row.sucursal}</TableCell>
                <TableCell align="left">{row.borrar}</TableCell>
                <TableCell align="left">{row.actualizar}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tablasucxregion;
