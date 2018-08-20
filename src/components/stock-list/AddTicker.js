import React, {Component} from 'react';

class AddTicker extends Component {
    render() {
        return (
            <div>
                <div>
                    Enter Ticker Symbol
                </div>
                <div>
                    <input id='tickerSymbol' type='text'/>
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </div>
        );
    }
}

export default AddTicker;