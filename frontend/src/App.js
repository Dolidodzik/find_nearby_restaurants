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
import placesList from './components/placesList';
import placeDetails from './components/placeDetails';


class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">

        <h1 className="header"> Thats how would this webpage look on mobile phone: </h1>

        <div className="first-wrapper">
          <div className="second-wrapper">

            <Router>
              <div className="app_container">
                <Route exact path="/" component={Home} />
                <Route exact path="/loading" component={loading} />
                <Route exact path="/placesList" component={placesList} />
                <Route exact path="/placeDetails/" component={placeDetails} />
              </div>
            </Router>

          </div>
        </div>

      </div>
    );
  }

}

export default App;
