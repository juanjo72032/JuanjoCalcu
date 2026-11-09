import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const buttonSize = (width - 40 - 36) / 4;

interface Props {
  label: string;
  color?: string;
  textColor?: string;
  onPress: () => void;
  isDouble?: boolean;
}

export function Boton({
  label,
  color = '#1C2541',
  textColor = '#FFFFFF',
  onPress,
  isDouble = false,
}: Props) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.button,
        {
          backgroundColor: isPressed ? '#4CC9F0' : color,
          width: isDouble ? buttonSize * 2 + 12 : buttonSize,
        },
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: isPressed ? '#0B132B' : textColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: buttonSize,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});