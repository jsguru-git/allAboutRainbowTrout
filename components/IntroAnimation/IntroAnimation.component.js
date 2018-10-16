import React from 'react';
import { View, Image, Animated, Easing, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';

export default class IntroAnimation extends React.Component {

  constructor(props) {
    super(props);
    this.logo1AnimatedValue = new Animated.Value(0);
    this.logo2AnimatedValue = new Animated.Value(0);
    this.logo3AnimatedValue = new Animated.Value(0);
    this.bubbleAnimatedValue = new Animated.Value(0);
    this.logoWrapperAnimatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.logo1AnimatedValue.setValue(0);
    this.logo2AnimatedValue.setValue(0);
    this.logo3AnimatedValue.setValue(0);
    this.bubbleAnimatedValue.setValue(0);
    this.logoWrapperAnimatedValue.setValue(0);

    // Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);

    Animated.sequence([
      Animated.timing(this.logo1AnimatedValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }),
      Animated.timing(this.logo2AnimatedValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }),
      Animated.timing(this.logo3AnimatedValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }),
      Animated.timing(this.bubbleAnimatedValue, {
        toValue: 2.25,
        duration: 2250,
        easing: Easing.linear
      }),
      Animated.timing(this.logoWrapperAnimatedValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      })
    ]).start();
  }

  componentWillUnmount() {
    // Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const logoTxtMiddleY = [];
    logoTxtMiddleY[0] = height * 0.4;
    logoTxtMiddleY[1] = logoTxtMiddleY[0] + 170;

    const logo1MiddleY = height * 0.4;
    const logo2MiddleY = logo1MiddleY + 170;
    const logo3MiddleY = logo1MiddleY + 10;
    const bubbleMiddleY = logo3MiddleY + 50;
    
    // animations for logo1
    const logo1MoveY = this.logo1AnimatedValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, logo1MiddleY * 0.75, logo1MiddleY, logo1MiddleY - 30 * 0.85,  logo1MiddleY - 30]
    });
    const logo1Scale = this.logo1AnimatedValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [3, 2.9, 1, 1.17, 1.2]
    });
    
    // animations for logo2
    const logo2MoveY = this.logo2AnimatedValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, logo2MiddleY * 0.75, logo2MiddleY, logo2MiddleY - 30 * 0.85,  logo2MiddleY - 30]
    });
    const logo2Scale = this.logo2AnimatedValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [3, 2.9, 1, 1.17, 1.2]
    });
    
    // animations for logo3
    const logo3MoveY = this.logo3AnimatedValue.interpolate({
      inputRange: [0.5, 0.625, 0.75, 0.875, 1],
      outputRange: [logo3MiddleY, logo3MiddleY * 1.02, logo3MiddleY, logo3MiddleY * 1.02, logo3MiddleY]
    });
    const logo3Opacity = this.logo3AnimatedValue.interpolate({
      inputRange: [0, 0.45, 0.5],
      outputRange: [0, 0.1, 1]
    });

    // animations for logoWrapper
    const logoWrapperMoveY = this.logoWrapperAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height]
    });

    const bubbleTransformStyle = [];

    for (let bubbleStart of [0, 0.75, 1.25]) {
      bubbleMoveY = this.bubbleAnimatedValue.interpolate({
        inputRange: [bubbleStart, bubbleStart + 0.25, bubbleStart + 0.5, bubbleStart + 1],
        outputRange: [bubbleMiddleY, bubbleMiddleY * 0.3, bubbleMiddleY * 0.1, -50]
      });
      bubbleOpacity = this.bubbleAnimatedValue.interpolate({
        inputRange: [bubbleStart, bubbleStart + 0.1, bubbleStart + 1],
        outputRange: [0, 1, 1]
      });
      bubbleTransformStyle.push({
        transform: [{ translateY: bubbleMoveY }, { translateX: width/2 - 164 - 20 }, { scale: 0.3 }],
        opacity: bubbleOpacity
      });
    }

    const logo1TransformStyle = {
      transform: [{ translateY: logo1MoveY }, { translateX:  width/2 - 125 }, { scale:logo1Scale }]
    };

    const logo2TransformStyle = {
      transform: [{ translateY: logo2MoveY }, { translateX:  width/2 - 266 }, { scale:logo2Scale }]
    };

    const logo3TransformStyle = {
      transform: [{ translateY: logo3MoveY }, { translateX:  width/2 - 164 }],
      opacity: logo3Opacity
    };

    const logoWrapperTransformStyle = {
      transform: [{ translateY: logoWrapperMoveY }]
    };

    return (
      <View style={{flex: 1}}>
        <Animated.View style={[styles.logoWrapperContainer, logoWrapperTransformStyle]}>
          <Animated.Image
            source={require('./assets/images/logo-1.png')}
            style={[styles.logo1Container, logo1TransformStyle]}
          />
          <Animated.Image
            source={require('./assets/images/logo-2.png')}
            style={[styles.logo2Container, logo2TransformStyle]}
          />
          <Animated.Image
            source={require('./assets/images/logo-3.png')}
            style={[styles.logo3Container, logo3TransformStyle]}
          />
          <Animated.Image
            source={require('./assets/images/bubble.png')}
            style={[styles.logo3Container, bubbleTransformStyle[0]]}
          />
          <Animated.Image
            source={require('./assets/images/bubble.png')}
            style={[styles.logo3Container, bubbleTransformStyle[1]]}
          />
          <Animated.Image
            source={require('./assets/images/bubble.png')}
            style={[styles.logo3Container, bubbleTransformStyle[2]]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  logoWrapperContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logo1Container: {
    position: "absolute",
    top: -100
  },
  logo2Container: {
    position: "absolute",
    top: -200
  },
  logo3Container: {
    position: "absolute",
  },
};
