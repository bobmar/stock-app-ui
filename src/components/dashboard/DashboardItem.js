import React from 'react'
import {Table} from 'semantic-ui-react'

const DashboardItem = function (props) {
    return (
        <Table.Row>
            <Table.Cell>{props.item.tickerSymbol}</Table.Cell>
            <Table.Cell textAlign='right'>{props.item.statisticValue.toFixed(2)}</Table.Cell>
        </Table.Row>
    )
}

export default DashboardItem