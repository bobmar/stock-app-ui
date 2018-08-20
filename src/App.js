import React, { Component } from 'react';
import './App.css';
import StockList from './components/stock-list/StockList';
import ManageTickers from './components/stock-list/ManageTickers';
import Dashboard from './components/dashboard/Dashboard';
import Signals from './components/signals/Signals';
import Statistics from './components/statistics/Statistics';
import {  BrowserRouter as Router, Route,  Link} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="grid-container">
        <div className="page-header">Stock Scanner</div>
        <div className="page-menu">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/stocks">Stock List</Link></li>
            <li><Link to="/signals">Signal Screen</Link></li>
            <li><Link to="/statistics">Statistics Screen</Link></li>
            <li><Link to="/manage-tickers">Manage Tickers</Link></li>
          </ul>
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
