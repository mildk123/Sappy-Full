import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import swal from 'sweetalert'

import AppBar from '../../Helper/Appbar'
import Container from '../../Helper/Container'

import { Button, Icon, Input} from 'semantic-ui-react'

import firebase from '../../config/firebase';
const database = firebase.database().ref();

class EditComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      servicesList: [],
      catToAdd: ''
    };

    this.checkAuth()
  }

  checkAuth = () => {
    let token = sessionStorage.getItem('SessionToken')
    if (!token) {
      this.props.history.replace('/')
    } else {
      this.getCategories()
    }
  }

  onTextChange = (catName) => {
    this.setState({
      catToAdd: catName
    })
  }

  addCat = () => {
    const { catToAdd } = this.state;
    if (catToAdd) {
      database.child('Categories').update({
        [catToAdd]: catToAdd
      })
        .then(res => this.setState({ catToAdd: '' }))
        .then(err => swal(err))
    } else {
      swal('Please type category name into the text field.')
    }
  }

  keypress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.addCat()
    }
  }

  getCategories = async () => {
    await database.child('Categories').on('child_added', (payload) => {
      let services = {
        service: payload.val()
      }
      this.setState({
        servicesList: [...this.state.servicesList, services]
      })
      return
    })
  }

  deleteCat = (item, arrayKey) => {
    database.child('Categories').child(item).remove()
      .then(resp => {
        let array = this.state.servicesList
        array.splice(arrayKey, 1)
        this.setState({
          servicesList: array
        })

      })
  }

  render() {
    const { catToAdd, servicesList } = this.state;
    return (
      <Fragment>

        {/* App Bar//////////////////////// */}
        <AppBar {...this.props}
          variant={'h5'}
          textColor={'inherit'}
          handleShowClick={this.props.handleShowClick}
        >
          Services
        </AppBar>

        {/* Input Card //////////////////////// */}
        <div style={{ paddingBlockStart: 30, paddingBlockEnd: 30, alignContent: 'center' }}>
          <Container>
            <Input
              value={catToAdd}
              onKeyPress={this.keypress}
              onChange={(e) => { this.onTextChange(e.target.value) }}
              fluid
              labelPosition='left'
              placeholder='Driver'
              action={{
                onClick: () => this.addCat(),
                color: 'violet',
                labelPosition: 'left',
                icon: 'plus',
                content: 'Add Service'
              }}
            />
          </Container>
        </div>

        {/* Services Card //////////////////////// */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {servicesList.length !== 0 ?
            (servicesList.map((item, index) => {
              return <div key={index} style={{padding: '1%'}}>
                <Button
                  onClick={() => { this.deleteCat(item.service, index) }}
                  animated
                  color='twitter'
                  size='large'
                >
                  <Button.Content visible>{item.service}</Button.Content>
                  <Button.Content hidden>
                    <Icon name='delete' />
                  </Button.Content>
                </Button>
              </div>
            })
            ) :
            (<Button animated>
              <Button.Content visible>No categories added....</Button.Content>
              <Button.Content hidden>
                <Icon name='delete' />
              </Button.Content>
            </Button>)}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { store: state }
}


export default connect(mapStateToProps)(EditComp);