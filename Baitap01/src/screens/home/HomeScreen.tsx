import AsyncStorage from "@react-native-async-storage/async-storage"
import { Button, Text, View } from "react-native"

const HomeScreen = ({ navigation }: any) => {

    const logout = async () => {
        await AsyncStorage.removeItem('userToken')
        console.log('Logout succeed')
        navigation.navigate('AuthNavigator', { screen: 'LoginScreen' })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Logout"
                onPress={logout}
            />
        </View>
    )
}

export default HomeScreen;