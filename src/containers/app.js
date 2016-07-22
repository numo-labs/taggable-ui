import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/tag.js';
import Taggable from './taggable.js';
import { Button, PageHeader } from 'react-bootstrap';

export class App extends Component {

  constructor () {
    super();
    this.showLock = this.showLock.bind(this);
  }

  componentWillMount () {
    this.lock = new Auth0Lock('RZLhUdfEWg19ivkAzjQhGMeVAcC93Ck9', 'numo-labs.eu.auth0.com');
  }

  showLock () {
    this.lock.show((err, profile, token) => {
      if (err) {
        console.log('Error signing in', err);
        return null;
      } else {
        localStorage.setItem('userToken', token);
      }
      if (profile.app_metadata.taggy && profile.app_metadata.taggy.R) { // permissions exist and read permission exists
        console.log('permissions', profile.app_metadata.taggy);
        const permissions = profile.app_metadata.taggy;
        const readOnly = !permissions.C;
        this.props.savePermissions(token, readOnly);
      } else {
        this.props.setLoginError();
      }
    });
  }

  render () {
    if (!this.props.loggedIn) {
      return (
        <div className='container'>
          <PageHeader style={{textAlign: 'center'}}> Numo Labs Taggable System Editor </PageHeader>
          {this.props.loginError && <div>You do not have permission to view Taggy. Try logging in with a different account or request permission</div>}
          <div style={{width: '50%', margin: '0 auto'}}>
            <Button bsSize='large' block bsStyle='success' onClick={this.showLock}> Login </Button>
          </div>
        </div>
      );
    } else {
      return (
        <Taggable />
      );
    }
  }
}

App.propTypes = {
  loginError: PropTypes.bool,
  loggedIn: PropTypes.bool,
  setLoginError: PropTypes.func,
  savePermissions: PropTypes.func
};

function mapStateToProps (state) {
  const {
    taggable: {
      loginError,
      loggedIn
    }
   } = state;

  return {
    loginError,
    loggedIn
  };
}

export default connect(mapStateToProps, Actions)(App);
