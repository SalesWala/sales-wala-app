import MessageIcon from "@src/assets/svgs/MessageIcon"
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import SalesWalaText from "../SalesWalaText/SalesWalaText";
import { useGetColor, useThemeColors } from "@src/hooks/useTheme";
import { useCloudData } from "@src/hooks/data/useCloudData";

interface ChatCounter {
    counts?: number,
    style?: StyleProp<ViewStyle> | undefined;

}


const ChatCounter = (props: ChatCounter) => {
    const textSubtle = useGetColor("textSubtle")

    const primaryColor = useGetColor("primary")
    const dangerColor = useGetColor("danger")
    const { syncCloudData } = useCloudData()

    const getCounts = () => {
        if (props.counts) {
            if (props.counts > 9) {
                return "9+"
            } else {
                return props.counts.toString()
            }
        }
    }
    return <TouchableOpacity style={[props.style]} onPress={ syncCloudData}>
        <MessageIcon stroke={props.counts === 0 ? textSubtle: primaryColor} />

        {props.counts !== 0 && <View style={{
            backgroundColor: dangerColor,
            borderRadius: 100,
            height: 16,
            width: 16,
            padding: 2,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: -10,
            right: 0
            // alignSelf:"center",
        }}>
            <SalesWalaText fontSize={10}
                fontWeight="600" color="#fff"
                style={{
                    textAlign: "center",
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center"
                }}>
                {getCounts()}

            </SalesWalaText>
        </View>}


    </TouchableOpacity>
}

export default ChatCounter