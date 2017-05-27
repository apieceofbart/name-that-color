import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import ColorValidator from './ColorValidator';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/:lang/:hex" component={ColorValidator}/>
          <Redirect to="/en/ff0000"/>
        </Switch>
      </Router>
    );
  }
}

export default App;
