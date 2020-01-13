import React, {Component} from 'react';
import './placeDetails.css'
import axios from 'axios';
import store from '../../redux/store';

import Fade from 'react-reveal/Fade';
import 'react-image-lightbox/style.css';
import Gallery from 'react-grid-gallery';


export default class PlaceDetails extends Component {

    getInitialState(){
      /* Getting data from api */
      this.GetDetailsFromApi();
    }

    constructor(props) {
      super(props);
      this.state ={
        data: "initial_value",
        ReviewsVisible: false,
        GalleryShown: false,
        images: null,
      }
    }

    /* This function handles clicks of reviews header */
    ReviewsHeaderClick() {
      this.setState({
        ReviewsVisible: !this.state.ReviewsVisible
      })
    }

    GetGalleryLinks(){

      console.log("GET GALLERY :LINKS")

      /* Requesting my backend to get images links list */
      axios({
        method: 'get',
        url: "http://localhost:8000/api/image_gallery/"+store.getState().data_for_api_call.PlaceId,
        headers: {
          "content-type": "application/json"
        }
      }).then((response) => {

        let data = response.data[0].json_data;
        let final_data = [];

        for (var i = 0; i < data.length; i++) {

            /* Every photo will be represented by one object with various propeties  */
            let object = {}

            /* Setting propeties under names that are compatible with "react-grid-gallery" library  */
            object.src = data[i].img_url.substring(17);
            object.thumbnailWidth = data[i].width;
            object.thumbnailHeight = data[i].height;
            object.thumbnail = object.src;

            object.image_number = i;
            final_data.push(object);
        }

        /* passing images data to state, and re-rendering after state change (look here to read more https://stackoverflow.com/questions/30782948/why-calling-react-setstate-method-doesnt-mutate-the-state-immediately)  */
        this.setState({
          images: final_data
        },() => {
          this.setState({
            GalleryShown: true,
          })
        })

      }).catch(function (error) {
        console.log(error)
      });

    }

    backToPlacesList(){
      store.dispatch({
        type: 'CHANGE_DATA_FOR_API_CALL',
        payload: store.getState()
      })
      this.props.history.push({
        pathname: '/placesList',
      })
    }

    render() {

      /* Setting data */
      let data = store.getState().data_for_api_call.PlaceDetailsData;

      /* This function returns html with reviews */
      function Reviews(props) {
          const content = props.reviews.map((review) =>
          <div key={review.id} className="mt-5">
              <header>
                <h4 id={review.place_id} onClick={review.getComponent}> {review.name} </h4>
              </header>
              <div className="info mt-3 px-4">
                <a href={review.author_url} target="_blank" rel="noopener noreferrer"> {review.author_name} </a> <br/>
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

      if(data){
        return (
          <div className="place_details_component">
            <div className="containter">
              <div className="row">

                  <div className="spacer col-1"></div>
                    <header className="col-10 p-3 py-5">
                      <h2> Details of
                        <div className="place_name"> {data.name}!</div>
                      </h2>
                    </header>
                  <div className="spacer col-1"></div>

                  <a onClick={this.backToPlacesList.bind(this)} className="col-12 mt-3" href="/placesList"> Back to places list! </a>
                  <a href="/" className="col-12 mb-4"> Back to home! </a>


                  <div className="col-12"> <b>Address:</b> {data.vicinity} </div>
                  <div className="col-12"> <b>Website:</b> {data.website} </div>
                  <div className="col-12"> <b>Phone:</b> {data.formatted_phone_number} </div>
                  <div className="col-12 mb-5"> <b>Excat address:</b> {data.formatted_address} </div>


                  <div className="col-12"> <b>Rating:</b> {data.rating} </div>
                  <div className="col-12"> <b>Number of ratings:</b> {data.user_ratings_total} </div>
                  <div className="col-12" onClick={this.ReviewsHeaderClick.bind(this)}>
                    <b>Reviews:</b>
                    { this.state.ReviewsVisible && <span className="up_arrow"> &#9650; </span> }
                    { !this.state.ReviewsVisible && <span className="dropdown_arrow"> &#9660; </span> }
                  </div>
                  <Fade when={this.state.ReviewsVisible}>
                    { this.state.ReviewsVisible &&
                      <Reviews reviews={data.reviews} className="" getComponent={this.getComponent}/>
                    }
                  </Fade>

                  <header className="col-12 p-5" onClick={this.GetGalleryLinks.bind(this)}>
                    <span className="gallery_header"> Photos linked with this place: </span>
                    { this.state.GalleryShown && <span className="up_arrow"> &#9650; </span> }
                    { !this.state.GalleryShown && <span className="dropdown_arrow"> &#9660; </span> }
                  </header>

                  <Fade left when={this.state.GalleryShown} className="px-5">
                    { this.state.GalleryShown &&
                      <div className="col-12" when={false}>
                        <Gallery images={this.state.images} />
                      </div>
                    }
                  </Fade>

              </div>
            </div>
          </div>
        );
      }else{
        return(
          <div className="place_details_component">

            <h2>
              <div className="place_name"> Nothing found! </div>
            </h2>

            <a href={"/"} className="col-12 mb-4"> Back to home! </a>

          </div>
        );
      }
    }
  }
