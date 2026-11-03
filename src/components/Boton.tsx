import { useState } from 'react';
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
  color = '#0F172A',
  textColor = '#38BDF8',
  onPress,
  isDouble = false,
}: Props) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        {
          backgroundColor: isPressed ? '#38BDF8' : color, // Cambio de color único al tacto
          width: isDouble ? buttonSize * 2 + 12 : buttonSize,
        },
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: isPressed ? '#030712' : textColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: buttonSize,
    borderRadius: buttonSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});