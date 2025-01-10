import { Dimensions } from "react-native";

export const appInfo = {
    sizes: {
        WIDTH: Dimensions.get('window').width,
        HEIGHT: Dimensions.get('window').height
    },
    BASE_URL: '',
    API_URL: 'http://192.168.1.109:8082/api/v1'
}