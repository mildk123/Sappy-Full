import React, { Component, Fragment } from 'react'
import { Input, Dropdown } from 'semantic-ui-react'



const options = [
    { key: 'email', text: 'Email', value: 'email' },
    { key: 'phone', text: 'Phone', value: 'phone' },
    { key: 'providerId', text: 'Provider ID', value: 'providerId' },
    { key: 'username', text: 'Username', value: 'username' },
    { key: 'Skills', text: 'Skills', value: 'skills' },
]

class Inputs extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false
        }
    }

    render() {
        return (
            <Fragment>
                <Input
                    onChange={(e) => { this.props.textChange(e.target.value) }}
                    fluid
                    label={<Dropdown onChange={(event, data) => this.props.dropHandler(event, data)} defaultValue='username' options={options} />}
                    labelPosition='left'
                    placeholder='Search...'
                    action={{
                        onClick: () => this.props.buttonHandler(),
                        color: 'twitter',
                        labelPosition: 'left',
                        icon: 'search',
                        content: 'Search'
                    }}
                />
            </Fragment>
        )
    }
}


export default Inputs
