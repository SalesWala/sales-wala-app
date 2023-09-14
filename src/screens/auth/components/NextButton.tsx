import { useGetColor } from "@src/hooks/useTheme"
import { Text, TouchableOpacity, View } from "react-native"
import NextIcon from "../assets/NextIcon"

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    Easing,
    useAnimatedReaction,
    useDerivedValue,
} from 'react-native-reanimated';


interface NextButtonProps {
    onPress : ()=>void
}
const NextButton = (props:NextButtonProps) => {
    const color = useGetColor("primaryText")

    const translationY = useSharedValue(-80);
    const direction = useSharedValue(1);

    useAnimatedReaction(
        () => {
            return translationY.value;
        },
        (newValue, prevValue) => {
            if (newValue >= 100 || newValue <= -100) {
                direction.value *= -1;
            }
        }
    );

    useAnimatedReaction(
        () => {
            return direction.value;
        },
        (newDirection) => {
            translationY.value = withSpring(translationY.value + 50 * newDirection, {
                damping: 2,
                stiffness: 80,
                mass: 1,
                overshootClamping: false,
            });
        }
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translationY.value }],
        };
    });

    // Use a derived value to access the shared value inside the animated functions


    return <Animated.View style={[animatedStyle]} >
        <TouchableOpacity
            onPress={props.onPress}
            
            style={[{
            borderRadius: 100,
            borderWidth: 0.2,
            borderColor: color,
                height: 65,
            width: 65,
            padding: 3,
            alignContent: "center",
            alignItems: "center",
                justifyContent: "center",


        }]}>
            <View style={{
                borderRadius: 100,
                borderWidth: 2,
                borderColor: color,
                height: "100%",
                width: "100%",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: color,
                justifyContent: "center"

            }}>
                <NextIcon style={{
                    backgroundColor: color,

                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",

                    position: "relative",


                }} />

            </View>
        </TouchableOpacity>
    </Animated.View>


}

export default NextButton