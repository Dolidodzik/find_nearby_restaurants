import React, { Component } from 'react';
import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className="home_component">

        <div className="containter">
          <div className="row">
            <header className="welcome col-12 top_buffer">
              <h2> Welcome to the <br/>[[app name]] </h2>
            </header>
          </div>
        </div>

      </div>
    );
  }

}

export default Home;
