import React from 'react';
import {LinearGradient} from 'expo';
import GamePanel from '../GampPanel';
import { IMAGES } from '../../utiles';

export default class LearnScreen extends React.Component {
	render() {
		return (
			<LinearGradient
				colors={['#00d0ff', '#235c81']}
				style={{flex: 1}}>
				<GamePanel navigation={this.props.navigation} background={IMAGES["panel-b"]} panelType={'learn'} />
			</LinearGradient>
		);
	}
}