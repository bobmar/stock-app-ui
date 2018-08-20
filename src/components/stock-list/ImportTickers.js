import React, {Component} from 'react';

class ImportTickers extends Component {

    render() {
        return (
            <div>
                <label htmlFor="tickerList">Enter ticker symbols</label>
                <textarea id="tickerList" rows="10" columns="20"></textarea>
                <div>
                    <button>Upload</button>
                </div>
            </div>
        )
    }
}
export default ImportTickers;