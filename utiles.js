import { Dimensions, Animated } from 'react-native';

export const IMAGES = {
    'logo_1': require('./assets/images/logo-1.png'),
    'logo_2': require('./assets/images/logo-2.png'),
    'logo_3': require('./assets/images/logo-3.png'),
    'bubble': require('./assets/images/bubble.png'),
    'panel': require('./assets/images/window_home.png'),
    'play': require('./assets/images/tile_play.png'),
    'learn': require('./assets/images/tile_learn.png'),
}

export const SCREEN = { width, height } = Dimensions.get('window');

export const createTimingAnimation = (animValue, toValue, duration, easing, delay = 0) => {
    return Animated.timing(
        animValue,
        {
            toValue,
            duration,
            easing,
            delay
        }
    );
}