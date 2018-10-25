import React from 'react';
import { connect } from 'react-redux';
import { Image, ImageBackground, View, Animated, Easing } from 'react-native';
import { Svg } from 'expo';
// import { Svg, Path, Circle, Rect } from 'react-native-svg';
import { IMAGES, SCREEN, createTimingAnimation } from '../../utiles';
import { GAME_STATUS } from '../../actions';

const { Path } = Svg;

const mapStateToProps = state => {
	return {
		gameState: state.gameState
	}
}

class GameScreen extends React.Component {

	constructor(props) {
		super(props);
		this.wave1AnimatedValue = new Animated.Value(-30);
		this.wave2AnimatedValue = new Animated.Value(-30);
		this.wave3AnimatedValue = new Animated.Value(-30);
		this.state = { circleRadius: new Animated.Value(50), wave1X: 0, wave2X: 0, wave3X: 0 };
		this.waveLength = 150/*175*/;
		// this.state.circleRadius.addListener( (circleRadius) => {
		// 	this._myCircle.setNativeProps({ r: circleRadius.value.toString() });
		// });
		this.wave1AnimatedValue.addListener( (animatedValue) => {
			this.setState({
				wave1X: animatedValue.value
			})
		});
		this.wave2AnimatedValue.addListener( (animatedValue) => {
			this.setState({
				wave2X: animatedValue.value
			})
		});
		this.wave3AnimatedValue.addListener( (animatedValue) => {
			this.setState({
				wave3X: animatedValue.value
			})
		});
	}

	componentDidMount() {
		this.animate();
	}

	componentWillUnmount() {}

	animate() {
		this.wave1Animate(30);
		this.wave2Animate(0);
		this.wave3Animate(-30);
	}

	wave1Animate(start) {
		this.wave1AnimatedValue.setValue(start);
		let end = this.waveLength + start;
		createTimingAnimation(this.wave1AnimatedValue, end, 12000, Easing.linear).start(() => this.wave1Animate(start));
	}
	wave2Animate(start) {
		this.wave2AnimatedValue.setValue(start);
		let end = this.waveLength + start;
		createTimingAnimation(this.wave2AnimatedValue, end, 5000, Easing.linear).start(() => this.wave2Animate(start));
	}
	wave3Animate(start) {
		this.wave3AnimatedValue.setValue(start);
		let end = this.waveLength + start;
		createTimingAnimation(this.wave3AnimatedValue, end, 3000, Easing.linear).start(() => this.wave3Animate(start));
	}

	render() {
		const resizeMode = 'stretch';
		const path = `M-160 44c30 0 
						58-18 88-18s
						58 18 88 18 
						58-18 88-18 
						58 18 88 18
						v44h-352z`;

		const waveInterpolate = {
			inputRange: [0, 1],
			outputRange: [-90, 85]
		}

		// const wave1MoveX = this.wave1AnimatedValue.interpolate(waveInterpolate);
		// const wave2MoveX = this.wave2AnimatedValue.interpolate(waveInterpolate);
		// const wave3MoveX = this.wave3AnimatedValue.interpolate(waveInterpolate);

		const wave1MoveX = this.wave1AnimatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [-90, 85]
		});

		const wave1TransformStyle = {
			transform: [{ translateX: wave1MoveX }],
		}

		const AnimatedPath = Animated.createAnimatedComponent(Path);

		return (
			<View style={styles.container}>
				<View style={{flex: 3}}>
					<ImageBackground
						source={IMAGES.forest}
						imageStyle={{resizeMode}}
						style={{flex: 1}}
					>
						<View style={{flex: 5, flexDirection: 'row'}}>
							<View style={{flex: 4}}></View>
							{ (this.props.gameState.status !== GAME_STATUS.GAME_OVER)? (<View style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-end', padding: 5}}>
								<Image source={IMAGES.score} style={styles.scoreImg} />
								<Image source={IMAGES.clock} style={styles.scoreImg}/>
							</View>) : null }
						</View>
						<View style={{flex: 14}}>
						</View>
					</ImageBackground>
				</View>
				<View style={{flex: 1}}>
					<Svg height={SCREEN.height*2/5} width={SCREEN.width} viewBox="0 24 150 28">
						<AnimatedPath 
							// ref={ ref => this._myCircle = ref }
							d={path}
							x={this.state.wave1X}
							y={0}
							fill="#85bed2"
						/>
						<AnimatedPath 
							d={path}
							x={this.state.wave2X}
							y={3}
							fill="#61a4bf"
						/>
						<AnimatedPath 
							d={path}
							x={this.state.wave3X}
							y={6}
							fill="#458eaf"
						/>
					</Svg>
				</View>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#a2dcf2',
	},
	scoreImg: {
		flex: 1,
		resizeMode: 'contain',
		height: '100%',
	}
}

export default connect(mapStateToProps)(GameScreen)