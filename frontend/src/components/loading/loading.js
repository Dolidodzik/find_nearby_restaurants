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
      let data_to_pass_to_backend = JSON.parse(localStorage.getItem('DataSetInHome'));
      let url = "http://127.0.0.1:8000/api/home"
      console.log(data_to_pass_to_backend)
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


      }).catch(function (error) {
        console.log(error)
      });
      let places = JSON.parse(localStorage.getItem('PlacesList'));
      console.log(places)
      /* Changing component to placesList */
      this.props.history.push('/placesList')

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
