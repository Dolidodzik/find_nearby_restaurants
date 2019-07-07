import React, { Component } from 'react';
import './Home.css';


import Fade from 'react-reveal/Fade';


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      pos: "NULL",
      DropDownMenuVisible: false,
      form: {
        open_now: true,
        min_price: 1,
        max_price: 5,
        keyword: "",
      }
    };
    this.get_position();

  }

  /* this function sets position to got object */
  get_position(){
    navigator.geolocation.watchPosition(
      (position) => {
        // Setting state to got postion
        this.setState({
          pos: position,
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 5 },
    );
  }

  CallHomeApiRequest() {
    console.log(this.state.pos)
  }

  HeaderClickEvent() {
    let value = this.state.DropDownMenuVisible;
    this.setState({
      DropDownMenuVisible: !value
    })
  }

  OnChangeForm(){
    console.log("EHLLO")
    console.log(this.state)
  }

  handleSubmit(event) {
    event.persist()
    console.log(event.target[1].value);
    event.preventDefault()
  }

  render() {

    return (

      <div className="home_component">
        <div className="containter">
          <div className="row">

            <header className="welcome col-12 p-5">
              <h2> Welcome to the <br/>[[app name]] </h2>
            </header>
            <div className="spacer col-1"></div>
              <header className="tip_sentance col-10 p-3">
                <h4> Here you can find nearby restaurants! </h4>
              </header>
            <div className="spacer col-1"></div>

            <form className="col-12" onSubmit={this.handleSubmit.bind(this)}>

              <div className="button_wraper">
                <button type="submit" className="submit_search mt-4 p-2 px-5" onClick={this.CallHomeApiRequest.bind(this)}>
                  Search!
                </button>
              </div>

                  <div className="mt-5 form_fields_container">
                    <h5 onClick={this.HeaderClickEvent.bind(this)}>
                      Search options:
                      { this.state.DropDownMenuVisible && <span className="up_arrow"> &#9650; </span> }
                      { !this.state.DropDownMenuVisible && <span className="dropdown_arrow"> &#9660; </span> }
                    </h5>


                      <Fade when={this.state.DropDownMenuVisible}>
                        <div className="options mt-5" show={this.state.DropDownMenuVisible ? 1 : 0}>

                          <label>
                            Open now:
                            <input type="checkbox"className="ml-2" defaultChecked={true}/>
                          </label>

                          <label>
                            <div className="mt-3"> Keyword: </div>
                            <input placeholder=" &quot;Pizza&quot; for example" type="text" className="col-12 mt-2"/>
                          </label>

                          <label>
                            <div className="mt-4"> Number of stars (from 1 to 5): </div>
                            From:<input placeholder="From" className="col-5 mt-3 mx-2" type="number" min="1" max="5" defaultValue="1"/> <br/>
                            To: <input placeholder="To" className="col-5 mt-2 mx-2" type="number" min="1" max="5" defaultValue="5"/>
                          </label>
                        </div>
                      </Fade>


                  </div>


            </form>

          </div>
        </div>
      </div>

    );
  }

}



export default Home;
