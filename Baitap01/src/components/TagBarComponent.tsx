import { ArrowRight2 } from "iconsax-react-native";
import { appColors } from "../constants/appColors";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";

interface Props {
    title: string;
    onPress: () => void
}

const TagBarComponent = (props: Props) => {
    
    const {title, onPress} = props;

    return (
        <RowComponent
            onPress={onPress}
            styles={{marginBottom: 12, paddingHorizontal: 16}}
        >
            <TextComponent text="See All" color={appColors.gray} />
            <ArrowRight2 variant="Bold" size={14} color={appColors.gray} />
        </RowComponent>
    )
}

export default TagBarComponent;