import React, {Component} from 'react';
import './placesList.scss'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as placesListActions from "../../store/placesList/actions";
export default class placesList extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-places-list">Hello! component placesList</div>;
    }
  }
// export default connect(
//     ({ placesList }) => ({ ...placesList }),
//     dispatch => bindActionCreators({ ...placesListActions }, dispatch)
//   )( placesList );