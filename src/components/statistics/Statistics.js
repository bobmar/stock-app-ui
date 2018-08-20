import React, {Component} from 'react';
import '../../assets/css/Stocks.css';
import {buildUrl, STAT_TYPE_LIST, STAT_LIST} from '../../config/UrlConfig';
import axios from 'axios';

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statTypeList: [
                {
                    "statisticCode": "WKCLSPCT",
                    "statisticDesc": "Loading",
                    "className": null,
                    "showInDashboard": true
                 }
            ],
            statList: [
                {
                    "statId": "DGX:2018-06-25:WKCLSPCT",
                    "priceId": "DGX:2018-06-25",
                    "statisticType": "WKCLSPCT",
                    "statisticValue": 2.2318614300508073,
                    "tickerSymbol": "DGX",
                    "priceDate": "2018-06-25T07:00:00.000+0000"
                 }
            ],
            highValue: 0,
            lowValue: 0,
            selectedStatDesc: '',
            selectedStatCode: '',
            selectedStatDate: ''
        }
    }

    retrieveStatTypeList = ()=>{
        axios.get(buildUrl(STAT_TYPE_LIST))
        .then(
            res=>{
                this.setState({
                    statTypeList: res.data
                });
                this.retrieveStatList(res.data[0].statisticCode)
            },
            res=>{
                console.log('retrieveStatTypeList error', res.data);
            }
        );
    }

    findStatDesc = (statType)=> {
        let statDesc = "Statistic type not found";
        this.state.statTypeList.forEach(
            (st)=>{
                if (st.statisticCode === statType) {
                    statDesc = st.statisticDesc;
                }
            }
        );
        return statDesc;
    }

    retrieveStatList = (type, date, lowValue, highValue)=>{
        let statRequest = {
            statCode: type,
            statDate: date,
            lowValue: lowValue,
            highValue: highValue,
            maxResults: 54
        };
        axios.post(buildUrl(STAT_LIST), statRequest)
        .then(
            res=>{
                this.setState({
                    statList: res.data.statList,
                    lowValue: res.data.lowValue===null?0:res.data.lowValue,
                    highValue: res.data.highValue===null?0:res.data.highValue,
                    selectedStatCode: type,
                    selectedStatDesc: this.findStatDesc(type),
                    selectedStatDate: res.data.statDate.substring(0,10)
                });
            },
            res=>{
                console.log('retrieveStatList error', res.data);
            }
        );
    }

    handleDateChg = (evt)=> {
        console.log("handleDateChg", evt.target.value);
        this.setState({
            selectedStatDate: evt.target.value
        });
    }

    handleFilter = (evt)=> {
        console.log('handleFilter', this.state.lowValue, this.state.highValue);
        this.retrieveStatList(this.state.selectedStatCode, this.state.selectedStatDate, this.state.lowValue, this.state.highValue);
    }

    handleLowValueChg = (evt)=> {
        this.setState({
            lowValue: evt.target.value
        });
    }

    handleHighValueChg = (evt)=> {
        this.setState({
            highValue: evt.target.value
        });
    }

    componentDidMount() {
        this.retrieveStatTypeList();
    }

    render() {
        return (
            <div>
                <div className="content-grid">
                    <div>
                        <div>Statistics List</div>
                        <div>
                            <ul>
                            {
                                this.state.statTypeList.map(s=>
                                    <li key={s.statisticCode} className="sub-title">
                                        <a href='#' onClick={()=>{this.retrieveStatList(s.statisticCode)}}>{s.statisticDesc}</a>
                                    </li>
                                )
                            }
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div style={{fontWeight:'bold'}}>{this.state.selectedStatDesc}</div>
                        <div>
                            <div>
                                <label htmlFor="priceDate" className="sub-title">Price Date</label>
                                <input type="date" id="priceDate" defaultValue={this.state.selectedStatDate}
                                    onChange={this.handleDateChg}
                                />
                            </div>
                            <div>
                                <label htmlFor="fromValue" className="sub-title">From Value</label>
                                <input type="number" id="fromValue" value={this.state.lowValue} onChange={this.handleLowValueChg}/>
                                <label htmlFor="toValue" className="sub-title">To Value</label>
                                <input type="number" id="toValue" value={this.state.highValue} onChange={this.handleHighValueChg}/>
                                <button onClick={this.handleFilter}>Update</button>
                            </div>
                        </div>
                        <div className="info-grid">
                        {
                            this.state.statList.map(stat=>
                                <div key={stat.statId}>
                                    <div className="sub-title">{stat.tickerSymbol}</div>
                                    <div>{stat.statisticValue.toFixed(2)}</div>
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Statistics;