import React from 'react'
import {Grid} from 'semantic-ui-react'
import {stockChartsUrl 
    , stockChartsPnf } from '../../config/UrlConfig';

const SignalRow = function(props) {
    return (
        <Grid.Row celled>
            <Grid.Column className={props.signal.multiList?'multi-list':'single-list'}>{props.signal.tickerSymbol}</Grid.Column>
            <Grid.Column>
                <div><a href={stockChartsUrl(props.signal.tickerSymbol)} target='_blank'>Sharp</a></div>
                <div><a href={stockChartsPnf(props.signal.tickerSymbol)} target='_blank'>PnF</a></div>
            </Grid.Column>
            <Grid.Column>
                <div>{Number(props.signal.openPrice).toFixed(2)}</div>
            </Grid.Column>
            <Grid.Column>
                <div>{Number(props.signal.highPrice).toFixed(2)}</div>
            </Grid.Column>
            <Grid.Column>
                <div>{Number(props.signal.lowPrice).toFixed(2)}</div>
            </Grid.Column>
            <Grid.Column>
                <div>{Number(props.signal.closePrice).toFixed(2)}</div>
            </Grid.Column>
            <Grid.Column>
                <div>{props.signal.volume}</div>
            </Grid.Column>
            <Grid.Column width={2}>
                <span>{props.signal.avgPrice.avgPrice50Day !== null?
                    Number(props.signal.avgPrice.avgPrice50Day.avgPrice).toFixed(2)
                    : '' }
                </span>
                <span> / </span>
                <span>{props.signal.avgPrice.avgPrice50Day !== null?
                    Number(props.signal.avgPrice.avgPrice50Day.avgVolume).toFixed(0)
                    : '' }
                </span>
            </Grid.Column>
            <Grid.Column>
                <div>{props.signal.ibdLatestStat !== null?
                    props.signal.ibdLatestStat.compositeRating:'' }
                </div>
            </Grid.Column>
            <Grid.Column>
                <div>{props.signal.ibdLatestStat !== null?
                    props.signal.ibdLatestStat.relativeStrength:'' }
                </div>
            </Grid.Column>
            <Grid.Column>
                <div>{props.signal.ibdLatestStat !== null?
                    props.signal.ibdLatestStat.groupStrength:'' }
                </div>
            </Grid.Column>
        </Grid.Row>
    )
}

export default SignalRow