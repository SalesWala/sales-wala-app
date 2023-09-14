import { useState } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import SalesWalaText from "../SalesWalaText/SalesWalaText";
import { useGetColor, useThemeColors } from "@src/hooks/useTheme";


interface SelectObjectViewProps {
    objectName: string
}
const SelectObjectView = ({ objectName }: SelectObjectViewProps) => {

    const [selectedObject, setSelectedObject] = useState();

    const textColor = useGetColor("textSubtle")


    return <TouchableOpacity
        style={[styles.container,
        !selectedObject ? {
            borderColor: textColor
        } : {}
        ]}>

        <View style={{flexDirection:"row",alignContent:"center",justifyContent:"center"}}> 
            <SalesWalaText fontSize={14} fontWeight="400" color={textColor} style={{
                borderWidth: 1,
                borderColor: textColor,
                borderRadius: 8,
                height: 20,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                textAlign: "center",
                marginRight:5,
                width:20
        }}>
           +
        </SalesWalaText>
        <SalesWalaText fontSize={14} fontWeight="400" color={textColor}>
           Select {objectName}
            </SalesWalaText>
            
        </View>

    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 8,
    },

    selectedContainer: {

    },
    unSelectedContainer: {

    },

});

export default SelectObjectView