import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, Register } from '../screens'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
		</Stack.Navigator>
	)
}

export default AuthNavigator
