import React from 'react';
import { View, Animated, Easing, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { IMAGES, SCREEN, createTimingAnimation } from '../../utiles';

const panelDim = Image.resolveAssetSource(IMAGES.panel);
export default class GamePanel extends React.Component {

	constructor(props) {
		super(props);
		this.panelAnimatedValue = new Animated.Value(0);
		this.btnCtnAnimatedValue = new Animated.Value(0);
	}

	componentDidMount() {
		this.animate();
	}

	componentWillUnmount() {}

	animate() {
		this.panelAnimatedValue.setValue(0);
		this.btnCtnAnimatedValue.setValue(0);
		Animated.sequence([
			createTimingAnimation(this.panelAnimatedValue, 1, 1000, Easing.bezier(0.215, 0.610, 0.355, 1.000)),
			createTimingAnimation(this.btnCtnAnimatedValue, 1, 50, Easing.bezier(0.250, 0.460, 0.450, 0.940))
		]).start();
	}

	render() {
		const resizeMode = 'contain';
		const pH = SCREEN.height * 0.8;
		const pW = panelDim.width / panelDim.height * pH;
		const pL = (SCREEN.width - pW) / 2;
		const btnCtnOffset = pW * 0.12;

		const panelScale = this.panelAnimatedValue.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: [.3, 1.1, .9, 1.03, .97, 1]
		});
		const btnCtnMoveX = this.btnCtnAnimatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [-20, 0]
		});
		const btnCtnOpacity = this.btnCtnAnimatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1]
		});
		
		const panelTransformStyle = {
			transform: [{ scale: panelScale }]
		};
		const btnCtnTransformStyle = {
			transform: [{ translateX: btnCtnMoveX }],
			opacity: btnCtnOpacity
		};
		
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 10}}></View>
				<View style={{flex: 80}}>
					<Animated.View style={[{flex: 1}, panelTransformStyle]}>
						<ImageBackground
							source={IMAGES.panel}
							imageStyle={{resizeMode}}
							style={{
								flex: 1,
								width: pW,
								left: pL
							}}
						>
							<View style={{flex: 28}}></View>
							<View
								style={{flex: 50, paddingLeft: btnCtnOffset, paddingRight: btnCtnOffset}}
							>
								<Animated.View style={[{flex: 1, flexDirection: 'row'}, btnCtnTransformStyle]}>
									<TouchableOpacity onPress={() => this.props.navigation.navigate('Game')}>
										<Image
											style={{
												flex: 1,
												height: '100%',
												resizeMode
											}}
											source={IMAGES.play}
										/>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => this.props.navigation.navigate('Learn')}>
										<Image
											style={{
												flex: 1,
												height: '100%',
												resizeMode
											}}
											source={IMAGES.learn}
										/>
									</TouchableOpacity>
									{/* <View style={{flex: 1}} /> */}
								</Animated.View>
							</View>
							<View style={{flex: 22}}></View>
						</ImageBackground>
					</Animated.View>
				</View>
				<View style={{flex: 10}}></View>
			</View>
		);
	}
}