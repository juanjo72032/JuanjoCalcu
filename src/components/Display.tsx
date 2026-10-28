import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from './CustomText';

interface Props {
  formula: string;
  prevNumber: string;
}

export function Display({ formula, prevNumber }: Props) {
  return (
    <View style={styles.container}>
      <CustomText variant="sub" numberOfLines={1}>
        {prevNumber}
      </CustomText>
      <CustomText variant="main" numberOfLines={1} adjustsFontSizeToFit>
        {formula}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 140,
    backgroundColor: '#070D1F',
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
});