import React, {Component} from 'react';
import '../../assets/css/Stocks.css';
import axios from 'axios';
import {DASHBOARD_LIST, DASHBOARD_BULL_BEAR, buildUrl} from '../../config/UrlConfig'
import {Table} from 'semantic-ui-react'
import DashboardItem from './DashboardItem'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            resultMap: {
                bearishList: [
                    {
                        "statId": "GOOS:2018-06-25:WKCLSPCT",
                        "priceId": "GOOS:2018-06-25",
                        "statisticType": "WKCLSPCT",
                        "statisticValue": -12.726191418753825,
                        "tickerSymbol": "Loading",
                        "priceDate": "2018-06-25T07:00:00.000+0000"
                     }],
                bullishList: [
                ]
            
            },
            dashboardList: [
                {
                    "statisticCode": "WKCLSPCT",
                    "statisticDesc": "Loading",
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
                            <Table striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Ticker</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='right'>Statistic Value</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                {
                                    this.state.resultMap.bullishList.map(item=>
                                        <DashboardItem key={item.tickerSymbol} item={item} bullbear="positive"/>
                                        )
                            }
                                </Table.Body>
                            </Table>
                        <div style={{padding:'5px'}}>Bearish</div>
                            <Table striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Ticker</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'>Statistic Value</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                            {
                                this.state.resultMap.bearishList.map(item=>
                                    <DashboardItem key={item.tickerSymbol} item={item} bullbear="negative"/>
                                    )
                            }
                            </Table.Body>
                            </Table>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;