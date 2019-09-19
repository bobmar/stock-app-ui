import React from 'react'
import {TableRow, TableCell} from '@material-ui/core'
import {stockChartsUrl 
    , stockChartsPnf } from '../../config/UrlConfig'

const SignalRow = function(props) {
    return (
        <TableRow>
            <TableCell>{props.signal.tickerSymbol}</TableCell>
            <TableCell>
                <div><a href={stockChartsUrl(props.signal.tickerSymbol)} target='_blank'>Sharp</a></div>
                <div><a href={stockChartsPnf(props.signal.tickerSymbol)} target='_blank'>PnF</a></div>
            </TableCell>
            <TableCell>
                {props.signal.avgPrice.avgPrice50Day !== null?
                    Number(props.signal.avgPrice.avgPrice50Day.avgPrice).toFixed(2)
                    : '' }
            </TableCell>
            <TableCell>
                {props.signal.avgPrice.avgPrice50Day !== null?
                    Number(props.signal.avgPrice.avgPrice50Day.avgVolume).toFixed(0)
                    : '' }
            </TableCell>
            <TableCell>
                <div>
                    { props.signal.ibdLatestStat !== null?props.signal.ibdLatestStat.compositeRating:'' }
                    { props.signal.ibdLatestStat !== null?' ' + props.signal.ibdLatestStat.relativeStrength:'' }
                    { props.signal.ibdLatestStat !== null?' ' + props.signal.ibdLatestStat.groupStrength:'' }
                </div>
            </TableCell>
        </TableRow>
    )
}

export default SignalRow