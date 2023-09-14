import TasksIcon from "@src/assets/svgs/TasksIcon"
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import SalesWalaText from "../SalesWalaText/SalesWalaText";
import { useGetColor, useThemeColors } from "@src/hooks/useTheme";
import React from "react";
import AnnouncementIcon from "@src/assets/svgs/AnnouncementIcon";

interface AnnouncementsViewProps {
    counts?: number,
    style?: StyleProp<ViewStyle> | undefined;

}


const AnnouncementsView = (props: AnnouncementsViewProps) => {

    const primaryColor = useGetColor("primary")
    const dangerColor = useGetColor("success")

    const getCounts = () => {
        if (props.counts) {
            if (props.counts > 9) {
                return "9+"
            } else {
                return props.counts.toString()
            }
        }
    }
    return <TouchableOpacity style={[props.style]}>
        <AnnouncementIcon stroke={props.counts === 0 ? "#AAA" : primaryColor} />

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
                    alignSelf: "center",
                    justifyContent: "center",
                    textAlignVertical: "center",
                }}>
                {getCounts()}
            </SalesWalaText>
        </View>}


    </TouchableOpacity>
}

export default AnnouncementsView