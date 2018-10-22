import { createStackNavigator } from 'react-navigation';
import EnterGame from '../containers/EnterGame';
import GameScreen from '../containers/GameScreen';
import LearnScreen from '../containers/LearnScreen';

const AppNavigation = createStackNavigator(
	// {
	// 	Enter: EnterGame,
	// 	Game: GameScreen,
	// 	Learn: LearnScreen,
	// },
	{
		Enter: { screen: EnterGame },
		Game: {screen: GameScreen },
		Learn: {screen: LearnScreen },
	},
	{
		initialRouteName: 'Enter',
		navigationOptions: () => ({
			header: null,
		}),
	}
);

export default AppNavigation;
