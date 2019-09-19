import React from 'react'
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const SignalList = function(props) {
    const useStyles = makeStyles(theme => ({
        root: {
          width: '100%',
          maxWidth: 360,
          backgroundColor: theme.palette.background.paper,
        },
      }));
    const classes = useStyles();
      
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
