import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import Swiper from "react-native-swiper";
import { appColors } from "../../constants/appColors";
import { appInfo } from "../../constants/appInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnbroadingScreen = ({ navigation }: any) => {

    const [index, setIndex] = useState(0)

    const handleSkip = () => {
        AsyncStorage.setItem('finishOnboarding', 'true')
        navigation.navigate('LoginScreen')
    }

    const handleNext = () => {
        if (index === 1) {
            AsyncStorage.setItem('finishOnboarding', 'true')
            navigation.navigate('LoginScreen')
        } else {
            setIndex(index + 1)
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('finishOnboarding').then(res => {
            if (res) {
                navigation.navigate('LoginScreen')
            }
        })
    }, [])

    return (
        <View style={[globalStyles.container]}>
            <Swiper
                style={[]}
                loop={false}
                onIndexChanged={num => setIndex(num)}
                index={index}
                activeDotColor={appColors.white}
            >
                <Image
                    source={require('../../assets/images/onboarding-1.png')}
                    style={{
                        flex: 1,
                        width: appInfo.sizes.WIDTH,
                        height: appInfo.sizes.HEIGHT,
                        resizeMode: 'cover'
                    }}
                />
                <Image
                    source={require('../../assets/images/onboarding-2.png')}
                    style={{
                        flex: 1,
                        width: appInfo.sizes.WIDTH,
                        height: appInfo.sizes.HEIGHT,
                        resizeMode: 'cover'
                    }}
                />
            </Swiper>
            <View
                style={[
                    {
                        paddingHorizontal: 16,
                        paddingVertical: 20,
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        left: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                ]}
            >
                <TouchableOpacity onPress={handleSkip}>
                    <Text style={[styles.text]}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext}>
                    <Text style={[styles.text]}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: appColors.white,
        fontSize: 16,
        fontWeight: '500'
    }
})

export default OnbroadingScreen;