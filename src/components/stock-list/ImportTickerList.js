import React, {Component} from 'react';
import axios from 'axios';
import '../../assets/css/Stocks.css'
import {TICKER_LIST_UPLOAD, buildUrl} from '../../config/UrlConfig';

class ImportTickerList extends Component {
    constructor(props) {
        super(props);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.state ={
            selectedFile: {},
            fileInfoTag:<div>No file selected</div>,
            btnDisabled: true
        };
    }
    
    onFileSelect = (evt)=> {
        this.setState(
            {selectedFile:evt.target.files[0]}
        );
        if (evt.target.files[0] !== undefined) {
            console.log("onFileSelect - file selected");
            this.setState({fileInfoTag:<div>{evt.target.files[0].name}-{evt.target.files[0].size}</div>, btnDisabled: false}); 
        }
        else {
            console.log("onFileSelect - no file selected");
            this.setState({fileInfoTag : <div>No file selected</div>, btnDisabled: true});
        }
    }

    uploadClick = ()=> {
        this.setState({fileInfoTag:<div>File upload in progress</div>});
        var reader = new FileReader();
        reader.onload = (evt)=>{
            console.log('file', this.state.selectedFile);
            this.setState({fileContent:evt.target.result}) ;
            var fd = { 
                fileName:this.state.selectedFile.name,
                fileContent:this.state.fileContent,
                contentType:this.state.selectedFile.type
            }
            axios.post(buildUrl(TICKER_LIST_UPLOAD), fd)
            .then(res=>
                {
                    console.log('success',res);
                    this.props.callback(res.data);
                    this.setState({fileInfoTag:<div>{fd.fileName} has been uploaded</div>, btnDisabled: true});
                },
                res=> {
                    console.log('failure',res);
                    this.setState({fileInfoTag:<div>Failed to load {fd.fileName}</div>, btnDisabled: true});
                }
            );
        }
        reader.readAsDataURL(this.state.selectedFile);
    } 

    render() {
        const fileStyle = {display:'none'};
        return (
            <div>
                <div>
                    <label htmlFor='fileUpload' style={{border:'1px solid black', padding:'3px 7px 3px 7px', margin: '20px 5px 20px 5px', backgroundColor: '#33BBFF', fontSize: '9pt'}}>Select ticker list</label>
                    <input type='file' id='fileUpload' accept='.xls' style={fileStyle} onChange={this.onFileSelect}/>
                </div>
                <div className='sub-title' style={{margin:'7px 3px 7px 3px'}}>
                    {this.state.fileInfoTag}
                </div>
                <button disabled={this.state.btnDisabled} onClick={this.uploadClick}>Upload</button>
            </div>
        );
    }
}
export default ImportTickerList;