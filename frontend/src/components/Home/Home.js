import React, { Component } from 'react';
import './Home.css';
import store from '../../redux/store';
import { connect } from 'react-redux';

/* Importing animations */
import Fade from 'react-reveal/Fade';


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drop_down_menu_visible: false,
    };
  }

  ChangeDataForApiCall = (data) => {
    this.setState({
      data_for_api_call: data
    });
    store.dispatch({
      type: 'CHANGE_DATA_FOR_API_CALL',
      payload: data
    })
  }

  HeaderClickEvent() {
    let value = this.state.drop_down_menu_visible;
    this.setState({
      drop_down_menu_visible: !value
    })
  }

  handleSubmit(event) {
    /* presisting event to avoid error */
    event.persist()

    /* getting lcoation object (I will call getCurrentPosition from this object) */
    const location_object = window.navigator && window.navigator.geolocation;


    /* This part of code is required to make app work in "real" way

      // Getting location coords
      location_object.getCurrentPosition((position) => {

          // If everything is ok, save location_coords to object
          // Object that contains full data that will be sent to backend
          var data_for_api_call = {
            form: {
              open_now: event.target[1].value,
              keyword: event.target[2].value,
              minprice: event.target[3].value,
              maxprice: event.target[4].value,
              radius: event.target[5].value,
            },
            location_coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          }

          // Changing view and sending data
          this.props.history.push({
            pathname: '/loading',
            state: {
              WhatToLoad: "PLACES_LIST",
              FormDataFromHome: data_for_api_call,
            }
          })

          // Else show errors *
          }, (error) => { })
    */

    var data_for_api_call = {
      form: {
        open_now: event.target[1].value,
        keyword: event.target[2].value,
        minprice: event.target[3].value,
        maxprice: event.target[4].value,
        radius: event.target[5].value,
      },
      location_coords: {
        latitude: null,
        longitude: null,
      }
    }

    /* Changing view and sending data */
    console.log(data_for_api_call)
    this.ChangeDataForApiCall(data_for_api_call)
    this.props.history.push({
      pathname: '/loading',
    })

    /* Preventing default to avoid errors */
    event.preventDefault()
  }

  render() {

    return (

      <div className="home_component">
        <div className="containter">
          <div className="row">

            <header className="welcome col-12 p-5">
              <h2> Welcome to the <br/> foodie </h2>
            </header>
            <div className="spacer col-1"></div>
              <header className="tip_sentance col-10 p-3">
                <h4> Here you can find nearby restaurants! </h4>
              </header>
            <div className="spacer col-1"></div>

            <form className="col-12" onSubmit={this.handleSubmit.bind(this)}>

              <div className="button_wraper">
                <button type="submit" className="submit_search mt-4 p-2 px-5">
                  Search!
                </button>
              </div>

                  <div className="mt-5 form_fields_container">
                    <h5 onClick={this.HeaderClickEvent.bind(this)} className="search_options">
                      Search options:
                      { this.state.drop_down_menu_visible && <span className="up_arrow"> &#9650; </span> }
                      { !this.state.drop_down_menu_visible && <span className="dropdown_arrow"> &#9660; </span> }
                    </h5>


                      <Fade when={this.state.drop_down_menu_visible}>
                        <div className="options mt-5" show={this.state.drop_down_menu_visible ? 1 : 0}>

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

                          <label>
                            <div className="mt-4"> Distance from you (in meters): </div>
                            <input step="100" defaultValue="3000" className="col-8 mb-5 mt-3 mx-2" type="number" min="0" max="20000" /> <br/>
                          </label>
                          <div className="mb-5"></div>

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

const mapStateToProps = (state) => {
  return {
    data_for_api_call: state.data_for_api_call
  };
}
export default connect(mapStateToProps)(Home);
