import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const buttonSize = (width - 40 - 36) / 4; // 4 columnas con gaps limpios

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
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: color, width: isDouble ? buttonSize * 2 + 12 : buttonSize },
      ]}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
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