import React, {Component} from 'react';
import '../../assets/css/Stocks.css';
import CompanyInfo from './CompanyInfo';
import axios from 'axios';
import {buildUrl, replacePathVar, TICKER_PAGE, PRICE_COMPOSITE} from '../../config/UrlConfig';

class StockList extends Component {
    constructor() {
        super();
        this.state = {
            tickerList : [
                {'tickerSymbol': '',
                 'companyName': 'Loading...'
                }
            ],
            currentPage: 0,
            pageSize: 15,
            totalPages: 0,
            totalElements: 0,
            selectedPrice: {
                price:    {
                    priceId: '',
                    tickerSymbol: '',
                    priceDate: '',
                    closePrice: 0,
                    openPrice: 0,
                    lowPrice: 0,
                    highPrice: 0,
                    volume: 0,
                    highLowRange: 0,
                    highLowVsClosePct: 0,
                    openCloseVsHighLowPct: 0,
                    closeVsLowDiffPct: 0,
                    closeVsHighDiffPct: 0,
                    dollarVolume: 0,
                    openCloseRange: 0
                },
                signalList: [],
                statisticList: [],
                avgPrices: [
                    {
                        avgList: []
                    }
                ],
                histSignals: {
                    fourWeek: [],
                    eightWeek: [],
                    twelveWeek: []
                },
                ibdStatList:[]
            }
        }
    }

    retrieveTickerPage = (pageNum)=> {
        let url = buildUrl(TICKER_PAGE);
        let queryStr = 'page=' + pageNum + '&size=' + this.state.pageSize;
        axios.get(url + '?' + queryStr)
        .then(
            (res)=>{
                this.setState({
                    tickerList: res.data.content,
                    currentPage: res.data.number,
                    pageSize: res.data.size,
                    totalPages: res.data.totalPages,
                    totalElements: res.data.totalElements
                });
                this.retrieveCompositePrice(this.state.tickerList[0].tickerSymbol);
            },
            (res)=> {
                console.log(res.data);
            }
        );
    }

    nextPage = ()=> {
        let nextPg = this.state.currentPage + 1;
        this.retrieveTickerPage(nextPg);
    }

    prevPage = ()=> {
        let prevPage = this.state.currentPage -1;
        this.retrieveTickerPage(prevPage);
    }

    retrieveCompositePrice = (tickerSymbol)=> {
        axios.get(buildUrl(replacePathVar(PRICE_COMPOSITE, '{tickerSymbol}', tickerSymbol)))
        .then(
            (res)=> {
                this.setState({
                    selectedPrice: res.data
                });
            },
            (res)=> {
                console.log('retrieveCompositePrice', res.data);
            }
        );
    }

    componentDidMount() {
        this.retrieveTickerPage(0);
    }

    render() {
        return (
            <div className="content-grid">
                <div>
                    <div className='sub-title'>Total stocks {this.state.totalElements}  Page {this.state.currentPage + 1}</div>
                    <div><button onClick={this.prevPage}>Previous</button></div>
                    <ul>
                        {this.state.tickerList.map(t=>
                        <li key={t.tickerSymbol}>
                            <a href='#' onClick={()=>this.retrieveCompositePrice(t.tickerSymbol)}>{t.tickerSymbol}</a>
                            <div className="sub-title">{t.companyName}</div>
                        </li>)}
                    </ul>
                    <div><button onClick={this.nextPage}>Next</button></div>
                </div>
                <div>
                    <CompanyInfo priceInfo={this.state.selectedPrice}/>
                </div>
            </div>
        );
    }
}

export default StockList;
