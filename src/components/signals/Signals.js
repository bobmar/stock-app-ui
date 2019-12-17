import React, {Component} from 'react';
import { buildUrl
    , SIGNAL_TYPE_LIST
    , SIGNAL_BY_DATE_TYPE 
    , SIGNAL_PRICE_BY_TYPE} from '../../config/UrlConfig';
import axios from 'axios';
import SignalSection from './SignalSection'
import SignalList from './SignalList'
import SignalSelected from './SignalSelected'
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
            signalList: [],
            checkedSignals: []
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

    retrieveMultiSignals = (stList)=> {
        let codeList = []
        stList.forEach(
            st=>{codeList.push(st.signalCode)}
        )
        let request = {
            signalTypeList: codeList,
            lookBackDays: 5
        }
        console.log("retrieveMultiSignals", request)
        this.setState({signalList:[]})
        axios.post(buildUrl(SIGNAL_PRICE_BY_TYPE), request)
        .then(
            res=>{
                this.setState(
                    { signalList: res.data }
                )
                if (res.data.length > 0) {
                    this.setState({
                        selectedSignalDate: res.data[0].priceDate.substring(0,10),
                    })
                }
            },
            res=>{
                this.setState({useLocalSignals: false});
                console.log("retrieveMultiSignals failed", res.data);
            }
        )
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

    handleSelectedSignal = (st)=> {
        let checkedSignals = this.state.checkedSignals
        checkedSignals.push(st);
        checkedSignals.sort((o1,o2)=>{return (o1.signalDesc > o2.signalDesc?1:o1.signalDesc < o2.signalDesc?-1:0)})
        let signalList = this.state.signalTypeList.filter((item)=>{return (item.signalCode !== st.signalCode)})
        signalList.sort((o1,o2)=>{return (o1.signalDesc > o2.signalDesc?1:o1.signalDesc < o2.signalDesc?-1:0)})
        this.setState({checkedSignals:checkedSignals,signalTypeList:signalList})
        console.log(st)
    }

    handleDeselectedSignal = (st)=> {
        let checkedSignals = this.state.checkedSignals.filter((item)=>{return (item.signalCode !== st.signalCode)})
        let signalTypeList = this.state.signalTypeList;
        signalTypeList.push(st);
        this.setState({checkedSignals:checkedSignals,signalTypeList:signalTypeList})
        console.log(checkedSignals, signalTypeList)
    }

    handleSearchClick = ()=> {
        console.log("handleSearchClick")
        this.retrieveMultiSignals(this.state.checkedSignals)
    }

    render() {
        return (
            <div>
                <div className='content-grid'>
                    <div>
                        <SignalSelected selectedSignals={this.state.checkedSignals}
                            deselectSignal={this.handleDeselectedSignal}
                            selectClick={this.handleSearchClick}
                        />
                        <SignalList signalTypeList={this.state.signalTypeList} 
                            signalClickHandler={this.handleSignalClick} 
                            selectSignal={this.handleSelectedSignal} 
                        />
                    </div>
                    <div>
                        <div className='info-header'>{this.state.signalList.length>0?'Found ' + this.state.signalList.length + ' signals':''}</div>
                        {this.renderSection()}
                    </div>
                </div>
            </div>
        )
    }
}
export default Signals;