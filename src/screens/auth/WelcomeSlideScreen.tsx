import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import WelcomeScreen1Art from '@src/screens/auth/assets/WelcomeScreen1Art';
import { useThemeColors } from '@src/hooks/useTheme';
import SalesWalaText from '@src/components/SalesWalaText/SalesWalaText';
import analytics from '@react-native-firebase/analytics';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  Easing,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import NextButton from './components/NextButton';

function WelcomeSlideScreen({ navigation }: any) {
  const salesWalaTranslationX = useSharedValue(-200); // Initial position off-screen
  const opacity = useSharedValue(0); // Initial opacity value

  useEffect(() => {
    // Animate the translation from left to right on component mount
    salesWalaTranslationX.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });

    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.ease,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  const salesWalaAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: salesWalaTranslationX.value }],
    };
  });








  const handleNext = async () => {

    navigation.push('Login');
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          paddingBottom: 20,
        }}>
        <SafeAreaView
          style={{
            alignContent: 'center',
            marginHorizontal: 25,
          }}>
          <Animated.View style={[animatedStyle]}>
            <WelcomeScreen1Art />
          </Animated.View>

          <Animated.View style={[salesWalaAnimatedStyle]}>
            <SalesWalaText
              color="subtleGreen"
              fontWeight="700"
              fontSize={50}
              style={
                {
                  // textAlign:"center",
                }
              }>
              SalesWala{' '}
            </SalesWalaText>
          </Animated.View>

          <View style={{}}>
            <Animated.View style={[salesWalaAnimatedStyle]}>
              <SalesWalaText color="primary" fontWeight="300" fontSize={18}>
                helps you in
              </SalesWalaText>
            </Animated.View>

            <Animated.View style={[animatedStyle]}>
              <SalesWalaText color="primary" fontWeight="300" fontSize={35}>
                <SalesWalaText color="primary" fontWeight="600" fontSize={35}>
                  Managing{' '}
                </SalesWalaText>
                &
                <SalesWalaText color="primary" fontWeight="600" fontSize={35}>
                  {' '}
                  Boosting{' '}
                </SalesWalaText>
                up your{' '}
                <SalesWalaText color="primary" fontWeight="600" fontSize={35}>
                  Sales
                </SalesWalaText>
              </SalesWalaText>

              <View
                style={{
                  alignItems: 'flex-end',
                }}>
                <NextButton onPress={handleNext} />
              </View>
            </Animated.View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

export default WelcomeSlideScreen;
