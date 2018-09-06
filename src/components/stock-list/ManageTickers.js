import React, {Component} from 'react';
import '../../assets/css/Stocks.css';
import ImportTickerList from './ImportTickerList';
import axios from 'axios';
import {buildUrl, TICKER_LIST_SAVE} from '../../config/UrlConfig';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
                            <List>
                            {
                                tickerList.map(t=>
                                <ListItem>
                                    <ListItemText primary={t.tickerSymbol} secondary={t.companyName}/>
                                </ListItem>
                                )
                            }
                            </List>
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