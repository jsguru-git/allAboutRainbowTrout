import { Dimensions, Animated } from 'react-native';

export const IMAGES = {
    'logo_1': require('./assets/images/logo-1.png'),
    'logo_2': require('./assets/images/logo-2.png'),
    'logo_3': require('./assets/images/logo-3.png'),
    'bubble': require('./assets/images/bubble.png'),
    'panel': require('./assets/images/window_home.png'),
    'panel-b': require('./assets/images/window_learn.png'),
    'play': require('./assets/images/tile_play.png'),
    'learn': require('./assets/images/tile_learn.png'),
    'forest': require('./assets/images/game_window_bkgd.jpg'),
    'yellow_star': require('./assets/images/3stars.png'),
    'gray_star': require('./assets/images/3stars_off.png'),
    'home_btn': require('./assets/images/button_home.png'),
    'restart_btn': require('./assets/images/button_restart.png'),
    'fish_jumping': require('./assets/images/fish_jumping_animation.gif'),
    'fishing_rod': require('./assets/images/fishingPole.png'),
    'score': require('./assets/images/hud_score.png'),
    'waves': require('./assets/images/waves.svg'),
    'clock': require('./assets/images/hud_time.png'),
    'energy': require('./assets/images/hud_energy.png'),
    'loading': require('./assets/images/loading.gif'),
    'panel-s': require('./assets/images/bkgd_panel.png'),
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