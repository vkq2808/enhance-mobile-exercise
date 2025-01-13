import { ReactNode } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { View } from "react-native";

interface Props {
    justify?:
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | undefined;
    styles?: StyleProp<ViewStyle>;
    children: ReactNode;
    onPress?: () => void;
}

const RowComponent = (props: Props) => {
    
    const {styles, justify, children, onPress} = props
    
    const localStyle = [
        globalStyles.row,
        {
            justifyContent: justify ?? 'center'
        },
        styles
    ]
    
    return onPress ? (
        <TouchableOpacity
            activeOpacity={.5}
            onPress={onPress}
            style={localStyle}
        >
            {children}
        </TouchableOpacity>
    ) : (
        <View style={localStyle}>
            {children}
        </View>
    )
}

export default RowComponent;