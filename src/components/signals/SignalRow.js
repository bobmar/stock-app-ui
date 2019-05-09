import React from 'react'
import {Grid} from 'semantic-ui-react'
import {stockChartsUrl 
    , stockChartsPnf } from '../../config/UrlConfig';

const SignalRow = function(props) {
    return (
        <Grid.Row celled>
            <Grid.Column className={props.signal.multiList?'multi-list':'single-list'}>{props.signal.tickerSymbol}</Grid.Column>
            <Grid.Column><a href={stockChartsUrl(props.signal.tickerSymbol)} target='_blank'>Sharp</a></Grid.Column>
            <Grid.Column><a href={stockChartsPnf(props.signal.tickerSymbol)} target='_blank'>PnF</a></Grid.Column>
            <Grid.Column>
                <div className="sub-title">Open</div>
                <div>{Number(props.signal.openPrice).toFixed(2)}</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">High</div>
                <div>{Number(props.signal.highPrice).toFixed(2)}</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">Low</div>
                <div>{Number(props.signal.lowPrice).toFixed(2)}</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">Close</div>
                <div>{Number(props.signal.closePrice).toFixed(2)}</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">Volume</div>
                <div>{props.signal.volume}</div>
            </Grid.Column>
        </Grid.Row>
    )
}

export default SignalRow