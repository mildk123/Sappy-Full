import React, { Component } from "react";
import ServicesComp from '../../Components/ServicesComp'
import Sidebar from '../../Helper/Sidebar'


class Services extends Component {
  constructor() {
    super()
    this.state = {
      visible : false
    }
    this.Sidebar = React.createRef()
  }

  handleShowClick = () => {
    this.Sidebar.current.handleShowClick()
  }
  render() {

    return (
      <Sidebar
      {...this.props}
      ref={this.Sidebar} 
      handleShowClick={this.state.visible}
      >
        <div style={{ height: '100vh'}}>
          <ServicesComp {...this.props}
            handleShowClick={this.handleShowClick}
          />
        </div>
      </Sidebar>

    );
  }
}


export default Services;
