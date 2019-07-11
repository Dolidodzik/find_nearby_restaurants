import React, {Component} from 'react';
import './placeDetails.css'

/* Importing axois */
import axios from 'axios';

export default class placeDetails extends Component {

    constructor(props) {
      super(props);
      this.state ={
        data: "initial_value",
      }
    }

    /* Getting details before render */
    componentDidMount() {

     /* Getting ID of requested place */
     let place_id = sessionStorage.getItem('SelectedPlaceID');

     /* Setting up name that will be used in sessionStorage */
     let item_name = "place_details"+place_id;

     /* Getting previously saved instance */
     let details = JSON.parse(sessionStorage.getItem(item_name));

     /* If sessionStorage didn't expire/haven't been set, i have to request my backend */
     if (details == null){
       /* Setting up URL */
       let url = "http://localhost:8000/api/details/"+place_id;

       console.log(place_id)
       axios({
         method: 'get',
         url: url,
         headers: {
           "content-type": "application/json"
         }
       }).then(function (response) {

         /* Getting data */
         let data = response.data[0].json_data

         /* Sending got data to sessionStorage as JSON string, and setting details to correct one */
         sessionStorage.setItem(item_name, JSON.stringify(data));
         details = data;


       }).catch(function (error) {
         console.log(error)
       });
     /* else everything is ok, prev_details are satisfying */
     }else{
       //#pass
     }
     console.log(details)
     /* Setting state */
     this.setState({
       data: details,
     });

    }

    render() {

      return (
        <div className="place_details_component">
          <div className="containter">
            <div className="row">

                <div className="spacer col-1"></div>
                  <header className="col-10 p-4 py-5">
                    <h2> Details of NAME! </h2>
                  </header>
                <div className="spacer col-1"></div>

                <div className="col-12"> <b>Rating:</b> {this.state.data.rating} </div>
                <div className="col-12"> <b>Website:</b> {this.state.data.website} </div>

            </div>
          </div>
        </div>
      );
    }

  }
