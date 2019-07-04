import React, { Component } from 'react';
import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className="home_component">

        <div className="containter">
          <div className="row">
            <header className="welcome">
              <h1> Welcome to the [[app name]] </h1>
            </header>
          </div>
        </div>

      </div>
    );
  }

}

export default Home;
