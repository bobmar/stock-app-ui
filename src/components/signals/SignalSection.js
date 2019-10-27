import React from 'react'
import {Table, TableBody} from '@material-ui/core'
import SignalHeader from './SignalHeader'
import SignalRow from './SignalRow'
import '../../assets/css/Stocks.css'
import {makeStyles} from '@material-ui/core/styles'

const SignalSection = function ( props) {

    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        tableWrapper: {
            maxHeight:600,
            overflow:'auto',
        }
    })

    const classes = useStyles();
    return (
        <div className={classes.tableWrapper}>
        <Table stickyHeader>
            <SignalHeader/>
            <TableBody>
                {
                    props.signalList.map((s)=><SignalRow  key={s.tickerSymbol} signal={s}/>)
                }
            </TableBody>
        </Table>
        </div>
    )
}

export default SignalSection