import React from 'react'

const DashboardItem = function (props) {
    return (
        <div>
            <div key={props.item.statId}>
                <div className='sub-title'>{props.item.tickerSymbol}</div>
                <div style={{fontWeight:'bold', color:props.color}}>{props.item.statisticValue.toFixed(2)}</div>
            </div>
        </div>
    )
}

export default DashboardItem