import React, {Component} from 'react';
import { buildUrl
    , SIGNAL_BY_DATE_TYPE 
    , PRICE_COMPOSITE_BY_ID
    , SIGNAL_BY_DATE_TYPES
    , stockChartsUrl } from '../../config/UrlConfig';
import '../../assets/css/Stocks.css';
import axios from 'axios';

class SignalResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signalTypeList: this.props.signalTypeList(),
            selectedSignal: this.props.selectedSignal(),
            useLocalSignals: false
        }
        this.retrieveSignals(this.state.selectedSignal);
    }

    findSignalDesc = (signalCode)=>{
        this.state.signalTypeList.forEach((st)=>{
            if (st.signalCode === signalCode) {
                this.setState({selectedSignalDesc: st.signalDesc});
            }
        })
    }

    retrieveSignals = (signalType, signalDate)=>{
        console.log('retrieveSignals signalDate', signalDate);
        let queryDate = signalDate;
        if (queryDate === undefined) {
            queryDate = this.state.selectedSignalDate;
        }
        let request = {
            signalDate: queryDate,
            signalType: signalType
        }
        axios.post(buildUrl(SIGNAL_BY_DATE_TYPE), request)
        .then(
            res=>{
                this.setState(
                    {
                        signalList: res.data,
                    }
                )
                this.findSignalDesc(signalType);
                if (res.data.length > 0) {
                    this.setState({
                        selectedSignalDate: res.data[0].priceDate.substring(0,10),
                        selectedSignal: signalType
                    })
                }
                console.log('retrieveSignals returned ', this.state.signalList);
            },
            res=>{
                console.log("retrieveSignals failed", res.data);
            }
        );
    }

    handleDateChg = (e)=>{
        console.log('handleDateChg', e.target.value);
        this.setState({
            selectedSignalDate: e.target.value
        });
        this.retrieveSignals(this.props.selectedSignal(), e.target.value);
    }

    retrieveSignalsWithOverlay = (overlaySignal)=> {
        let signalDate = this.state.selectedSignalDate;
        if (signalDate === undefined) {
            signalDate = this.props.selectedSignalDate();
        }
        let request = {
            signalDate: signalDate,
            signalType: this.props.selectedSignal(),
            overlaySignalType: overlaySignal
        }
        this.setState({useLocalSignals: false});
        console.log('retrieveSignalsWithOverlay',request);
        axios.post(buildUrl(SIGNAL_BY_DATE_TYPES), request)
        .then(
            res=>{
                this.setState(
                    {
                        signalList: res.data,
                        useLocalSignals: true
                    }
                );
            },
            res=>{
                console.log('retrieveSignalsWithOverlay failed', res.data);
            }
        );
    }

    handleOverlaySelect = (e)=>{
        let overlaySignalParam = this.state.overlaySignalType;
        if (e !== undefined) {
            console.log('handleOverlaySelect', e.target.value);
            overlaySignalParam = e.target.value;
        }
        this.setState({
            overlaySignalType: overlaySignalParam
        });
        this.retrieveSignalsWithOverlay(overlaySignalParam);
    }

    noResults = ()=>{
        let nrTag = ''
        if (this.state.signalList === undefined || this.state.signalList.length === 0) {
            nrTag = <div>No results found</div>
        }
        return nrTag;
    }

    render() {
        let signalList = this.props.signalList();
        if (this.state.useLocalSignals) {
            signalList = this.state.signalList;
        }
        let signalTypeList = this.props.signalTypeList();
        return (
            <div>
                <div>
                    <label htmlFor="priceDate" className="sub-title">Price Date</label>
                    <input type="date" id="priceDate" 
                        defaultValue={this.state.selectedSignalDate} 
                        onChange={this.handleDateChg}/>
                </div>
                <div>
                    <span style={{fontWeight:'bold', padding:'2px 15px 2px 2px'}}>{this.state.selectedSignalDesc}</span>
                    <span>
                        <select defaultValue={this.state.overlaySignalType} onChange={this.handleOverlaySelect} onClick={()=>{this.handleOverlaySelect()}}>
                            {signalTypeList.map(t=>
                                <option key={t.signalCode} value={t.signalCode}>{t.signalDesc}</option>
                            )}
                        </select>
                    </span>
                </div>
                <div className="info-grid">
                {
                    signalList && (
                        signalList.map(s=>
                            <div key={s.signalId}>
                                <div className={s.multiList?'multi-list':'single-list'}><a href={stockChartsUrl(s.tickerSymbol)} target='_blank'>{s.tickerSymbol}</a></div>
                                <div className="sub-title">Closing Price</div>
                                <div>{Number(s.closePrice).toFixed(2)}</div>
                                <div className="sub-title">Volume</div>
                                <div>{s.volume}</div>
                            </div>
                        )
    
                    )
                }
                {this.noResults()}
                </div>
            </div>
        )
    }
}

export default SignalResult;