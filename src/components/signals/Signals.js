import React, {Component} from 'react';
import { buildUrl
    , SIGNAL_TYPE_LIST
    , SIGNAL_BY_DATE_TYPE 
    , PRICE_COMPOSITE_BY_ID
    , SIGNAL_BY_DATE_TYPES} from '../../config/UrlConfig';
import SignalResult from './SignalResult';
import axios from 'axios';

class Signals extends Component {
    constructor() {
        super();
        this.state = {
            signalTypeList: [
                {
                    signalCode:'4WKUP',
                    signalDesc: 'Loading'
                }
            ],
            signalList: [
                {
                    signalId: 'INIT',
                    signalType:'GAPUP',
                    priceDate: '2018-06-02',
                    tickerSymbol: 'Loading'
                }
            ],
            selectedSignal: '',
            selectedSignalDesc: '',
            overlaySignalType: ''
        }
    }
    
    retrieveSignalTypes = ()=> {
        axios.get(buildUrl(SIGNAL_TYPE_LIST))
        .then(
            res=>{
                this.setState({
                    signalTypeList: res.data,
                    selectedSignal: res.data[0].signalCode,
                    overlaySignalType: res.data[0].signalCode,
                    selectedSignalDesc: res.data[0].signalDesc,

                });
                this.retrieveSignals(res.data[0].signalCode);
            },
            res=>{
                console.log("retrieveSignalTypes failed", res);
            }
        );
    }

    findSignalDesc = (signalCode)=>{
        this.state.signalTypeList.forEach((st)=>{
            if (st.signalCode === signalCode) {
                this.setState({selectedSignalDesc: st.signalDesc});
            }
        })
    }

    retrieveSignals = (signalType, signalDate)=>{
        console.log('retrieveSignals', signalDate);
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
            },
            res=>{
                console.log("retrieveSignals failed", res.data);
            }
        );
    }

    retrieveCompositePrice = (priceId)=> {

    }

    handleDateChg = (e)=>{
        console.log('handleDateChg', e.target.value);
        this.setState({
            selectedSignalDate: e.target.value
        });
        this.retrieveSignals(this.state.selectedSignal, e.target.value);
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

    componentDidMount() {
        this.retrieveSignalTypes();
    }

    getSignalList = ()=> {
        return this.state.signalList;
    }

    getSignalTypeList = ()=> {
        return this.state.signalTypeList;
    }

    getSelectedSignal = ()=> {
        return this.state.selectedSignal;
    }

    getSelectedSignalDate = ()=> {
        return this.state.selectedSignalDate;
    }
    render() {
        return (
            <div>
                <div className='content-grid'>
                    <div>
                        <div>Signals</div>
                        <div>
                            <ul>
                            {
                            this.state.signalTypeList.map(st=>
                                <li className="sub-title" key={st.signalCode}>
                                    <a href='#' onClick={()=>this.retrieveSignals(st.signalCode)}>{st.signalDesc}</a>
                                </li>
                            )
                            }
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className='info-header'>{this.state.selectedSignalDesc}</div>
                        <SignalResult
                            signalList={this.getSignalList}
                            signalTypeList={this.getSignalTypeList}
                            selectedSignal={this.getSelectedSignal}
                            selectedSignalDate={this.getSelectedSignalDate}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Signals;