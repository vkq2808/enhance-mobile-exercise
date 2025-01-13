import { Google } from "iconsax-react-native"
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from "../../../components"
import { appColors } from "../../../constants/appColors"
import { fontFamilies } from "../../../constants/fontFamilies"

const SocialLogin = () => {
    return (
        <SectionComponent>
            <TextComponent
                styles={{textAlign: 'center'}}
                text="OR"
                color={appColors.gray4}
                size={16}
                font={fontFamilies.medium}
            />
            <SpaceComponent height={16} />
            <ButtonComponent
                type="primary"
                color={appColors.white}
                textColor={appColors.text}
                text="Login with Google"
                textFont={fontFamilies.regular}
                iconFlex="left"
                icon={<Google />}
            />
        </SectionComponent>
    )
}