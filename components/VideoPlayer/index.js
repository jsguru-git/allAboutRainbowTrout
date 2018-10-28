import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import { SCREEN } from '../../utiles';

export default class VideoPlayer extends React.Component {
	state = {
		mute: false,
		fullScreen: false,
		shouldPlay: true,
	}

	handlePlayAndPause = () => {
		this.setState(prevState => ({
			shouldPlay: !prevState.shouldPlay
		}));
	}

	handleVolume = () => {
		this.setState(prevState => ({
			mute: !prevState.mute,
		}));
	}
	render() {
		const { height } = SCREEN;
		
		const videoHeight = height * 0.8 * 0.5;
		const videoWidth = videoHeight * 2;
		return (
			<View style={styles.container}>
				<View style={{flex: 1}}>
					<Video
						source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
						shouldPlay={this.state.shouldPlay}
						resizeMode="cover"
						style={{ width: videoWidth, height: videoHeight }}
						isMuted={this.state.mute}
					/>

					<View style={styles.controlBar}>
						<MaterialIcons
							name={this.state.mute ? "volume-mute" : "volume-up"}
							size={45}
							color="white"
							onPress={this.handleVolume}
						/>
						<MaterialIcons
							name={this.state.shouldPlay ? "pause" : "play-arrow"}
							size={45}
							color="white"
							onPress={this.handlePlayAndPause}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },

   controlBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 45,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "rgba(0, 0, 0, 0.5)",
   }
});