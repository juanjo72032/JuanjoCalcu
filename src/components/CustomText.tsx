import React from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';

interface Props extends TextProps {
  variant?: 'main' | 'sub';
}

export function CustomText({ children, variant = 'main', style, ...rest }: Props) {
  return (
    <Text
      style={[
        styles.textBase,
        variant === 'main' && styles.mainText,
        variant === 'sub' && styles.subText,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textBase: {
    color: '#FFFFFF',
  },
  mainText: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: '#94A3B8',
  },
});