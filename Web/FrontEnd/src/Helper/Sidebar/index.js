import React, { Component } from "react";

import { Icon, Menu, Sidebar } from 'semantic-ui-react'


class SideBar extends Component {
  constructor() {
    super()
    this.state = { visible: false }
  }


  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state

    return (

        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='scale down'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
          width='thin'
          >
            <Menu.Item as='a' onClick={() => this.props.history.push('/')}>
              <Icon name='dashboard' />
              Dashboard
            </Menu.Item>
            <Menu.Item as='a' onClick={() => this.props.history.push('/edit')}>
              <Icon name='edit' />
              Edit User
            </Menu.Item>
            <Menu.Item as='a' onClick={() => this.props.history.push('/services')}>
              <Icon name='servicestack' />
              Add Services
            </Menu.Item>
          </Sidebar>

        <Sidebar.Pusher>
          {this.props.children}
        </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
  }
}


export default SideBar;
