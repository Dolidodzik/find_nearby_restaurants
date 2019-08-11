import React, {Component} from 'react';
import './loading.css'

/* Importing axois */
import axios from 'axios';

/* Importing lib that will be responsible for displaying loading page */
import LoadingScreen from 'react-loading-screen';

/* This components should get values, that will be sent to backend to get google api response */
export default class loading extends Component {

    constructor(props) {
      super(props);

      /* Binding this to CallHomeApiRequest */
      this.CallHomeApiRequest = this.CallHomeApiRequest.bind(this);
    }

    /* This function requests my backend with given data to get list of places json, and pass it to another component */
    CallHomeApiRequest(data) {

      let what_to_load = this.props.location.state.WhatToLoad;

      if(what_to_load == "PLACES_LIST" ){

        console.log("PLACES LIST")
        let data_to_pass_to_backend = this.props.location.state.FormDataFromHome;
        console.log(data_to_pass_to_backend)
        let url = "http://127.0.0.1:8000/api/home"
        axios({
          method: 'post',
          url: url,
          data: data_to_pass_to_backend,
          headers: {
            "content-type": "application/json"
          }
        }).then(response => {

          let data = response.data.data[0].json_data;

          /* Changing view and sending data */
          this.props.history.push({
            pathname: '/loading',
            state: {
              WhatToLoad: null,
              PlacesListData: data,
            }
          })

        }).catch(function (error) {
          console.log(error)
        });

      }else if(what_to_load == "PLACE_DETAILS"){
        console.log("HELLO")
        /* Getting ID of requested place */
        let place_id = this.props.location.state.SelectedPlaceID;

        /* Setting up URL */
        let url = "http://localhost:8000/api/details/"+place_id;

        /* Requesting my backend */
        axios({
          method: 'get',
          url: url,
          headers: {
            "content-type": "application/json"
          }
        }).then((response) => {

          /* Getting data */
          let data = response.data[0].json_data.result;

          /* If optionals fields are "null", replace them with human readable string */
          if(!data.website){
            data.website = "Not provided"
          }if(!data.formatted_phone_number){
            data.formatted_phone_number = "Not provided"
          }

          /* Changing view and sending data */
          this.props.history.push({
            pathname: '/placeDetails',
            state: {
              /* This data will be used in placeDetails view */
              WhatToLoad: null,
              PlaceDetailsData: data,
              PlaceId: place_id,

              /* This data will be used in case if user want to back to places list */
              PlacesListData: this.props.location.state.PlacesListData,
            }
          })

        }).catch(function (error) {
          console.log(error)
        });
      /* else everything is ok, prev_details are satisfying */
      }


    }

    render() {
      return (
        <div className="loading_component_container">

          { this.CallHomeApiRequest() }

          <LoadingScreen
              loading={true}
              bgColor='#fff'
              spinnerColor='#9ee5f8'
              textColor='#000'
              //logoSrc='/logo.png'
              text='Loading places...'
          />

        </div>
      );
    }
  }
