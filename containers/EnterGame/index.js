import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { LinearGradient } from 'expo';
import IntroAnimation from '../../components/IntroAnimation';

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading
	}
	// return { ...state };
}

class EnterGame extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	isLoading: props.isLoading
		// }
  }
  render() {
    return (
      <LinearGradient
        colors={['#00d0ff', '#235c81']}
        style={{flex: 1}}>
        { this.props.isLoading? <IntroAnimation /> : <Text>This is where the MainWindow will be placed.</Text> }
      </LinearGradient>
    );
  }
}

export default connect(mapStateToProps)(EnterGame);