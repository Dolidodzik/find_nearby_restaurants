import React, {Component} from 'react';
import './placesList.css'


export default class placesList extends Component {
    constructor(props) {
      super(props);
      this.getComponent = this.getComponent.bind(this);
    }

    getComponent(event){

      /* presisting event to avoid error */
      event.persist()

      /* Getting ID of clicked place */
      let id = event.target.id;

      /* Saving this ID to sessionStorage */
      sessionStorage.setItem('SelectedPlaceID', id);

      /* Redirecting to place details */
      this.props.history.push('/placeDetails')

      /* Preventing default to avoid errors */
      event.preventDefault()
    }

    render() {
      let places = JSON.parse(localStorage.getItem('PlacesList'));
      console.log(places)
      function PlacesList(props) {

        const content = props.places.map((place) =>
          <div key={place.id} className="mt-5">

            <a href="#" className="place_link">
              <header>
                <h4 id={place.place_id} onClick={props.getComponent}> {place.name} </h4>
              </header>
            </a>
            <div className="info mt-3">
              Address: {place.vicinity} <br/>
              Rating: {place.rating} <br/>
              Price level: {place.price_level} <br/>
            </div>

          </div>
        );

        return (
          <div>
            {content}
          </div>
        );
      }

      return (
        <div className="component-places-list">

          <div className="containter">
            <div className="row">

              <header className="col-12 px-5 mt-5 mb-2">
                <h2> Here are results: </h2>
              </header>

              <div className="spacer col-1"></div>
              <main className="results col-10">

                <PlacesList places={places} className="" getComponent={this.getComponent}/>

              </main>
              <div className="spacer col-1"></div>

            </div>
          </div>

        </div>
      );
    }

  }
