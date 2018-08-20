import React, {Component} from 'react';
import '../../assets/css/Stocks.css';
import axios from 'axios';
import {DASHBOARD_LIST, DASHBOARD_BULL_BEAR, buildUrl} from '../../config/UrlConfig'

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            resultMap: {
                bearishList: [
                    {
                        "statId": "GOOS:2018-06-25:WKCLSPCT",
                        "priceId": "GOOS:2018-06-25",
                        "statisticType": "WKCLSPCT",
                        "statisticValue": -12.726191418753825,
                        "tickerSymbol": "GOOS",
                        "priceDate": "2018-06-25T07:00:00.000+0000"
                     },
                           {
                        "statId": "PAYC:2018-06-25:WKCLSPCT",
                        "priceId": "PAYC:2018-06-25",
                        "statisticType": "WKCLSPCT",
                        "statisticValue": -11.646725897255452,
                        "tickerSymbol": "PAYC",
                        "priceDate": "2018-06-25T07:00:00.000+0000"
                     },
                           {
                        "statId": "STMP:2018-06-25:WKCLSPCT",
                        "priceId": "STMP:2018-06-25",
                        "statisticType": "WKCLSPCT",
                        "statisticValue": -11.590053797462515,
                        "tickerSymbol": "STMP",
                        "priceDate": "2018-06-25T07:00:00.000+0000"
                     },
                           {
                        "statId": "GRUB:2018-06-25:WKCLSPCT",
                        "priceId": "GRUB:2018-06-25",
                        "statisticType": "WKCLSPCT",
                        "statisticValue": -10.719299122807017,
                        "tickerSymbol": "GRUB",
                        "priceDate": "2018-06-25T07:00:00.000+0000"
                     }
                    ],
                bullishList: [
                    {
                        "statId": "DGX:2018-06-25:WKCLSPCT",
                        "priceId": "DGX:2018-06-25",
                        "statisticType": "WKCLSPCT",
                        "statisticValue": 2.2318614300508073,
                        "tickerSymbol": "DGX",
                        "priceDate": "2018-06-25T07:00:00.000+0000"
                     },
                           {
                        "statId": "TEX:2018-06-25:WKCLSPCT",
                        "priceId": "TEX:2018-06-25",
                        "statisticType": "WKCLSPCT",
                        "statisticValue": 2.468511272833469,
                        "tickerSymbol": "TEX",
                        "priceDate": "2018-06-25T07:00:00.000+0000"
                     },
                           {
                        "statId": "SUPN:2018-06-25:WKCLSPCT",
                        "priceId": "SUPN:2018-06-25",
                        "statisticType": "WKCLSPCT",
                        "statisticValue": 2.626813358209903,
                        "tickerSymbol": "SUPN",
                        "priceDate": "2018-06-25T07:00:00.000+0000"
                     },
                           {
                        "statId": "SNE:2018-06-25:WKCLSPCT",
                        "priceId": "SNE:2018-06-25",
                        "statisticType": "WKCLSPCT",
                        "statisticValue": 2.6741230234609032,
                        "tickerSymbol": "SNE",
                        "priceDate": "2018-06-25T07:00:00.000+0000"
                     }
                ]
            
            },
            dashboardList: [
                {
                    "statisticCode": "WKCLSPCT",
                    "statisticDesc": "Weekly Closing Price Change Pct",
                    "className": null,
                    "showInDashboard": true
                 },
                    {
                    "statisticCode": "DYPCTCHG",
                    "statisticDesc": "Daily Price Percentage Change",
                    "className": null,
                    "showInDashboard": true
                 },
                    {
                    "statisticCode": "UPDNVOL50",
                    "statisticDesc": "Up/Down Volume over past 50 Days",
                    "className": null,
                    "showInDashboard": true
                 },
                    {
                    "statisticCode": "DYPRCV50A",
                    "statisticDesc": "Daily Price vs. 50-day Average",
                    "className": null,
                    "showInDashboard": true
                 },
                    {
                    "statisticCode": "DYPRCV200A",
                    "statisticDesc": "Daily Price vs. 200-day Average",
                    "className": null,
                    "showInDashboard": true
                 }
            ],
            selectedId: 0
        }
    }

    retrieveDashboardStats = (statCode)=> {
        let req = {
            statCode: statCode
        }
        console.log("retrieveDashboardStats", req);
        axios.post(buildUrl(DASHBOARD_BULL_BEAR), req)
        .then(
            (res)=>{
                this.setState({resultMap:res.data});
                this.findStatDesc(statCode);
                console.log("retrieveDashboardStats", res.data);
            },
            (res)=>{
                console.log("Error during retrieval of dashboard stats", res);
            }
        );
    }

    findStatDesc = (statCode)=> {
        this.state.dashboardList.forEach(s=> {
                if (s.statisticCode === statCode) {
                    console.log('findStatDesc', s)
                    this.setState(
                        {
                            selectedStatDesc: s.statisticDesc
                        }
                    )
                }
            }
        );
    }

    retrieveDashboardList = ()=> {
        axios.get(buildUrl(DASHBOARD_LIST))
        .then(
            (res)=>{
                this.setState({dashboardList: res.data});
                this.retrieveDashboardStats(this.state.dashboardList[0].statisticCode);
            },
            (res)=> {
                console.log("Error during retrieval of dashboard list", res);
            }
        );
    }

    componentDidMount() {
        this.retrieveDashboardList();
    }

    render() {
        const dashboardList = this.state.dashboardList;
        return (
            <div>
                <div className="content-grid">
                    <ul>
                        {
                            dashboardList.map(item=>
                                <li key={item.statisticCode} className="sub-title">
                                    <a href='#' onClick={()=>{
                                        this.retrieveDashboardStats(item.statisticCode);
                                    }}>{item.statisticDesc}</a>
                                </li>
                            )
                        }
                    </ul>
                    <div>
                        <div>
                            <label htmlFor="priceDate" className="sub-title">Price Date</label>
                            <input type="date" id="priceDate"/>
                        </div>
                        <div style={{fontWeight:'bold', padding: '3px'}}>{this.state.selectedStatDesc}</div>
                        <div style={{padding:'5px'}}>Bullish</div>
                            <div className="info-grid">
                            {
                            this.state.resultMap.bullishList.map(item=>
                                <div key={item.statId}>
                                    <div className='sub-title'>{item.tickerSymbol}</div>
                                    <div style={{fontWeight:'bold', color:'green'}}>{item.statisticValue.toFixed(2)}</div>
                                </div>
                                )
                            }
                            </div>
                        <div style={{padding:'5px'}}>Bearish</div>
                            <div className="info-grid">
                            {
                            this.state.resultMap.bearishList.map(item=>
                                <div key={item.statId}>
                                    <div className='sub-title'>{item.tickerSymbol}</div>
                                    <div style={{fontWeight:'bold', color:'red'}}>{item.statisticValue.toFixed(2)}</div>
                                </div>
                                )
                            }
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;