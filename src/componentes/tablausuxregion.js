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

function createData(clave, region, borrar, actualizar) {
  return { clave, region , borrar, actualizar };
}

const rows = [
  createData(
    "100",
    "Torreón",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "101",
    "Pacifico",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "102",
    "Centro",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "103",
    "Centro Sur",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "104",
    "Norte Este",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
  createData(
    "105",
    "Norte Oeste",
    <img src={Basura} alt="borrar" width={30} height={30} />,
    <img src={Lapiz} alt="lapiz" width={30} height={30} />
  ),
];

const Tablausuxregion = () => {
  return (
    <div>
      <TextField id="outlined-basic" label="Usuario" variant="outlined" /><br></br><br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="table-title">
              <TableCell align="left">Clave</TableCell>
              <TableCell align="left">Region</TableCell>
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
                <TableCell align="left">{row.region}</TableCell>
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

export default Tablausuxregion;
