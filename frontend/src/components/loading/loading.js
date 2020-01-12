import React, {Component} from 'react';
import './loading.css'
import store from '../../redux/store';

/* Importing axois */
import axios from 'axios';

/* Importing lib that will be responsible for displaying loading page */
import LoadingScreen from 'react-loading-screen';

/* This component displays simple animation in time of waiting for backend response */
export default class Loading extends Component {

    constructor(props) {
      super(props);

      /* Binding this to CallHomeApiRequest */
      this.CallHomeApiRequest = this.CallHomeApiRequest.bind(this);
    }

    /* This function requests my backend with given data to get list of places json, and pass it to another component */
    CallHomeApiRequest(data) {
      console.log(store.getState())
      let what_to_load = 0;

      if(what_to_load == "PLACES_LIST" ){

        let data_to_pass_to_backend = this.props.location.state.FormDataFromHome;
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
            pathname: '/placesList',
            state: {
              WhatToLoad: null,
              PlacesListData: data,
            }
          })

        }).catch(function (error) {
          console.log(error)
        });

      }else if(what_to_load == "PLACE_DETAILS"){

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
