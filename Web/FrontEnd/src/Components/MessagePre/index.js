import React, { Component} from 'react'

import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';
import Placeholder from '../../Assets/adminPlace.png'


export class MessagePre extends Component {

    render() {
        const { position, message, avatar, time } = this.props.message;
        return (
            <MessageBox
                position={position}
                type={'text'}
                title={message}
                titleColor="black"
                avatar={avatar ? (avatar) : (Placeholder)}
                dateString={time}
            />
        )
    }
}

export default MessagePre
