import React from 'react'
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'

const SignalList = function(props) {

    return (
        <List>
        <ListSubheader>Signals</ListSubheader>
        {
            props.signalTypeList.map(st=>
            <ListItem key={st.signalCode} button divider dense onClick={()=>this.handleSignalClick(st.signalCode)}>
                <ListItemIcon>
                    <Checkbox 
                        edge="start"
                        checked={st.checked}
                    />
                </ListItemIcon>
                <ListItemText primary={st.signalDesc}/>
            </ListItem>
        )}
        </List>

    )
}

export default SignalList
