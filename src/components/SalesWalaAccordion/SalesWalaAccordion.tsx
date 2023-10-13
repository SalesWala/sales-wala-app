import React, {useEffect, useRef, useState} from 'react';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {View, Text, TouchableOpacity, Animated} from 'react-native';

interface SalesWalaAccordionProps {
  primaryContent: JSX.Element | JSX.Element[] | React.ReactNode;
  secondaryContent: JSX.Element | JSX.Element[] | React.ReactNode;
  onExpandChange: (isChanged: boolean) => void;
  minHeight?:number
}
const SalesWalaAccordion = ({
  primaryContent,
  secondaryContent,
  onExpandChange,
  minHeight = 150
}: SalesWalaAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    onExpandChange(isExpanded);
  }, [isExpanded]);
  const contentHeight = useRef(new Animated.Value(0)).current;

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
    const newHeight = isExpanded ? 0 : calculateContentHeight();
    Animated.timing(contentHeight, {
      toValue: newHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const calculateContentHeight = () => {
    // You can adjust this value or use measurements based on your content
    return isExpanded ? 0 : minHeight;
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleAccordion}>
        {primaryContent}
      </TouchableOpacity>
      <Animated.View style={{height: contentHeight, overflow: 'hidden'}}>
        <View>{isExpanded && secondaryContent}</View>
      </Animated.View>
    </View>
  );
};

export default SalesWalaAccordion;
