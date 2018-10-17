import React from 'react';
import { View } from 'react-native';
import EnterGame from './containers/EnterGame';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <EnterGame />
      </View>
    );
  }
}
