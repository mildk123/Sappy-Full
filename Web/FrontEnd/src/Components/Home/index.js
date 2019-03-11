import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import AppBar from '../../Helper/Appbar'

class HomeComp extends Component {
  constructor(props) {
    super(props);

    this.checkAuth()
  }

  checkAuth = () => {
    let token = sessionStorage.getItem('SessionToken')
    if (!token) {
      this.props.history.replace('/')
    }
  }

  dropOnChange = (event, data) => {
    this.setState({
      searchCat: data.value
    })
  }

  searchTextChange = (data) => {
    this.setState({
      searchTerm: data
    })
  }

  buttonHandler = () => {
    console.log(123)
  }


  render() {
    return (
      <Fragment>

        {/* App Bar//////////////////////// */}
        <AppBar {...this.props}
          variant={'h5'}
          textColor={'inherit'}
          handleShowClick={this.props.handleShowClick}
        >
          Home
        </AppBar>

      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { store: state }
}


export default connect(mapStateToProps)(HomeComp);
