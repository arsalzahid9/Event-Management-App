import React, { useRef } from 'react';
import { TouchableWithoutFeedback, Animated, StyleSheet, View } from 'react-native';
import { Check, X } from 'lucide-react-native';

const ToggleSwitch = ({ value, onValueChange, style }) => {
  // Change initial value calculation
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const toggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: value ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
    onValueChange(!value);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 32]  // Keep original values but direction matches animation
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f5aeae', '#9ed99c']
  });

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <Animated.View style={[styles.container, { backgroundColor }, style]}>
        <Animated.View style={[styles.slider, { transform: [{ translateX }] }]}>
          {value ? (
            <Check size={16} color="#fff" />
          ) : (
            <X size={16} color="#fff" />
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 4
  },
  slider: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ToggleSwitch;