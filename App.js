GLOBAL.self = GLOBAL;
import React from 'react';
import { Provider, connect } from 'react-redux';
import { 
  createStore, 
  applyMiddleware, 
  combineReducers,
} from 'redux';
import { 
  reduxifyNavigator, 
  createReactNavigationReduxMiddleware, 
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { loadingReducer } from './reducer';
import EnterGame from './containers/EnterGame';
import AppNavigator from './navigator';


const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  isLoading: loadingReducer,
});
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const AppNav = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(AppNav);

const store = createStore(
  appReducer,
  applyMiddleware(middleware),
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
