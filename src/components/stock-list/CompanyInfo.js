import React, {Component} from 'react';
import '../../assets/css/Stocks.css';

class CompanyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceInfo: this.props.priceInfo
        };
    }

    handleDateChg = (evt)=> {
        console.log('handleDateChg', evt.target.value);
    }

    returnLink = ()=> {
        if (this.props.fromPage === undefined) {
            return <div></div>
        }
        else {
            return <div>Return to {this.props.fromPage}</div>
        }
    }

    renderHistSignals = (signals)=> {
        if (signals !== undefined && signals.length > 0) {
            return signals.map(s=>
                <div key={s.signalId}>
                    <div className='sub-title'>{s.priceDate.substring(0,10)}</div>
                    <div>{s.signalType}</div>
                </div>
            )
        }
        else {
            return <div>None found</div>
        }

    }

    componentDidMount() {
        this.setState({
            priceInfo: this.props.priceInfo
        });
    }

    componentDidUpdate(prev) {
        if (this.props.priceInfo != prev.priceInfo) {
            this.setState({priceInfo: this.props.priceInfo});
        }
    }

    render() {
        let companyInfo = this.state.priceInfo;
        console.log('CompanyInfo.render ', companyInfo);
        return (
            <div>
                <div>{this.returnLink()}</div>
                <div className='info-grid'>
                    <div className='info-header'>
                        <div>Price for {companyInfo.tickerSymbol}</div>
                        <div>
                            <label htmlFor='price-date-input' style={{fontSize:'10pt', fontWeight: 'normal'}}>Select price date</label>
                            <input id='price-date-input' type='date' onChange={this.handleDateChg}/>
                        </div>
                    </div>
                    <div>
                        <div className='sub-title'>Date</div>
                        <div>{companyInfo.price.priceDate.substring(0,10)}</div>
                    </div>
                    <div>
                        <div className='sub-title'>Open</div>
                        <div>{companyInfo.price.openPrice.toFixed(2)}</div>
                    </div>
                    <div>
                        <div className='sub-title'>High</div>
                        <div>{companyInfo.price.highPrice.toFixed(2)}</div>
                    </div>
                    <div>
                        <div className='sub-title'>Low</div>
                        <div>{companyInfo.price.lowPrice.toFixed(2)}</div>
                    </div>
                    <div>
                        <div className='sub-title'>Close</div>
                        <div>{companyInfo.price.closePrice.toFixed(2)}</div>
                    </div>
                    <div>
                        <div className='sub-title'>Volume</div>
                        <div>{companyInfo.price.volume}</div>                   
                    </div>
                </div>
                <div className='info-grid'>
                    <div className='info-header'>Average Prices</div>
                    {companyInfo.avgPrices[0].avgList.map(p=>
                    <div key={p.priceId + ':' + p.daysCnt}>
                        <div>
                            <div className='sub-title'>{p.daysCnt}-day Price</div>
                            <div>{p.avgPrice.toFixed(2)}</div>
                        </div>
                        <div>
                            <div className='sub-title'>{p.daysCnt}-day Volume</div>
                            <div>{p.avgVolume}</div>
                        </div>
                    </div>
                    )}
                </div>
                <div className='info-grid'>
                    <div className='info-header'>Current Signals</div>
                    {companyInfo.signalList.map(s=>
                    <div key={s.signalId}>
                        <div className='sub-title'>{s.priceDate.substring(0,10)}</div>
                        <div>{s.signalType}</div>
                    </div>
                    )}
                </div>
                <div className='info-grid'>
                    <div className='info-header'>Signals 4 Weeks Ago</div>
                    {
                        this.renderHistSignals(companyInfo.histSignals.fourWeek)
                    }
                </div>
                <div className='info-grid'>
                    <div className='info-header'>Signals 8 Weeks Ago</div>
                    {
                        this.renderHistSignals(companyInfo.histSignals.eightWeek)
                    }
                </div>
                <div className='info-grid'>
                    <div className='info-header'>Signals 12 Weeks Ago</div>
                    {
                        this.renderHistSignals(companyInfo.histSignals.twelveWeek)
                    }
                </div>
                <div className='info-grid'>
                    <div className='info-header'>Selected Statistics</div>
                    {
                        companyInfo.statisticList.map(s=>
                        <div key={s.statId}>
                            <div className='sub-title'>{s.statisticType}</div>
                            <div>{s.statisticValue.toFixed(2)}</div>
                        </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default CompanyInfo;