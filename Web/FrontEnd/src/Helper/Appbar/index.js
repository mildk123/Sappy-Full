import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Button, Icon } from 'semantic-ui-react'


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    signOut: {
        position: 'absolute',
        right: 24
    }
};

class MenuAppBar extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <AppBar position="static" style={{ background: ' linear-gradient(10deg, #4c039b, #7250B9)' }}>
                    <Toolbar>

                        {this.props.goBack ? <IconButton onClick={this.props.history.goBack} className={classes.menuButton}>
                            <Icon
                                className="styles.icon"
                                name={'backward'}
                                size='large'
                                inverted
                            />
                        </IconButton>
                            :
                            <IconButton onClick={this.props.handleShowClick} className={classes.menuButton}>
                                <Icon
                                    className="styles.icon"
                                    name={'bars'}
                                    size='large'
                                    inverted
                                />
                            </IconButton>
                        }

                        <Typography variant="h6" color="inherit" className={classes.grow} >
                            {this.props.children}
                        </Typography>

                        <div className={styles.signOut}>

                            <Button
                                onClick={() => {
                                    sessionStorage.removeItem('SessionToken')
                                    this.props.history.replace('/')
                                }}
                                animated color='twitter' >
                                <Button.Content visible>Logout</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='sign-out' />
                                </Button.Content>
                            </Button>



                        </div>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);

