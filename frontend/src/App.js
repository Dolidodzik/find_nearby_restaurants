import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// importing axois
import axios from 'axios';

// importing bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// importing child components
import Home from './components/Home';
import loading from './components/loading';



class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">

        <Router>
          <div className="app_container">
            <Route exact path="/" component={Home} />
            <Route exact path="/loading" component={loading} />
          </div>
        </Router>

      </div>
    );
  }

}

export default App;
