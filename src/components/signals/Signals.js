import React, {Component} from 'react';
import { buildUrl
    , SIGNAL_TYPE_LIST
    , SIGNAL_BY_DATE_TYPE 
    , PRICE_COMPOSITE_BY_ID
    , SIGNAL_BY_DATE_TYPES} from '../../config/UrlConfig';
import SignalResult from './SignalResult';
import CompanyInfo from '../stock-list/CompanyInfo';
import axios from 'axios';
import SignalSection from './SignalSection'
import SignalList from './SignalList'
import { makeStyles } from '@material-ui/core/styles';
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
            overlaySignalType: '',
            signalList: []
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
                    selectedSignalDesc: res.data[0].signalDesc

                });
                console.log('Signals.retrieveSignalTypes', this.state);
                this.retrieveSignals(res.data[0].signalCode)
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
        this.setState({selectedSignal: signalCode})
        this.findSignalDesc(signalCode)
        this.retrieveSignals(signalCode)
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

    toggleCompanyInfo = ()=>{
        this.setState(
            {
                showCompanyInfo: !this.state.showCompanyInfo
            }
        );
    }

    retrieveSignals = (signalType, signalDate)=>{
        let queryDate = signalDate;
        if (queryDate === undefined) {
            queryDate = this.state.selectedSignalDate;
        }
        let request = {
            signalDate: queryDate,
            signalType: signalType
        }
        console.log('retrieveSignals request', request);
        this.setState({signalList:[]})
        axios.post(buildUrl(SIGNAL_BY_DATE_TYPE), request)
        .then(
            res=>{
                this.setState(
                    {
                        signalList: res.data
                    }
                )
                if (res.data.length > 0) {
                    this.setState({
                        selectedSignalDate: res.data[0].priceDate.substring(0,10),
                        selectedSignal: signalType
                    })
                }
            },
            res=>{
                this.setState({useLocalSignals: false});
                console.log("retrieveSignals failed", res.data);
            }
        );
    }


    renderSection = ()=> {
        let sectionData = '';
        sectionData = <SignalSection
            signalTypeList={this.getSignalTypeList}
            selectedSignal={this.getSelectedSignal}
            selectedSignalDate={this.getSelectedSignalDate}
            signalList={this.state.signalList}
        />

        return sectionData;
    }

    componentDidMount() {
        this.retrieveSignalTypes()
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
                        <div>
                            <SignalList signalTypeList={this.state.signalTypeList}/>
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