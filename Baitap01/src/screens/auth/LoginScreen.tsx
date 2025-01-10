import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Image, Switch } from "react-native"
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from "../../components";
import { Lock, Sms } from "iconsax-react-native";
import { appColors } from "../../constants/appColors";
import { Validate } from "../../utils/validate";
import { appInfo } from "../../constants/appInfo";

const LoginScreen = ({ navigation }: any) => {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [isRemember, setIsRemember] = useState(true);

    const [isDisable, setIsDisable] = useState(true);

    useEffect(() => {
        const emailValidation = Validate.email(email)

        if (!email || !password || !emailValidation) {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [email, password])

    const login = async () => {
        try {
            const response = await fetch(`${appInfo.API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            // Nếu kết quả trả về ok, chuyển hướng người dùng
            if (response.ok) {
                const data = await response.json();
                console.log('Đăng nhập thành công:', data);
                // Lưu token vào AsyncStorage nếu cần
                if (data.token) {
                    await AsyncStorage.setItem('userToken', data.token);
                }
                // Nếu có yêu cầu chuyển hướng dựa theo kết quả (ví dụ, nếu changeEmail là true thì chuyển OTP)
                if (data.changeEmail === true) {
                    navigation.navigate('AuthNavigator', { screen: 'OTP' });
                } else {
                    navigation.navigate('MainNavigator');
                }
            } else {
                const errorData = await response.json();
                console.error('Đăng nhập thất bại:', errorData);
                // Bạn có thể hiển thị thông báo lỗi cho người dùng ở đây
            }
        } catch (error) {
            console.error('Lỗi mạng hoặc server:', error);
            // Xử lý lỗi mạng nếu cần
        }
    };

    return (
        <ContainerComponent isImageBackgournd isScroll>
            <SectionComponent
                styles={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 75
                }}
            >
                <Image
                    source={require('../../assets/images/text-logo.png')}
                    style={{
                        width: 162,
                        height: 114,
                        marginBottom: 30
                    }}
                />
            </SectionComponent>
            <SectionComponent>
                <TextComponent size={24} title text="Sign in" />
                <SpaceComponent height={21} />
                <InputComponent
                    value={email}
                    placeHolder="Email"
                    onChange={val => setEmail(val)}
                    allowClear
                    affix={<Sms size={22} color={appColors.gray} />}
                />
                <InputComponent
                    value={password}
                    placeHolder="Password"
                    onChange={val => setPassword(val)}
                    isPassword
                    allowClear
                    affix={<Lock size={22} color={appColors.gray} />}
                />
                <RowComponent
                    justify="space-between"
                >
                    <RowComponent onPress={() => setIsRemember(!isRemember)} >
                        <Switch
                            trackColor={{ true: appColors.primary }}
                            thumbColor={appColors.white}
                            value={isRemember}
                            onChange={() => setIsRemember(!isRemember)}
                        />
                        <SpaceComponent width={4} />
                        <TextComponent text="Remember me" />
                    </RowComponent>
                    <ButtonComponent
                        text="Forgot Password?"
                        onPress={() => navigation.navigate('ForgotPassword')}
                        type="text"
                    />
                </RowComponent>
            </SectionComponent>
            <SpaceComponent height={16} />
            <SectionComponent>
                <ButtonComponent
                    disable={isDisable}
                    text="SIGN IN"
                    type="primary"
                    onPress={login}
                />
            </SectionComponent>
            <SectionComponent>
                <RowComponent
                    justify="center"
                >
                    <TextComponent text="Don't have an account? " />
                    <ButtonComponent
                        type="link"
                        text="Sign up"
                        onPress={() => navigation.navigate('SignUpScreen')}
                    />
                </RowComponent>
            </SectionComponent>
        </ContainerComponent>
    )
}

export default LoginScreen;