import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

// importing children components
import Home from './components/Home';
import Loading from './components/Loading';
import PlacesList from './components/PlacesList';
import PlaceDetails from './components/PlaceDetails';

import { Provider } from 'react-redux';
import store from './redux/store';


export default function App(props) {
  return (
    <Provider store={store}>
      <div className="App">

        <h1 className="header"> Thats how would this webpage look on mobile phone: </h1>

        <div className="first-wrapper">
          <div className="second-wrapper">

            <Router>
              <div className="app_container">
                <Route exact path="/" component={Home} />
                <Route exact path="/loading" component={Loading} />
                <Route exact path="/placesList" component={PlacesList} />
                <Route exact path="/placeDetails/" component={PlaceDetails} />
              </div>
            </Router>

          </div>
        </div>
      </div>
    </Provider>
  );
}
