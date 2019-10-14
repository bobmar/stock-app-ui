import React from 'react'
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
const SignalSelected = (props)=> {
    const useStyles = makeStyles(theme => ({
        root: {
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          padding: theme.spacing(0.5),
        },
        chip: {
          margin: theme.spacing(0.5),
        },
        button: {
          margin: theme.spacing(1),
        },
            }));
    
    const showTitle = ()=>{
      if (props.selectedSignals.length > 0) {
        return ( 
          <ListSubheader>Selected Signals ({props.selectedSignals.length})
            <Button className={classes.button} onClick={props.selectClick}>Submit</Button>
          </ListSubheader>
        )
      }
    }
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
          <List>
          {showTitle()}
          {props.selectedSignals.map((st)=>
                <ListItem key={st.signalCode} button divider dense onClick={()=>props.deselectSignal(st)}>
                  <ListItemText>{st.signalDesc}</ListItemText>
                </ListItem>
                )
            }
          </List>
        </Paper>
    )
}

export default SignalSelected