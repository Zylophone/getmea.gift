import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open || false,
      username: '',
      password: ''
    };

    this.toggleOpen = () => {
      this.setState({open: !this.state.open})
    };
    this.handleOpen = () => {
      this.setState({open: true});
    };
    this.handleClose = () => {
      this.setState({open: false});
    };
    this.handleUsernameChange = (e, newValue) => {
      this.setState({username: newValue})
    }
    this.handlePasswordChange = (e, newValue) => {
      this.setState({password: newValue})
    }
    this.handleSubmit = (e) => {
      e.preventDefault();
      console.log('logging in as ', this.state.username);
      axios.post('/api/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        if (response.data) {
          console.log('response.data : ', response.data);
          this.props.setCurrentUser({username: response.data.username});
          this.setState({open: false});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };
  };

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={!this.state.username || !this.state.password}
        onClick={this.handleSubmit}
      />,
    ];

    // var username = this.props.user.username; 

    return (
      <div>
        <RaisedButton secondary label="Login" onClick={this.handleOpen} />
        <Dialog
          title="Login"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div style={{textAlign: 'center'}}>
            <form>
              <TextField
                onChange={this.handleUsernameChange}
                hintText="username"
                floatingLabelText="username"
                value={this.state.username}
              /><br />
              <TextField
                onChange={this.handlePasswordChange}
                hintText="password"
                floatingLabelText="password"
                type="password"
                value={this.state.password}
              /><br />
            </form>
            <p>Don't have an account? <Link to={'/signup'} open={true} onClick={this.toggleOpen}>Create one</Link></p>
          </div>
        </Dialog>
      </div>
    )
  }


}
