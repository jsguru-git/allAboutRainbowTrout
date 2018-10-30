import React from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import timer from 'react-native-timer';
import WaveAnimation from '../WaveAnimation';
import ThreeTwoOneGo from '../ThreeTwoOneGo';
import GameOver from '../GameOver';
import { IMAGES, SCREEN } from '../../utiles';
import { GAME_STATUS } from '../../actions';

export default class GameScreen extends React.Component {

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
			gameStatus: GAME_STATUS.GAME_WAIT,
			timeRemaining: 15,
		}
		this.isFishClicked = false;
	}

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
			if (this.state.gameStatus !== GAME_STATUS.GAME_OVER) {
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
				this.setState({
					gameStatus: GAME_STATUS.GAME_OVER,
				});
			}
		}, 1000);
	}

	startGame() {
		this.startShowingFish();
		this.startCountDownTimer();
		this.setState({
			gameStatus: GAME_STATUS.GAME_START,
		});
	}

	reset() {
		this.setState({
			score: 0,
			gameStatus: GAME_STATUS.GAME_WAIT,
			timeRemaining: 15,
		});
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
					<Text style={styles.scoreTxt}>{ this.state.score }</Text>
				</View>
				<View style={{flex: 1}}>
					<Image source={IMAGES.clock} style={styles.scoreImg} />
					<Text style={styles.scoreTxt}>:{ this.state.timeRemaining }</Text>
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
								{ (this.state.gameStatus !== GAME_STATUS.GAME_OVER)? scoreView : null }
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
				{ (this.state.gameStatus == GAME_STATUS.GAME_WAIT) ?
					(<View style={styles.overScreen}>
						<ThreeTwoOneGo count={4} callback={this.startGame.bind(this)} />
					</View>) : null}
				{ (this.state.gameStatus == GAME_STATUS.GAME_OVER) ? 
					(<View style={{...styles.overScreen, zIndex: 2}}>
						<GameOver navigation={this.props.navigation} restart={this.reset.bind(this)} score={this.state.score} />
					</View>) : null }
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
		zIndex: 2,
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
	},
	overScreen: {
		flex: 1,
		position: 'absolute',
		top: 0,
		bottom: 0,
		width: SCREEN.width,
		height: SCREEN.height
	}
}