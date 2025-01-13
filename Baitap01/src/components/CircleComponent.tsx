import { ReactNode } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { appColors } from "../constants/appColors";

interface Props {
    size?: number;
    children: ReactNode;
    color?: string;
    onPress?: () => void;
    styles?: StyleProp<ViewStyle>
}

const CircleComponent = (props: Props) => {

    const {size, children, color, onPress, styles} = props;

    const localStyle: any = {
        width: size ?? 40,
        heigh: size ?? 40,
        backgroundColor: color ?? appColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    }

    return onPress ? (
        <TouchableOpacity style={[localStyle, styles]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    ) : (
        <View style={[localStyle, styles]}>{children}</View>
    )
}

export default CircleComponent;