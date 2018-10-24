import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import SVGImage from 'react-native-svg-image';
import { IMAGES, SCREEN } from '../../utiles';

export default class GameScreen extends React.Component {
	render() {
		const resizeMode = 'stretch';
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 3}}>
					<ImageBackground
						source={IMAGES.forest}
						imageStyle={{resizeMode}}
						style={{flex: 1}}
					></ImageBackground>
				</View>
				<View style={{flex: 2}}>
					{/* <SvgUri
						// source={IMAGES.waves}
						source={{uri:'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg'}}
						width={SCREEN.width}
						height={SCREEN.height/2} /> */}
					<SVGImage
						style={{width: SCREEN.width, height: SCREEN.height/2}}
						source={{uri:'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg'}}
						// source={IMAGES.waves}
					/>
				</View>
			</View>
		);
	}
}