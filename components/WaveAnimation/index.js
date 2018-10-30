import React from 'react';
import { View, Animated, Easing } from 'react-native';
import { Svg } from 'expo';
import { SCREEN, createTimingAnimation } from '../../utiles';

const { Path } = Svg;

export default class WaveAnimation extends React.Component {

    constructor(props) {
		super(props);
        this.state = { 
            circleRadius: new Animated.Value(50),
            svgWidth: this.props.width? this.props.width : SCREEN.width,
            svgHeight: this.props.height? this.props.height : SCREEN.height,
            wave1X: 0,
            wave2X: 0,
            wave3X: 0 };

        this.wave1AnimatedValue = new Animated.Value(-30);
		this.wave2AnimatedValue = new Animated.Value(-30);
		this.wave3AnimatedValue = new Animated.Value(-30);
		
		this.waveLength = 175;
		// this.state.circleRadius.addListener( (circleRadius) => {
		// 	this._myCircle.setNativeProps({ r: circleRadius.value.toString() });
		// });
		this.wave1Listener = this.wave1AnimatedValue.addListener((animatedValue) => {
			this.setState({
				wave1X: animatedValue.value
			})
		});
		this.wave2Listener = this.wave2AnimatedValue.addListener((animatedValue) => {
			this.setState({
				wave2X: animatedValue.value
			})
		});
		this.wave3Listener = this.wave3AnimatedValue.addListener((animatedValue) => {
			this.setState({
				wave3X: animatedValue.value
			})
		});
    }
    
    componentDidMount() {
		this.animate();
	}

    componentWillUnmount() {
		this.wave1AnimatedValue.removeListener(this.wave1Listener);
		this.wave2AnimatedValue.removeListener(this.wave2Listener);
		this.wave3AnimatedValue.removeListener(this.wave3Listener);
	}
    
    animate() {
		this.wave1Animate(-90);
		this.wave2Animate(-60);
		this.wave3Animate(-30);
	}

	wave1Animate(start) {
		this.wave1AnimatedValue.setValue(start);
		let end = this.waveLength + start;
		createTimingAnimation(this.wave1AnimatedValue, end, 12000, Easing.linear).start((e) => {if (e.finished) {this.wave1Animate(start)}});
	}
	wave2Animate(start) {
		this.wave2AnimatedValue.setValue(start);
		let end = this.waveLength + start;
		createTimingAnimation(this.wave2AnimatedValue, end, 5000, Easing.linear).start((e) => {if (e.finished) {this.wave2Animate(start)}});
	}
	wave3Animate(start) {
		this.wave3AnimatedValue.setValue(start);
		let end = this.waveLength + start;
		createTimingAnimation(this.wave3AnimatedValue, end, 3000, Easing.linear).start((e) => {if (e.finished) {this.wave3Animate(start)}});
	}

    render() {
        const path = `M-160 44c30 0 
						58-18 88-18s
						58 18 88 18 
						58-18 88-18 
						58 18 88 18
						v44h-352z`;

		const AnimatedPath = Animated.createAnimatedComponent(Path);
        return (
            <View style={{flex: 1}}>
                <Svg height={this.state.svgHeight} width={this.state.svgWidth} viewBox="0 24 150 28" preserveAspectRatio="none">
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
        );
    }
}