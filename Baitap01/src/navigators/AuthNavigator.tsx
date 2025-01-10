import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen } from "../screens";
import OnbroadingScreen from "../screens/auth/OnbroadingScreen";
import OTPScreen from "../screens/auth/OTPScreen";

const AuthNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="OnbroadingScreen" component={OnbroadingScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;