import {CalculationValue} from "../../schema/calculation";
import {styled, TableCell, TableContainer, TableRow} from "@mui/material";
import Table from "@mui/material/Table";
import React from "react";

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.grey["900"],
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const DataTable = (
    {data}: { data: CalculationValue[] }
) => {
    return (
        <TableContainer>
            <Table aria-label="simple table">
                {data.map((row) => (
                    <StyledTableRow
                        hover
                        key={row.name}
                    >
                        <TableCell align="left">{row.display.label}</TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                    </StyledTableRow>
                ))}
            </Table>
        </TableContainer>
    )
}