import React from 'react'
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'
const SignalSelected = (props)=> {
    const showTitle = ()=>{
      if (props.selectedSignals.length > 0) {
        return ( 
          <ListSubheader>Selected Signals ({props.selectedSignals.length})
            <Button onClick={props.selectClick}>Submit</Button>
          </ListSubheader>
        )
      }
    }
    return (
      <List>
      {showTitle()}
      {props.selectedSignals.map((st)=>
            <ListItem key={st.signalCode} button divider dense onClick={()=>props.deselectSignal(st)}>
              <ListItemText>{st.signalDesc}</ListItemText>
            </ListItem>
            )
        }
      </List>
    )
}

export default SignalSelected