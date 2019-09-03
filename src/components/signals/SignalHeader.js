import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'
const SignalHeader = function(props) {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <div className='sub-title'>Ticker</div>
                </TableCell>
                <TableCell>
                    <div className='sub-title'>Charts</div>
                </TableCell>
                <TableCell>
                    <div className="sub-title">Open</div>
                </TableCell>
                <TableCell>
                    <div className="sub-title">High</div>
                </TableCell>
                <TableCell>
                    <div className="sub-title">Low</div>
                </TableCell>
                <TableCell>
                    <div className="sub-title">Close</div>
                </TableCell>
                <TableCell>
                    <div className="sub-title">Volume</div>
                </TableCell>
                <TableCell colSpan={2}>
                    <div className="sub-title">50-Day Price/Vol</div>
                </TableCell>
                <TableCell>
                    <div className="sub-title">Comp</div>
                </TableCell>
                <TableCell>
                    <div className="sub-title">Rel Str</div>
                </TableCell>
                <TableCell>
                    <div className="sub-title">Grp St</div>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default SignalHeader