import React from 'react'
import {Grid} from 'semantic-ui-react'

const SignalHeader = function(props) {
    return (
        <Grid.Row celled>
            <Grid.Column>
                <div className='sub-title'>Ticker</div>
            </Grid.Column>
            <Grid.Column>
                <div className='sub-title'>Charts</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">Open</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">High</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">Low</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">Close</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">Volume</div>
            </Grid.Column>
            <Grid.Column width={2}>
                <div className="sub-title">50-Day Price/Vol</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">Comp</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">Rel Str</div>
            </Grid.Column>
            <Grid.Column>
                <div className="sub-title">Grp St</div>
            </Grid.Column>
        </Grid.Row>
    )
}

export default SignalHeader