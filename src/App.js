import React, {lazy, Suspense} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import Header from './components/header/header.component';
import CurrentUser from './contexts/current-user/current-user.context';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import {GlobalStyle} from './global.styles';

// import HomePage from './pages/homepage/homepage.component';
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
// import ShopPage from './pages/shop/shop.component';
const ShopPage =lazy(() => import('./pages/shop/shop.component'));
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
const SignInAndSignUpPage = lazy(() => import ('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
// import CheckoutPage from './pages/checkout/checkout.component';
const CheckoutPage = lazy(()=> import('./pages/checkout/checkout.component'));

class App extends React.Component {
  constructor ( ) {
    super();
    this.state = {
      currentUser: null
    }
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const userRef = await createUserProfileDocument(userAuth);
      if (userAuth) {
        userRef.onSnapshot(snapShot => {
          this.setState({currentUser : {
              id: snapShot.id,
              ...snapShot.data()
            }})
          })
        this.setState({currentUser: userAuth});
      }
    }
    )
}
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return <div>
        <GlobalStyle/>
          <CurrentUser.Provider value={this.state.currentUser}>
            <Header />
          </CurrentUser.Provider>
            <ErrorBoundary>
              <Suspense fallback={<div>...Loading</div>}>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                  <Route path='/shop' component={ShopPage} />
                  <Route exact path='/checkout' component={CheckoutPage} />
                  <Route
                    exact
                    path='/signin'
                    render={() =>
                      this.state.currentUser ? (
                        <Redirect to='/' />
                        ) : (
                          <SignInAndSignUpPage />
                          )
                        }
                        />
                </Switch>
              </Suspense>
            </ErrorBoundary>
      </div>
    ;
  }
}

export default App;
