import React, {Component} from 'react';
import './loading.css'
import store from '../../redux/store';
import axios from 'axios';

import LoadingScreen from 'react-loading-screen';

/* This component displays simple animation in time of waiting for backend response */
export default class Loading extends Component {

  constructor(props) {
    super(props);
    this.apiRequest()
  }

  apiRequest(data) {

    let store_data = store.getState().data_for_api_call

    if(store_data.what_to_load === "PLACES_LIST"){
      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/api/home",
        data: store_data,
        headers: {
          "content-type": "application/json"
        }
      }).then(response => {

        let data_for_api_call = {
          PlacesListData: response.data.data[0].json_data,
        }
        store.dispatch({
          type: 'CHANGE_DATA_FOR_API_CALL',
          payload: data_for_api_call
        })
        this.props.history.push({
          pathname: '/placesList',
        })

      }).catch(function (error) {
          console.log(error)
      });

    }else if(store_data.what_to_load === "PLACE_DETAILS"){

      let place_id = store_data.selected_place_id;

      axios({
        method: 'get',
        url: "http://localhost:8000/api/details/"+place_id,
        headers: {
          "content-type": "application/json"
        }
      }).then((response) => {

        let data = response.data[0].json_data.result;
        /* If optional fields are "null", replace them with human-friendly string */
        if(!data.website){
          data.website = "Not provided"
        }if(!data.formatted_phone_number){
          data.formatted_phone_number = "Not provided"
        }

        let data_for_api_call = {
          PlaceDetailsData: data,
          PlaceId: place_id,
        }

        store.dispatch({
          type: 'CHANGE_DATA_FOR_API_CALL',
          payload: data_for_api_call
        })
        this.props.history.push({
          pathname: '/placeDetails',
        })

      }).catch(function (error) {
        console.log(error)
      });

    }
  }

  render() {
    return (
      <div className="loading-component-container">
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
