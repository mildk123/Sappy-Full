import React from 'react'
import { Icon, Button } from 'semantic-ui-react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Elliot from '../../Assets/elliot.jpg'

const styles = {
  card: {
    maxWidth: 345,
    backgroundColor: '#7c6aa3',
    borderRadius: 15,
  },
  media: {
    minHeight: 300,
  },
  more: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 14,
    color: '#ffffff'
  },
  name: {
    fontSize: 25,
    color: '#ffffff'
  }
};



class UserCard extends React.Component {
  render() {
    const { name, usertype, desc, Location, Phone, skills, reviews, dp, databaseKey } = this.props
    return (
      <div style={{ margin: 20, }}>
        <Card style={styles.card}>

          <CardActions style={{ paddingInlineStart: '20%' }}>
            <Button
              onClick={() => this.props.delete(databaseKey)}
              icon color="youtube" >
              <Icon name='cancel' />
              <span>Delete</span>
            </Button>
            <Button
              onClick={() => this.props.edit(databaseKey)}
              icon color="twitter">
              <Icon name='edit outline' />
              <span>Edit</span>
            </Button>
            <Button
              onClick={() => this.props.chat(databaseKey)}
              icon color="violet">
              <Icon name='chat' />
              <span>Chat</span>
            </Button>
          </CardActions>

          <CardActionArea>

            <CardMedia
              style={styles.media}
              image={dp ? (dp) : Elliot}
              title="Contemplative Reptile"
            />

            <CardContent>
              <Typography style={styles.name}>
                {name}
              </Typography>
              <Typography style={styles.more}>{desc}</Typography>

              <Typography style={styles.more}>
                <Icon name='map marker alternate' />
                Location : {Location}
              </Typography>

              <Typography style={styles.more}>
                <Icon name='user' />
                Location : {usertype}
              </Typography>


              <Typography style={styles.more}>
                <Icon name='call' />
                Phone : {Phone}
              </Typography>

              <Typography style={styles.more}>
                <Icon name='file text' />
                Skills : {skills}
              </Typography>

              <Typography style={styles.more}>
                <Icon name='chat' />
                Reviews : {reviews}
              </Typography>

            </CardContent>

          </CardActionArea >
        </Card >
      </div >
    );

  }
}


export default withStyles(styles)(UserCard);





// import React, {Fragment} from 'react'
// import {Card, Icon, Button } from 'semantic-ui-react'

// class UserCard extends React.Component {
//   render() {
//     const { name, usertype, desc, Location, Phone, skills, reviews, dp } = this.props
//     return (
//       <div style={{ margin: 20, }}>


//         <Card
//           image={dp ? (dp) : (Elliot)}
//           header={name}
//           meta={usertype}
//           description={desc}
//           extra={<Fragment>

//             <div style={{ position: 'absolute', top: 1, left: 1, padding: 5 }}>
//               <Button icon color="youtube" >
//                 <Icon name='cancel' />
//               </Button>

//               <Button icon color="twitter">
//                 <Icon name='edit outline' />
//               </Button>

//               <Button icon color="violet">
//                 <Icon name='chat' />
//               </Button>
//             </div>

//             <p>
//               <Icon name='map marker alternate' />
//               Location : {Location}
//             </p>

//             <p>
//               <Icon name='call' />
//               Phone : {Phone}
//             </p>
//             <p>
//               <Icon name='file text' />
//               Skills : {skills}
//             </p>
//             <p>
//               <Icon name='chat' />
//               Reviews : {reviews}
//             </p>
//           </Fragment>}
//         />
//       </div >
//     )
//   }
// }

