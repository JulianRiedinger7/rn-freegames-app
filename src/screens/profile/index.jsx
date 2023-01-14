import {
	Button,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
	StatusBar as Status,
	Image,
	ScrollView,
	Alert,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { auth, COLORS } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserProfile, setUser } from '../../store/userSlice'
import { ImageSelector, LocationSelector } from '../../components'
import { signOut } from 'firebase/auth/react-native'

const Profile = ({ navigation }) => {
	const [username, setUsername] = useState('')
	const [imagePicked, setImagePicked] = useState(null)
	const [locationPicked, setLocationPicked] = useState(null)
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.data)

	const onHandlePickImage = (uri) => setImagePicked(uri)

	const onHandlePickLocation = (location) => setLocationPicked(location)

	const onHandleSave = () => {
		dispatch(
			changeUserProfile({
				username,
				photo: imagePicked,
				location: locationPicked,
			})
		)
		setUsername('')
		setImagePicked(null)
		navigation.navigate('Home', {
			displayName: user.displayName,
			photoURL: user.photoURL,
		})
	}

	const onHandleSignOut = async () => {
		try {
			await signOut(auth)
			dispatch(setUser(null))
			Alert.alert('You have succesfully logged out')
		} catch (error) {
			Alert.alert('An error ocurred, try again')
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<StatusBar style="light" />
				<View style={styles.completeContainer}>
					<Text style={styles.title}>Complete your Profile</Text>
					<Button
						title="Sign Out"
						color={COLORS.tertiary}
						onPress={onHandleSignOut}
					/>
				</View>
				<View style={styles.topContainer}>
					<Text style={styles.currentAvatar}>Current Photo:</Text>
					{user.photoURL ? (
						<Image
							source={{ uri: user.photoURL }}
							style={styles.image}
							resizeMode="contain"
						/>
					) : (
						<Image
							source={require('../../../assets/usuario.png')}
							style={styles.image}
						/>
					)}
				</View>
				<View style={styles.topContainer}>
					<Text style={styles.currentAvatar}>Current Username:</Text>
					{user.displayName ? (
						<Text>{user.displayName}</Text>
					) : (
						<Text>User</Text>
					)}
				</View>
				<View style={styles.formContainer}>
					<Text style={styles.label}>Username</Text>
					<TextInput
						placeholder="Enter a username..."
						style={styles.input}
						autoCapitalize
						autoCorrect={false}
						maxLength={15}
						value={username}
						onChangeText={(text) => setUsername(text)}
					/>
					<ImageSelector onHandlePickImage={onHandlePickImage} />
					<LocationSelector onHandlePickLocation={onHandlePickLocation} />
					<View style={styles.saveContainer}>
						<Button
							title="Save Profile"
							color={COLORS.primary}
							disabled={!username || !imagePicked || !locationPicked}
							onPress={onHandleSave}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Profile

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		paddingTop: Status.currentHeight,
	},
	completeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	title: {
		marginVertical: 10,
		fontSize: 25,
		fontWeight: 'bold',
		alignSelf: 'center',
		color: COLORS.primaryDark,
	},
	topContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: 20,
	},
	currentAvatar: {
		fontWeight: '600',
		fontSize: 16,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 50 / 2,
	},
	formContainer: {
		backgroundColor: COLORS.white,
		width: '80%',
		alignSelf: 'center',
		opacity: 0.85,
		borderRadius: 10,
		padding: 20,
		marginBottom: 20,
	},
	label: {
		fontWeight: '500',
		fontSize: 15,
		color: COLORS.text,
	},
	input: {
		borderBottomColor: COLORS.primary,
		marginBottom: 5,
		paddingVertical: 5,
		borderBottomWidth: 1,
	},
	saveContainer: {
		marginTop: 10,
	},
})
