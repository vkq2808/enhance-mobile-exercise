import { ActivityIndicator, Image, ImageBackground, Text, View } from "react-native"
import SpaceComponent from "../components/SpaceComponent";
import { appColors } from "../constants/appColors";
import { appInfo } from "../constants/appInfo";

const SplashScreen = () => {
    return (
        <ImageBackground
            source={require('../assets/images/splash-img.png')}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            imageStyle={{ flex: 1 }}
        >
            <Image
                source={require('../assets/images/logo.png')}
                style={{
                    width: appInfo.sizes.WIDTH * .7,
                    resizeMode: 'contain'
                }}
            />
            <SpaceComponent height={16} />
            <ActivityIndicator color={appColors.gray} size={22} />
        </ImageBackground>
    )
}

export default SplashScreen;