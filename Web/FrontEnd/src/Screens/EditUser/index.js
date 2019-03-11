import React, { Component } from "react";
import EditComp from '../../Components/EditComp'
import Sidebar from '../../Helper/Sidebar'


class Edit extends Component {
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
        <div>
          <EditComp {...this.props}
            handleShowClick={this.handleShowClick}
          />
        </div>
      </Sidebar>

    );
  }
}


export default Edit;