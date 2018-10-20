import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { LinearGradient } from 'expo';
import IntroAnimation from '../IntroAnimation';
import GamePanel from '../../components/GampPanel';

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading
	}
}

class EnterGame extends React.Component {
	render() {
    return (
      <LinearGradient
        colors={['#00d0ff', '#235c81']}
        style={{flex: 1}}>
        { this.props.isLoading? <IntroAnimation /> : <GamePanel /> }
      </LinearGradient>
    );
  }
}

export default connect(mapStateToProps)(EnterGame);