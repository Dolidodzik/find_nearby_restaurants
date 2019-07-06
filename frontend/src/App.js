import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import axios from 'axios';

// importing bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// importing child components
import Home from './components/Home';


function App() {
  return (

    <div className="App">

      <Router>
        <div className="app_container">
          <Route exact path="/" component={Home} />
        </div>
      </Router>

    </div>
  );
}

export default App;
