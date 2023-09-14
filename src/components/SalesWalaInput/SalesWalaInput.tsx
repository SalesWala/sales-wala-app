import { InputModeOptions, TextInput, TouchableOpacity, View } from "react-native"


interface SalesWalaInputProps {
    placeholder: string,
    value: string,
    onChange: (input: string) => void
    disabled?: boolean
    inputType:InputModeOptions
}
const SalesWalaInput = ({inputType, placeholder, value, onChange ,disabled}: SalesWalaInputProps) => {

    return <TextInput
        inputMode={inputType}
        editable={!disabled}
        style={{
            fontFamily: "poppins",
            fontSize: 14,
            backgroundColor:"#fff",
            fontWeight: value?"600":"400",
            paddingVertical: 8,
            paddingHorizontal: 5,
            borderRadius: 5,
            marginTop:3
         
        }}
        placeholder={placeholder}
        onChangeText={onChange}
        value={value} />

}

export default SalesWalaInput