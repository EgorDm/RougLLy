import {CalculationValue} from "../../schema/calculation";
import {styled, TableBody, TableCell, TableContainer, TableRow, Tooltip} from "@mui/material";
import Table from "@mui/material/Table";
import React from "react";
import FormattedValue from "../FormattedValue";

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
                <TableBody>
                    {data.map((row, i) => (
                        <StyledTableRow
                            hover
                            key={i}
                        >
                            <TableCell align="left">
                                <Tooltip title={row.display.info}>
                                    <span style={{textDecoration: "underline dotted grey"}}>{row.display.label}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right">
                                <FormattedValue value={row.value} />
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}