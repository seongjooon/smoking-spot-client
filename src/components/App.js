import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import './App.scss';
import Map from './Map';
import New from './New';
import Detail from './Detail';
import login from '../api/login';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: false };
    this.uiConfig = {
      signInFlow: 'redirect',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async user => {
      this.setState({ isSignedIn: !!user });
      try {
        const userToken = await login(user);
        console.log(userToken);
      } catch (err) {
        console.log(err);
      }
    });
  };

  render() {
    const {
      uiConfig,
      state: { isSignedIn },
      props: {
        createSpot,
        getSpotList,
        spotList,
        getSpotDetail,
        selectedSpot,
        coments,
        getComents,
        inputComent,
        submitMessage
      }
    } = this;

    return (
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/home' />} />
        <Route
          exact
          path='/spots'
          render={() => <Map spotList={spotList} getSpotList={getSpotList} />}
        />
        <Route
          exact
          path='/spots/new'
          render={() => {
            if (submitMessage === 'Success!') {
              return <Redirect to='/home' />;
            }
            return <New onSubmit={createSpot} failMessage={submitMessage} />;
          }}
        />
        <Route
          path='/spots/:id'
          render={routeProps => (
            <Detail
              {...routeProps}
              getSpotDetail={getSpotDetail}
              spotDetail={selectedSpot}
              onSubmit={inputComent}
              getComents={getComents}
              comentList={coments}
            />
          )}
        />
        <Route exact path='/home'>
          <div className='main-logo'>
            <div className='logo-smoking'>SMOKING</div>
            <div className='logo-spot'>SPOT</div>
          </div>
          {isSignedIn ? (
            <div>
              <div className='home'>
                <div className='home-buttons'>
                  <Link to='/spots' className='route map-button'>
                    Map
                  </Link>
                  <Link to='/spots/new' className='route new-button'>
                    New
                  </Link>
                  <button
                    className='route signout-button'
                    onClick={() => firebase.auth().signOut()}
                  >
                    Sign out!
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </Route>
      </Switch>
    );
  }
}

export default App;
