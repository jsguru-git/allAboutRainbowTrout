import React from 'react';
import { LinearGradient } from 'expo';
import IntroAnimation from '../../components/IntroAnimation';

export default class EnterGame extends React.Component {
  render() {
    return (
      <LinearGradient
        colors={['#00d0ff', '#235c81']}
        style={{flex: 1}}>
        <IntroAnimation />
      </LinearGradient>
    );
  }
}