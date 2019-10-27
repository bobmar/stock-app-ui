import React from 'react'
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SignalList = function(props) {
    return (
        <List>
        <ListSubheader>Signals ({props.signalTypeList.length})</ListSubheader>
        {
            props.signalTypeList.map(st=>
            <ListItem key={st.signalCode} button divider dense onClick={()=>props.selectSignal(st)}>
                <ListItemText>{st.signalDesc}</ListItemText>
            </ListItem>
        )}
        </List>
    )
}

export default SignalList
