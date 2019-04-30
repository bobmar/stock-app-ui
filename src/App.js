import React, { Component } from 'react';
import './App.css';
import StockList from './components/stock-list/StockList';
import ManageTickers from './components/stock-list/ManageTickers';
import Dashboard from './components/dashboard/Dashboard';
import Signals from './components/signals/Signals';
import Statistics from './components/statistics/Statistics';
import {  BrowserRouter as Router, Route,  Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="grid-container">
        <div className="page-header">Stock Scanner</div>
        <div className="page-menu">

          <Button component={Link} to='/'>Dashboard</Button>
          <Button component={Link} to='/stocks'>Stock List</Button>
          <Button component={Link} to='/signals'>Signal Screen</Button>
          <Button component={Link} to='/statistics'>Statistics Screen</Button>
          <Button component={Link} to='/manage-tickers'>Manage Tickers</Button>

        </div>
        <div className="page-body">
            <Route exact path="/" component={Dashboard}/>
            <Route path="/stocks" component={StockList}/>
            <Route path="/manage-tickers" component={ManageTickers}/>
            <Route path="/signals" component={Signals}/>
            <Route path="/statistics" component={Statistics}/>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
