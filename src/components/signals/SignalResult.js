import React, {Component} from 'react';
import { buildUrl
    , SIGNAL_BY_DATE_TYPE 
    , SIGNAL_BY_DATE_TYPES} from '../../config/UrlConfig'
import '../../assets/css/Stocks.css'
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import SignalRow from './SignalRow'
import SignalHeader from './SignalHeader'
import {Table, TableBody} from '@material-ui/core'

class SignalResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signalTypeList: this.props.signalTypeList(),
            selectedSignal: this.props.selectedSignal()
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
        let queryDate = signalDate;
        if (queryDate === undefined) {
            queryDate = this.state.selectedSignalDate;
        }
        let request = {
            signalDate: queryDate,
            signalType: signalType
        }
        console.log('retrieveSignals request', request);
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
                console.log('retrieveSignals returned ', this.state.signalList);
            },
            res=>{
                this.setState({useLocalSignals: false});
                console.log("retrieveSignals failed", res.data);
            }
        );
    }

    handleDateChg = (e)=>{
        console.log('handleDateChg', e.target.value);
        this.setState({
            selectedSignalDate: e.target.value
        });
        this.retrieveSignals(this.state.selectedSignal, e.target.value);
    }

    retrieveSignalsWithOverlay = (overlaySignal)=> {
        let signalDate = this.state.selectedSignalDate;
        if (signalDate === undefined) {
            signalDate = this.props.selectedSignalDate();
        }
        let request = {
            signalDate: signalDate,
            signalType: this.state.selectedSignal,
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

    noResults = (signalList)=>{
        let nrTag = ''
        if (signalList === undefined || signalList.length === 0) {
            nrTag = <div>No results found</div>
        }
        return nrTag;
    }

    componentDidMount() {
        this.setState(
            {
                selectedSignalDate: this.props.selectedSignalDate(),
                selectedSignal: this.props.selectedSignal(),
                signalTypeList: this.props.signalTypeList()
            }
        );
        console.log('componentDidMount', this.state);
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate' , this.props.selectedSignalDate(), prevProps.selectedSignalDate());
        if (this.props.selectedSignalDate() !== prevProps.selectedSignalDate()) {
            this.setState({selectedSignalDate: this.props.selectedSignalDate()});
        }
        console.log('componentDidUpdate' , this.props.selectedSignal(), prevProps.selectedSignal());
        if (this.props.selectedSignal() !== this.state.selectedSignal) {
            this.setState({selectedSignal: this.props.selectedSignal()});
            this.retrieveSignals(this.props.selectedSignal());
        }
        console.log('componentDidUpdate' , this.props.signalTypeList(), prevProps.signalTypeList());
        if (this.props.signalTypeList().length !== this.state.signalTypeList.length) {
            this.setState({signalTypeList: this.props.signalTypeList()});
        }
        console.log('componentDidUpdate', this.state);
    }

    render() {
        return (
            <div>
                <div>
                    <label htmlFor="priceDate" className="sub-title">Price Date</label>
                    <input type="date" id="priceDate" 
                        defaultValue={this.state.selectedSignalDate} 
                        onChange={this.handleDateChg}/>
                </div>
                <div style={{padding:'5px',margin:'5px 3px 5px 3px'}}>
                    <InputLabel style={{marginRight: '5px'}} htmlFor="overlay-signal">Signal</InputLabel>
                    <Select
                        value={this.state.overlaySignalType}
                        onChange={this.handleOverlaySelect}
                        inputProps={{
                        name: 'signal',
                        id: 'overlay-signal',
                        }}
                    >
                        {this.state.signalTypeList.map(t=>
                        <MenuItem value={t.signalCode}>{t.signalDesc}</MenuItem>
                        )}
                    </Select>
                </div>
                <div>
                {
                    this.state.signalList && (
                        <Table stickyHeader={true} >
                            <SignalHeader/>
                            <TableBody>
                            {this.state.signalList.map(s=>
                                <SignalRow signal={s}/>
                            )}
                            </TableBody>
                        </Table>
                    )
                }
                {this.noResults(this.state.signalList)}
                </div>
            </div>
        )
    }
}

export default SignalResult;