import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { IMAGES, SCREEN } from '../../utiles';

const panelDim = Image.resolveAssetSource(IMAGES.panel);
export default class GamePanel extends React.Component {
	render() {
		const resizeMode = 'contain';
		const pH = SCREEN.height * 0.8;
		const pW = panelDim.width / panelDim.height * pH;
		const pL = (SCREEN.width - pW) / 2;
		const btnCtnOffset = pW * 0.12;
		
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 10}}></View>
				<View style={{flex: 80}}>
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
							<View style={{flex: 1, flexDirection: 'row'}}>
								<Image
									style={{
										flex: 1,
										height: '100%',
										resizeMode
									}}
									source={IMAGES.play}
								/>
								<Image
									style={{
										flex: 1,
										height: '100%',
										resizeMode
									}}
									source={IMAGES.play}
								/>
								<View style={{flex: 0.7}} />
							</View>
						</View>
						<View style={{flex: 22}}></View>
					</ImageBackground>
				</View>
				<View style={{flex: 10}}></View>
			</View>
		);
	}
}

const styles = {
	panel: {
		position: "absolute",
		// top: (SCREEN.height - panelDim.height)/2,
		// left: (SCREEN.width - panelDim.width)/2,
		// transform: [{scale: 0.9}]
	},
	play: {
		position: "absolute",
		top: SCREEN.height/2 - 144,
		// left: SCREEN.width/2 - 106,
		// transform: [{scale: 0.85}]
	},
}