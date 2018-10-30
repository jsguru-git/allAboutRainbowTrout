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
import { loadingReducer, gameStateReducer } from './reducer';
import AppNavigator from './navigator';
import { setCustomText } from 'react-native-global-props';
import { Font } from 'expo';


const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  isLoading: loadingReducer,
  gameState: gameStateReducer,
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
  
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    }
  }
  async componentDidMount() {
		await Font.loadAsync({
			'Grobold': require('./assets/fonts/GROBOLD.ttf'),
		});
		
		this.setState({ 
      fontLoaded: true
    });
    // this.defaultFonts();
  }
  
  defaultFonts() {
    const customTextProps = {
      style: {
        fontFamily: 'Grobold',
        color: 'white',
      }
    }

    setCustomText(customTextProps);
  }
  
  render() {
    return (
      this.state.fontLoaded ?
        (<Provider store={store}>
          <AppWithNavigationState />
        </Provider>) : null
    );
  }
}