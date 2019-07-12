import React, {Component} from 'react';
import './placeDetails.css'

/* Importing axois */
import axios from 'axios';

/* Importing animations */
import Fade from 'react-reveal/Fade';


export default class placeDetails extends Component {

    constructor(props) {
      super(props);
      this.state ={
        data: "initial_value",
        ReviewsVisible: false,
      }
    }

    /* This function returns html with reviews */
   Reviews(reviews) {

      if(reviews==null){
        /* Getting ID of requested place and setting up name that will be used in sessionStorage */
        let place_id = sessionStorage.getItem('SelectedPlaceID');
        let item_name = "place_details"+place_id;

        /* Getting details then reviews */
        let details = JSON.parse(sessionStorage.getItem(item_name));
        reviews = details.reviews
      }
      console.log(reviews)
      /* Getting ID of requested place and etting up name that will be used in sessionStorage */
      const content = reviews.map((review) =>
        <div key={review.id} className="mt-5">
            <a href="#" className="place_link">
              <header>
                <h4 id={review.place_id} onClick={review.getComponent}> {review.name} </h4>
              </header>
            </a>
            <div className="info mt-3 px-4">
              <a href={review.author_url}>{review.author_name}</a> <br/>
              <div className="mt-2"> {review.text} </div> <br/>
              <div> <b>Rating:</b> {review.rating} </div> <br/>
            </div>
        </div>
      );

      return (
        <div>
          {content}
        </div>
      );
    }

    /* This function handles clicks of reviews header */
    ReviewsClick() {
      let value = this.state.ReviewsVisible;
      this.setState({
        ReviewsVisible: !value
      })
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
       }).then((response) => {

         /* Getting data */
         let data = response.data[0].json_data

         /* Sending got data to sessionStorage as JSON string, and setting details to correct one */
         sessionStorage.setItem(item_name, JSON.stringify(data));
         this.setState({
           data: data,
         });


       }).catch(function (error) {
         console.log(error)
       });
     /* else everything is ok, prev_details are satisfying */
     }else{
       this.setState({
         data: details,
       });
     }
     console.log(this.Reviews(details.reviews))
    }

    render() {

      return (
        <div className="place_details_component">
          <div className="containter">
            <div className="row">

                <div className="spacer col-1"></div>
                  <header className="col-10 p-4 py-5">
                    <h2> Details of {this.state.data.name}! </h2>
                  </header>
                <div className="spacer col-1"></div>

                <div className="col-12"> <b>Address:</b> {this.state.data.vicinity} </div>
                <div className="col-12"> <b>Website:</b> {this.state.data.website} </div>
                <div className="col-12"> <b>Phone:</b> {this.state.data.formatted_phone_number} </div>
                <div className="col-12"> <b>Excat address:</b> {this.state.data.formatted_address} </div>

                <div className="col-12 mt-4"> <b>Rating:</b> {this.state.data.rating} </div>
                <div className="col-12"> <b>Number of ratings:</b> {this.state.data.user_ratings_total} </div>
                <div className="col-12" onClick={this.ReviewsClick.bind(this)}>
                  <b>Reviews:</b>
                  { this.state.ReviewsVisible && <span className="up_arrow"> &#9650; </span> }
                  { !this.state.ReviewsVisible && <span className="dropdown_arrow"> &#9660; </span> }
                </div>
                <Fade when={this.state.ReviewsVisible}>
                  {this.Reviews(null)}
                </Fade>



                <header className="col-12 mt-5">
                  <h4> Photos linked with this place: </h4>
                </header>
                <div className="gallery col-12">

                </div>

            </div>
          </div>
        </div>
      );
    }

  }
