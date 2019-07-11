import React, {Component} from 'react';
import './placesList.css'


export default class placesList extends Component {
    constructor(props) {
      super(props);
      console.log(JSON.parse(localStorage.getItem('PlacesList')));
    }




    /* This function returns html with list of places */
    places_list(){
      let places = JSON.parse(localStorage.getItem('PlacesList'));

      let return_value = [];

      for (var i = 0; i < places.length; i++) {
        let place = places[i];
        return_value.push("<div> place.id </div>");
      }
      console.log("REUTRN VALUE: "+return_value)
      return (return_value);
    }

    render() {
      let places = JSON.parse(localStorage.getItem('PlacesList'));

      /* This const contains final html output that will be used in return */
      const formated_places = places.map((place) =>
        <li>{place.id}</li>
      );


      function PlacesList(props) {
        console.log(props)
        const content = props.places.map((place) =>
          <div key={place.id} className="mt-5">
            <header className="">
              <h5> {place.name} </h5>
            </header>
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

                <PlacesList places={places} className=""/>

              </main>
              <div className="spacer col-1"></div>

            </div>
          </div>

        </div>
      );
    }

  }
