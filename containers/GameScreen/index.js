import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import timer from 'react-native-timer';
import WaveAnimation from '../../components/WaveAnimation';
import { IMAGES, SCREEN } from '../../utiles';
import { GAME_STATUS } from '../../actions';
import { Font } from 'expo';

const mapStateToProps = state => {
	return {
		gameState: state.gameState,
	}
}

class GameScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fishArr: [
				{appear: false},
				{appear: false},
				{appear: false},
				{appear: false},
				{appear: false},
				{appear: false},
				{appear: false},
				{appear: false},
				{appear: false},
			],
			prevFishIdx: 0,
			score: 0,
			gameStatus: this.props.gameState.status,
			timeRemaining: this.props.gameState.duration,
			fontLoaded: false
		}
		this.isFishClicked = false;
	}

	async componentDidMount() {
		await Font.loadAsync({
			'Grobold': require('../../assets/fonts/GROBOLD.ttf'),
		});
		
		this.startShowingFish();
		this.startCountDownTimer();
		this.setState({ fontLoaded: true });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			gameStatus: nextProps.gameState.status,
			timeRemaining: nextProps.gameState.duration,
		});
	}

	componentWillUnmount() {}

	startShowingFish() {
		const showRandomFish = () => {
			const fishCounts = this.state.fishArr.length;
			let fishIdx = null;
			while (1) {
				fishIdx = Math.floor(Math.random() * fishCounts);
				if (fishIdx !== this.state.prevFishIdx)
					break;
			}
			let newFishArr = [...this.state.fishArr];
			newFishArr[fishIdx].appear = true;
			newFishArr[this.state.prevFishIdx].appear = false;
			this.isFishClicked = false;

			this.setState({fishArr: newFishArr, prevFishIdx: fishIdx});
		};

		timer.setInterval(this, 'fishAppearingInterval', () => {
			if (this.gameStatus !== GAME_STATUS.GAME_OVER) {
				showRandomFish();
			} else {
				timer.clearInterval(this, 'fishAppearingInterval');
			}
		}, 1600);
	}

	startCountDownTimer() {
		timer.setInterval(this, 'countDownTimerInterval', () => {
			if (this.state.timeRemaining > 0) {
				this.setState({
					timeRemaining: --this.state.timeRemaining
				});
			} else {
				timer.clearInterval(this, 'countDownTimerInterval');
			}
		}, 1000);
	}

	clickFish() {
		if (!this.isFishClicked) {
			const newScore = this.state.score + 1;
			this.setState({
				score: newScore,
			});
			this.isFishClicked = true;
		}
	}

	render() {
		const resizeMode = 'stretch';
		const TouchableFish = (
			<TouchableOpacity onPress={() => {this.clickFish()}} style={{flex: 1}}>
				<Image style={{flex: 1, width: '100%', height: '100%'}} source={IMAGES['fish_jumping']} resizeMode='cover' />
			</TouchableOpacity>
		);

		const scoreView = (
			<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', padding: 5}}>
				<View style={{flex: 1}}>
					<Image source={IMAGES.score} style={styles.scoreImg} />
					{ this.state.fontLoaded ? <Text style={styles.scoreTxt}>{ this.state.score }</Text> : null }
				</View>
				<View style={{flex: 1}}>
					<Image source={IMAGES.clock} style={styles.scoreImg} />
					{ this.state.fontLoaded ? <Text style={styles.scoreTxt}>:{ this.state.timeRemaining }</Text> : null }
				</View>
			</View>
		);

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
							<View style={{flex: 3}}>
								{ (this.gameStatus !== GAME_STATUS.GAME_OVER)? scoreView : null }
							</View>
						</View>
						<View style={{flex: 14}}>
						</View>
					</ImageBackground>
				</View>
				<View style={{flex: 1}}></View>
				<View style={styles.waveCtn}>
					<WaveAnimation width={SCREEN.width} height={SCREEN.height*1/5}/>
				</View>
				<View style={styles.smallFishCtn}>
					{ this.state.fishArr.slice(0, 5).map(({appear}, index) => (
						<View style={{flex: 1, height: SCREEN.width/5}} key={index}>
							{ appear? TouchableFish : null }
						</View>)
					)}
				</View>
				<View style={styles.bigFishCtn}>
					{ this.state.fishArr.slice(5).map(({appear}, index) => (
						<View style={{flex: 1, height: SCREEN.width/4}} key={index}>
							{ appear? TouchableFish : null }
						</View>)
					)}
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
	},
	waveCtn: {
		position: 'absolute',
		zIndex: 1,
		bottom: 0
	},
	smallFishCtn: {
		position: 'absolute',
		zIndex: 0,
		bottom: '30%',
		flexDirection: 'row'
	},
	bigFishCtn: {
		position: 'absolute',
		zIndex: 0,
		bottom: '10%',
		flexDirection: 'row'
	},
	scoreTxt: {
		flex: 1,
		position: 'absolute',
		top: '35%',
		right: '22%',
		fontFamily: 'Grobold',
		fontSize: 23,
		color: 'white'
	}
}

export default connect(mapStateToProps)(GameScreen)