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
      let what_to_load = localStorage.getItem('WhatToLoad');
      if(what_to_load == "PLACES_LIST" ){

        console.log("PLACES LIST")
        let data_to_pass_to_backend = JSON.parse(localStorage.getItem('DataSetInHome'));
        console.log(data_to_pass_to_backend)
        let url = "http://127.0.0.1:8000/api/home"
        axios({
          method: 'post',
          url: url,
          data: data_to_pass_to_backend,
          headers: {
            "content-type": "application/json"
          }
        }).then(function (response) {

          let data = response.data.data[0].json_data;
          console.log(response)
          /* Sending got data to localStorage as JSON string */
          localStorage.setItem('PlacesList', JSON.stringify(data));
          console.log(JSON.parse(localStorage.getItem('PlacesList')))
        }).catch(function (error) {
          console.log(error)
        });

      /* Changing component to placesList */
      this.props.history.push('/placesList')

      }else if(what_to_load == "PLACE_DETAILS"){
        console.log("HELLO")
        /* Getting ID of requested place */
        let place_id = localStorage.getItem('SelectedPlaceID');

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
          let data = response.data[0].json_data;

          /* If optionals fields are "null", replace them with human readable string */
          console.log(data.website)
          if(!data.website){
            data.website = "Not provided"
          }if(!data.formatted_phone_number){
            data.formatted_phone_number = "Not provided"
          }



          /* Sending got data to sessionStorage as JSON string, and setting details to correct one */
          localStorage.setItem("place_details_data", JSON.stringify(data));

          /* Redirecting to place details */
          this.props.history.push('/placeDetails')

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
