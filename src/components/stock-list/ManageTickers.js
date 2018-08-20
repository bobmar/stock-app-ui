import React, {Component} from 'react';
import '../../assets/css/Stocks.css';
import ImportTickerList from './ImportTickerList';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import axios from 'axios';
import {buildUrl, TICKER_LIST_SAVE} from '../../config/UrlConfig';

class ManageTickers extends Component {
    constructor() {
        super();
        this.state =
            {
                uploadStatus: {
                    keep: [],
                    discard: []
                },
                saveBtnDisabled: true
            };
    }

    setUploadStatus = (status)=> {
        this.setState({
            uploadStatus: status,
            saveMsg: ''
        });
        if (status.discard !== undefined && status.discard.length > 0) {
            this.setState({
                discardMsg: status.discard.length + ' tickers already exist and will be ignored'
            });
        }
        else {
            this.setState({
                discardMsg: ''
            });        
        }
        if (status.keep.length > 0) {
            this.setState({saveBtnDisabled:false});
        }
        else {
            this.setState({saveBtnDisabled:true});
        }
    }

    saveTickerHandler = ()=> {
        axios.post(buildUrl(TICKER_LIST_SAVE), this.state.uploadStatus.keep)
        .then(res=>{
            this.setState({saveMsg: res.data.messageText});
            },
            res=> {
                this.setState({saveMsg: 'Unable to save tickers'})
            }
        )
    }

    render() {
        let tickerList = this.state.uploadStatus.keep; 
        return (
            <div>
                <div className="content-grid">
                    <div>
                        <ImportTickerList callback={this.setUploadStatus}/>
                    </div>
                    <div>
                        <div>
                            <button disabled={this.state.saveBtnDisabled} onClick={this.saveTickerHandler}>
                                Save
                            </button>
                        </div>
                        <div>
                            {this.state.saveMsg}
                        </div>
                        <div>
                            <DataTable value={tickerList} >
                                <Column field="tickerSymbol" header="Ticker"/>
                                <Column field="companyName" header="Company Name"/>
                            </DataTable>
                        </div>
                        <div>
                            {this.state.discardMsg}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManageTickers;