import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function RugbyStandings({ standings }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell>Pts</TableCell>
            <TableCell>Dala</TableCell>
            <TableCell>Driftwood</TableCell>
            <TableCell>Prinsloo</TableCell>
            <TableCell>Christie</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map((row) => (
            <TableRow
              key={row.position}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.position}) {row.team_name}
              </TableCell>
              <TableCell>{row.totalpts}</TableCell>
              <TableCell>{row.round1}</TableCell>
              <TableCell>{row.round2}</TableCell>
              <TableCell>{row.round3}</TableCell>
              <TableCell>{row.round4}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
