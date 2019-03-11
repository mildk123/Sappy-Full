import React, { Component } from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'
import swal from 'sweetalert'

import { storeToken, createUser, } from '../../Redux/Actions/authAction'
import { connect } from 'react-redux';

class AuthModal extends Component {
  constructor() {
    super()
    this.state = { open: false, isLoading: false }
  }

  componentWillReceiveProps(props) {

    let prop = props.state.authReducer.modal
    if (prop) {
      this.setState({
        btnIcon: prop.btnIcon,
        modalTitle: prop.modalTitle,
        modalType: prop.modalType,
        open: true
      })
    }
  }

  show = () => this.setState({ open: true })
  close = () => this.setState({ open: false, email : '' , password : '' })
  onChangeHandler = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  action = (modalType) => {
    const { email, password } = this.state;
    if (!email || !password) {
      swal('Please Enter Email/Password')
    } else {
      this.setState({
        isLoading: true
      })
      if (modalType === 'Register') {
        fetch('http://localhost:5000/admin/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
          })
        }
        )
          .then(data => data.json())
          .then(callback => {
            let response = callback.match
            if (response === false) {
              swal(callback.message)
              this.setState({
                isLoading: false
              })
            } else {
              sessionStorage.setItem('SessionToken', callback.token)
              this.props.onCreateUser({ User: { email: email, password: password } })
              this.props.history.replace('/Home')
            }
          })

          .catch(err => {
            console.log(err.message)
            this.setState({
              isLoading: false
            })
          })

      } else {
        fetch('http://localhost:5000/admin/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email, password: password })
        }
        )
          .then(data => data.json())
          .then(dat => {
            let response = dat.match
            if (response === false) {
              swal(dat.message)
              this.setState({
                isLoading: false
              })
            } else {
              sessionStorage.setItem('SessionToken', dat.token)
              this.props.onStoreToken({ token: dat.token })
              this.props.history.replace('/Home')
            }
          })
          .catch(err => {
            swal(err.message)
            this.setState({
              isLoading: false
            })
            console.log(err.message)
          }
          )
      }
    }
  }

  render() {
    const { open, btnIcon,
      modalTitle,
      modalType } = this.state

    return (
      <div>
        <Modal size='tiny' open={open} onClose={this.close}>
          <Modal.Header>{modalTitle}</Modal.Header>

          <Modal.Content>
            <Grid>

              <Grid.Row columns={1}>
                <Grid.Column >
                  <Input
                    onChange={(text) => { this.onChangeHandler('email', text.target.value) }}
                    tabIndex="1"
                    fluid
                    label={<Icon name='mail' />}
                    type="email"
                    size="large"
                    iconPosition='left'
                    placeholder='Email' />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column >
                  <Input
                    onChange={(text) => { this.onChangeHandler('password', text.target.value) }}
                    tabIndex="2"
                    fluid
                    label={<Icon name='key' />}
                    type="password"
                    size="large"
                    iconPosition='left'
                    placeholder='Password' />
                </Grid.Column>

              </Grid.Row>

            </Grid>

          </Modal.Content>

          <Modal.Actions>
            <Button negative onClick={this.close}>Cancel</Button>

            {!this.state.isLoading ?
              (<Button color='black' icon labelPosition='right' onClick={() => this.action(modalType)}>
                {modalType}
                <Icon name={btnIcon} />
              </Button>) :

              (<Button color='black' loading>
                Loading
              </Button>)
            }
          </Modal.Actions>

        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { modal: state }
}

const mapDispatchToProps = {
  onStoreToken: storeToken,
  onCreateUser: createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);


// export default AuthModal;