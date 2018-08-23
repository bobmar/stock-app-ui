import React, {Component} from 'react';
import { buildUrl
    , SIGNAL_TYPE_LIST
    , SIGNAL_BY_DATE_TYPE 
    , PRICE_COMPOSITE_BY_ID
    , SIGNAL_BY_DATE_TYPES} from '../../config/UrlConfig';
import SignalResult from './SignalResult';
import CompanyInfo from '../stock-list/CompanyInfo';
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
                console.log('Signals.retrieveSignalTypes', this.state);
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

    handleSignalClick = (signalCode)=>{
        this.setState({selectedSignal: signalCode});
        this.findSignalDesc(signalCode);
    }

    retrieveCompositePrice = (priceId)=> {
        let request = {
            priceId: priceId
        }
        axios.post(buildUrl(PRICE_COMPOSITE_BY_ID), request)
        .then(
            res=>{
                this.setState({priceInfo:res.data});
                console.log('Signals.retrieveCompositePrice set priceInfo', res.data);
            },
            res=>{
                console.log('retrieveCompositePrice failed', res);
            }
        );
    }

    renderSection = ()=> {
        let sectionData = '';
        console.log('Signals.renderSection', this.state.priceInfo);
        if (this.state.showCompanyInfo && this.state.priceInfo !== undefined) {
            sectionData = <CompanyInfo priceInfo={this.state.priceInfo}/>
        }
        else {
            sectionData = <SignalResult
                signalTypeList={this.getSignalTypeList}
                selectedSignal={this.getSelectedSignal}
                selectedSignalDate={this.getSelectedSignalDate}
                setPriceId={this.setPriceId}
            />

        }
        return sectionData;
    }

    componentDidMount() {
        this.retrieveSignalTypes();
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

    setPriceId = (priceId)=> {
        console.log('setPriceId retrieve composite price for ' + priceId);
        this.retrieveCompositePrice(priceId);
        this.setState({
            showCompanyInfo: true
        });
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
                                    <a href='#' onClick={()=>this.handleSignalClick(st.signalCode)}>{st.signalDesc}</a>
                                </li>
                            )
                            }
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className='info-header'>{this.state.selectedSignalDesc}</div>
                        {this.renderSection()}
                    </div>
                </div>
            </div>
        )
    }
}
export default Signals;