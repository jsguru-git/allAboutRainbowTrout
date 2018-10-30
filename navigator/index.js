import { createStackNavigator } from 'react-navigation';
import EnterGame from '../containers/EnterGame';
import GameScreen from '../components/GameScreen';
import LearnScreen from '../components/LearnScreen';

const AppNavigation = createStackNavigator(
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
