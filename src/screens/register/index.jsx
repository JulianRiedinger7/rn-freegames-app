import {
	Alert,
	Button,
	ImageBackground,
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { COLORS } from '../../constants'
import { isIOS } from '../../utils'
import { auth } from '../../constants'
import { PasswordInput } from '../../components'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/userSlice'

const Register = ({ navigation }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const onHandleSignUp = async () => {
		try {
			const signedUser = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			dispatch(setUser(signedUser.user))
			setEmail('')
			setPassword('')
		} catch (error) {
			Alert.alert(error.message)
		}
	}

	const onChangePassword = (text) => setPassword(text)

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
						<Text style={styles.title}>Register</Text>
						<Text style={styles.label}>Email</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter your email..."
							autoCapitalize="none"
							autoCorrect={false}
							autoFocus={true}
							maxLength={30}
							keyboardType="email-address"
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
						<Text style={styles.label}>Password</Text>
						<PasswordInput value={password} onChange={onChangePassword} />
						<Button
							title="Sign Up"
							color={COLORS.primary}
							onPress={onHandleSignUp}
						/>
						<Text style={styles.account}>Already have an account?</Text>
						<Button
							title="Sign In"
							color={COLORS.secondary}
							onPress={() => navigation.navigate('Login')}
						/>
					</View>
				</ImageBackground>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

export default Register

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
})
