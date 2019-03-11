import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

// import swal from 'sweetalert'
import AppBar from '../../Helper/Appbar'

import Container from '../../Helper/Container'
import Input from '../../Helper/Input'
import Card from '../../Helper/CardCont'

import firebase from '../../config/firebase.js';
const database = firebase.database().ref()


class EditComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      searchCat: 'username'
    }

    this.checkAuth()
  }

  checkAuth = () => {
    let token = sessionStorage.getItem('SessionToken')
    if (!token) {
      this.props.history.replace('/')
    }
  }

  componentDidMount = () => {
    database.child('Users').on('child_added', (payload) => {
      let databaseKey = payload.key
      let user = payload.val()
      user["databaseKey"] = databaseKey;

      this.setState((previousState, currentProps) => {
        return { ...previousState, userList: [...previousState.userList, user] };
      });

    })
  }



  // Card Action /////////////////////////
  edit = (databaseKey, arrayKey) => {
    console.log(databaseKey);
  }
  chat = (databaseKey, arrayKey) => {
    let currentUser = this.state.userList[arrayKey]
    this.props.history.push('Chat', { currentUser })
  }
  delete = (databaseKey, arrayKey) => {
    database.child('Users').child(databaseKey).remove()

    let array = this.state.userList
    array.splice(arrayKey, 1)
    this.setState({
      requestsForMe: array
    })

  }


  // Search methods /////////////////////////
  dropOnChange = (event, data) => {
    this.setState({
      searchCat: data.value
    })
  }

  searchTextChange = (data) => {
    this.setState({
      searchTerm: data,
      userList : []
    })
  }

  buttonHandler = () => {
    let searchCat = this.state.searchCat
    let searchTerm = this.state.searchTerm
    let fix = searchTerm.charAt(0).toUpperCase()

    database.child('Users').orderByChild(searchCat).startAt(fix).on('child_added', resp => {
      console.log(resp.val())
      let databaseKey = resp.key
      let user = resp.val()
      user["databaseKey"] = databaseKey;

      this.setState((previousState, currentProps) => {
        return { ...previousState, userList: [...previousState.userList, user] };
      });
    })
  }

  render() {
    const { userList } = this.state;
    return (
      <Fragment>

        {/* App Bar//////////////////////// */}
        <AppBar {...this.props}
          variant={'h5'}
          textColor={'inherit'}
          handleShowClick={this.props.handleShowClick}
        >
          Edit Users
        </AppBar>

        {/* Search Card //////////////////////// */}
        <div style={{ paddingBlockStart: 30, paddingBlockEnd: 30, alignContent: 'center' }}>
          <Container>
            <Input
              dropHandler={(event, data) => this.dropOnChange(event, data)}
              textChange={(data) => this.searchTextChange(data)}
              buttonHandler={this.buttonHandler}
            />
          </Container>
        </div>

        {/* Users Card //////////////////////// */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {userList !== {} ?
            (
              userList.map((user, index) => {
                return <Card key={index}
                  dp={user.photoURL}
                  name={user.username}
                  usertype="Service Provider"
                  desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
                  Location={user.userLocation ? (user.userLocation.latitude, user.userLocation.longitude) : "A Random Location"}
                  Phone={user.phone}
                  skills="Alteration | Computer | Photoshop"
                  reviews="none"

                  delete={(databaseKey) => this.delete(databaseKey, index)}
                  edit={(databaseKey) => this.edit(databaseKey, index)}
                  chat={(databaseKey) => this.chat(databaseKey, index)}
                  databaseKey={user.databaseKey}

                />
              })
            )

            : (<Card
              // userImage=
              name="Milad Khan"
              usertype="Service Provider"
              desc="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat"
              Location="2.035 , 26.24"
              Phone="0315-2289013"
              skills="Alteration | Computer | Photoshop"
              reviews="none"
            />)}


        </div>

      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { store: state }
}


export default connect(mapStateToProps)(EditComp);