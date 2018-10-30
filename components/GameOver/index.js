import React from 'react';
import { View, Text, Image, ImageBackground, Animated, Easing, TouchableOpacity } from 'react-native';
import { IMAGES, createTimingAnimation } from '../../utiles';

export default class GameOver extends React.Component {

    constructor(props) {
        super(props);
        this.flipInYAnimatedValue = new Animated.Value(0);
        this.state = {
            navigation: this.props.navigation,
            restart: this.props.restart,
            score: this.props.score,
        }
    }

    componentDidMount() {
        createTimingAnimation(this.flipInYAnimatedValue, 1, 1000, Easing.linear).start();
    }

    componentWillUnmount() {}

    render() {
        const { navigation, restart, score } = this.state;
        const flipInY = this.flipInYAnimatedValue.interpolate({
            inputRange: [0, 0.4, 0.6, 0.8, 1],
            outputRange: ['90deg', '-20deg', '10deg', '-5deg', '0deg']
        });
        return (
            <View style={styles.container}>
                <Animated.View style={{transform: [{rotateY: flipInY}]}}>
                    <Text style={styles.textStyle}>{ score > 0 ? 'You Win!' : 'You Lose :('}</Text>
                </Animated.View>
                <View style={styles.content}>
                    <ImageBackground
                        source={IMAGES["panel-s"]}
                        imageStyle={styles.panel}
                        style={{flex: 8}}
                    >
                        <View style={styles.scoreCtn}>
                            <Text style={styles.score}>{ this.state.score }</Text>
                            { 
                                score > 0 ? 
                                    (<Image source={IMAGES.yellow_star} style={styles.star}/>) :
                                    (<Image source={IMAGES.gray_star} style={styles.star}/>)
                            }
                        </View>
                    </ImageBackground>
                    <View style={{flex: 3}}>
                        <View style={styles.buttonCtn}>
                            <TouchableOpacity onPress={() => restart()} style={{flex: 1}}>
                                <Image source={IMAGES.restart_btn} style={styles.button} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Enter')} style={{flex: 1}}>
                                <Image source={IMAGES.home_btn} style={styles.button} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const resizeMode = 'contain';
const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'Grobold',
        fontSize: 80,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 1,
    },
    content: {
        width: '30%',
        height: '68%'
    },
    panel: {
        width: '100%',
        height: '100%',
        resizeMode
    },
    scoreCtn: {
        flex: 1,
        alignItems: 'center',
        padding: '5%'
    },
    score: {
        fontFamily: 'Grobold',
        fontSize: 120,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 1,
    },
    star: {
        height: '35%',
        resizeMode
    },
    buttonCtn: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '15%',
        paddingRight: '15%'
    },
    button: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode
    },
}