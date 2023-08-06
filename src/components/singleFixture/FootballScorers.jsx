import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(Player, Team, G, A) {
  return { Player, Team, G, A };
}

const rows = [
  createData("John Doe", "Manchester United", 24, 4),
  createData("Mason Greenwood", "Manchester United", 23, 3),
  createData("Jadon Sancho", "Machester United", 16, 6),
  createData("Kevin Etemesi", "Nairobi City Stars", 10, 3),
  createData("Benson Omalla", "Gor Mahia", 10, 3),
  createData("John Doe", "Manchester United", 24, 4),
  createData("Mason Greenwood", "Manchester United", 23, 3),
  createData("Jadon Sancho", "Machester United", 16, 6),
  createData("Kevin Etemesi", "Nairobi City Stars", 10, 3),
  createData("Benson Omalla", "Gor Mahia", 10, 3),
];

export default function FootballScorers() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="center">Team</TableCell>
            <TableCell align="right">G</TableCell>
            <TableCell align="right">A</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Player}
              </TableCell>
              <TableCell align="center">{row.Team}</TableCell>
              <TableCell align="right">{row.G}</TableCell>
              <TableCell align="right">{row.A}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
