import React from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import timer from 'react-native-timer';
import { createTimingAnimation } from '../../utiles';

export default class ThreeTwoOneGo extends React.Component {

    constructor(props) {
        super(props);
        this.flipInAnimatedValue = new Animated.Value(0);
        this.state = {
            count: this.props.count
        }
    }

    componentDidMount() {
        this.startCountDownTimer();
    }

    componentWillUnmount() {}

    startCountDownTimer() {
        timer.setInterval(this, 'countDownTimerInterval', () => {
            const { count } = this.state;
            if (count > 0) {
                this.setState({
                    count: count - 1
                }, this.animate());
            } else {
                timer.clearInterval(this, 'countDownTimerInterval');
                this.props.callback();
            }
        }, 1000);
    }

    animate() {
        this.flipInAnimatedValue.setValue(0);
        createTimingAnimation(this.flipInAnimatedValue, 1, 1100, Easing.linear).start();
    }
    render() {
        const characOpacity = this.flipInAnimatedValue.interpolate({
            inputRange: [0, 0.25, 0.99, 1],
            outputRange: [0, 1, 1, 0]
        });
        const characScale = this.flipInAnimatedValue.interpolate({
            inputRange: [0, 0.25, 1],
            outputRange: [0.3, 1, 1]
        });

        const characTransformStyle = {
            opacity: characOpacity,
            transform: [{ scale: characScale }]
        }
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.wrapStyle, characTransformStyle]}>
                    { this.state.count !== 0 ? 
                        (<Text style={styles.textStyle}>{ this.state.count }</Text>) :
                        <Text style={styles.textStyle}>GO!</Text>
                    }
                </Animated.View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    wrapStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'Grobold',
        fontSize: 120,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 1,
    }
}