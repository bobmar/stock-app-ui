import React from 'react'
import {Table, TableBody} from '@material-ui/core'
import SignalHeader from './SignalHeader'
import SignalRow from './SignalRow'
import '../../assets/css/Stocks.css'
import {makeStyles} from '@material-ui/core/styles'

const SignalSection = function ( props) {

    return (
    <Table stickyHeader>
        <SignalHeader/>
        <TableBody>
            {
                props.signalList.map((s)=><SignalRow  key={s.tickerSymbol} signal={s}/>)
            }
        </TableBody>
    </Table>
    )
}

export default SignalSection