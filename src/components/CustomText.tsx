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
    fontSize: 60,
    fontWeight: '300',
  },
  subText: {
    fontSize: 26,
    color: '#8DA9C4',
  },
});