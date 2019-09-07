import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'
const SignalHeader = function(props) {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <div>Ticker</div>
                </TableCell>
                <TableCell>
                    <div>Charts</div>
                </TableCell>
                <TableCell>
                    <div>50-Day Price/Vol</div>
                </TableCell>
                <TableCell>
                    <div>Comp/RS/Grp</div>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default SignalHeader