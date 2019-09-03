import React from 'react'
import {TableRow, TableCell} from '@material-ui/core'
import {stockChartsUrl 
    , stockChartsPnf } from '../../config/UrlConfig'

const SignalRow = function(props) {
    return (
        <TableRow key={props.signal.tickerSymbol}>
            <TableCell>{props.signal.tickerSymbol}</TableCell>
            <TableCell>
                <div><a href={stockChartsUrl(props.signal.tickerSymbol)} target='_blank'>Sharp</a></div>
                <div><a href={stockChartsPnf(props.signal.tickerSymbol)} target='_blank'>PnF</a></div>
            </TableCell>
            <TableCell>
                <div>{Number(props.signal.openPrice).toFixed(2)}</div>
            </TableCell>
            <TableCell>
                <div>{Number(props.signal.highPrice).toFixed(2)}</div>
            </TableCell>
            <TableCell>
                <div>{Number(props.signal.lowPrice).toFixed(2)}</div>
            </TableCell>
            <TableCell>
                <div>{Number(props.signal.closePrice).toFixed(2)}</div>
            </TableCell>
            <TableCell>
                <div>{props.signal.volume}</div>
            </TableCell>
            <TableCell colSpan={2}>
                <span>{props.signal.avgPrice.avgPrice50Day !== null?
                    Number(props.signal.avgPrice.avgPrice50Day.avgPrice).toFixed(2)
                    : '' }
                </span>
                <span> / </span>
                <span>{props.signal.avgPrice.avgPrice50Day !== null?
                    Number(props.signal.avgPrice.avgPrice50Day.avgVolume).toFixed(0)
                    : '' }
                </span>
            </TableCell>
            <TableCell>
                <div>{props.signal.ibdLatestStat !== null?
                    props.signal.ibdLatestStat.compositeRating:'' }
                </div>
            </TableCell>
            <TableCell>
                <div>{props.signal.ibdLatestStat !== null?
                    props.signal.ibdLatestStat.relativeStrength:'' }
                </div>
            </TableCell>
            <TableCell>
                <div>{props.signal.ibdLatestStat !== null?
                    props.signal.ibdLatestStat.groupStrength:'' }
                </div>
            </TableCell>
        </TableRow>
    )
}

export default SignalRow