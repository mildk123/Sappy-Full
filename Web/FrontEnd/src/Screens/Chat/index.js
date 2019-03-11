import React, { Component, Fragment } from 'react'

import AppBar from '../../Helper/Appbar'
import Container from '../../Helper/Container'
import swal from 'sweetalert'

import { Input } from 'semantic-ui-react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';

import firebase from '../../config/firebase'
import MessagePre from '../../Components/MessagePre';
const database = firebase.database().ref()


export class Chat extends Component {
    constructor() {
        super()
        this.state = {
            message: '',
            receiverData: '',
            msgsList: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.location.state.currentUser !== prevState.receiverData) {
            return {
                receiverData: nextProps.location.state.currentUser,
            };
        }
        else
            return null;
    }

    componentDidMount = () => {
        let receiverData = this.state.receiverData
        database.child('Chats').child(receiverData.firebaseUid).child('Admin').on('child_added', response => {
            if (response.val().senderUID === 'Admin') {
                let obj = {
                    date: response.val().date,
                    message: response.val().message,
                    receiverUID: response.val().receiverUID,
                    senderUID: response.val().senderUID,
                    time: response.val().time,
                    position: 'right',
                    email: "admin@helper.com",
                    username: 'Admin $'
                }

                this.setState({
                    msgsList: [...this.state.msgsList, obj]
                })

            } else {
                alert('user')
                let obj = {
                    date: response.val().date,
                    message: response.val().message,
                    receiverUID: response.val().receiverUID,
                    senderUID: response.val().senderUID,
                    time: response.val().time,
                    position: 'left',
                    avatar: receiverData.photoURL,
                    email: receiverData.phone,
                    username: receiverData.username
                }
                this.setState({
                    msgsList: [...this.state.msgsList, obj]
                })
            }

        })
    }

    sendMessage = (receiverUID) => {
        const { message } = this.state;
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


        if (message) {
            database.child('Chats').child(receiverUID).child('Admin').push({
                message: message,
                senderUID: 'Admin',
                receiverUID: receiverUID,
                time: time,
                date: date
            })
                .then(res => this.setState({ message: '' }))
                .then(err => swal(err))
        } else {
            swal('Please type your message into the text field.')
        }

    }
    
    onTextChange = (message) => {
        this.setState({
            message: message
        })
    }

    keypress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.sendMessage(this.state.receiverData.firebaseUid)
        }
    }

    render() {
        const { message, receiverData, msgsList } = this.state;
        return (
            <Fragment>
                {/* App Bar//////////////////////// */}
                <AppBar {...this.props}
                    variant={'h5'}
                    textColor={'inherit'}
                    handleShowClick={this.props.handleShowClick}
                    goBack={true}
                    {...this.props}
                >
                    Chat
                    </AppBar>


                {/* Messages Card ////////////////////////*/}
                <Card style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'none'
                }}>
                    <CardContent style={{ maxHeight: '80vh', overflowX: 'auto', minWidth: '55vw' }}>
                        <CardHeader style={{ backgroundColor: '#37A2F2', borderRadius: 25, paddingLeft: '10%' }}
                            title={this.state.receiverData.username}
                            subheader={this.state.receiverData.email}
                            titleTypographyProps={{ color: 'inherit' }}
                            subheaderTypographyProps={{ color: 'inherit' }}
                        />
                        {msgsList.map((chat, index) =>
                            <MessagePre key={index} message={chat} />
                        )}
                    </CardContent>
                </Card>

                } />




            {/* Input Card //////////////////////// */}
                <div style={{ position: 'absolute', bottom: 1, left: 1, right: 1, paddingBottom: 50 }}>
                    <Container>
                        <Input
                            value={message}
                            onKeyPress={this.keypress}
                            onChange={(e) => { this.onTextChange(e.target.value) }}
                            fluid
                            labelPosition='left'
                            placeholder='Enter message...'
                            action={{
                                onClick: () => this.sendMessage(receiverData.firebaseUid),
                                color: 'violet',
                                labelPosition: 'right',
                                icon: 'send',
                                content: 'Send'
                            }}
                        />
                    </Container>
                </div>


            </Fragment >
        )
    }
}

export default Chat

