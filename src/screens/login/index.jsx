import {
	Button,
	ImageBackground,
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { COLORS } from '../../constants';
import { isIOS } from '../../utils';

const Login = ({ navigation }) => {
	return (
		<KeyboardAvoidingView
			behavior={isIOS ? 'padding' : 'height'}
			style={{ flex: 1 }}
		>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<ImageBackground
					source={require('../../../assets/auth-background.jpg')}
					style={styles.container}
					resizeMode="cover"
				>
					<StatusBar style="light" />
					<View style={styles.formContainer}>
						<Text style={styles.title}>Login</Text>
						<Text style={styles.label}>Email</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter your email..."
							autoCapitalize="none"
							autoCorrect={false}
							autoFocus={true}
							maxLength={30}
							keyboardType="email-address"
						/>
						<Text style={styles.label}>Password</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter your password..."
							secureTextEntry
							autoCapitalize="none"
							autoCorrect={false}
							maxLength={30}
							keyboardType="default"
						/>
						<Button title="Sign In" color={COLORS.primary} />
						<Text style={styles.account}>Don't have an account?</Text>
						<Button
							title="Sign Up"
							color={COLORS.secondary}
							onPress={() => navigation.navigate('Register')}
						/>
					</View>
				</ImageBackground>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	formContainer: {
		backgroundColor: COLORS.white,
		width: '70%',
		opacity: 0.85,
		borderRadius: 10,
		padding: 20,
	},
	title: {
		alignSelf: 'center',
		fontSize: 22,
		fontWeight: 'bold',
		color: COLORS.text,
	},
	label: {
		color: COLORS.text,
		fontSize: 15,
		fontWeight: '500',
	},
	input: {
		marginBottom: 10,
		paddingVertical: 5,
		borderBottomColor: COLORS.primary,
		borderBottomWidth: 1,
	},
	account: {
		color: COLORS.secondaryDark,
		fontSize: 15,
		marginVertical: 5,
		fontWeight: '600',
		fontStyle: 'italic',
	},
});
