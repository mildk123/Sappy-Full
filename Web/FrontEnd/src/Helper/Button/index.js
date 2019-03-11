import React, { Component, Fragment } from 'react'
import { Button, Icon } from 'semantic-ui-react'


import { fireModal } from '../../Redux/Actions/authAction'
import { connect } from 'react-redux';

import Modal from '../Modal'

class AuthButtons extends Component {
  constructor() {
    super()
    this.state = {}
  }

  changeModal = (modal) => {
    const currentModal = {
      modalType: modal,
      modalTitle: (modal === 'Register' ? "Create Account" : 'Login'),
      btnIcon: (modal === 'Register' ? "user circle" : 'sign-in'),
    }
    this.props.onFireModal({ modal: currentModal });
  }


  render() {
    return (
      <Fragment>
        <Modal
          {...this.props}
        />
        <div>
          <Button.Group>
            <Button
              // onClick={() => this.renderModal('Register')}
              onClick={() => this.changeModal('Register')}
              animated color='black' primary >
              <Button.Content visible>Register</Button.Content>
              <Button.Content hidden>
                <Icon name='user circle' />
              </Button.Content>
            </Button>

            <div style={{ margin: 3 }} />
            <Button
              onClick={() => this.changeModal('Login')}
              animated size="large" color="red"  >
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden>
                <Icon name='sign-in' />
              </Button.Content>
            </Button>
          </Button.Group>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    state
  }

}

const mapDispatchToProps = ({
  onFireModal: fireModal
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButtons);

// export default AuthButtons;