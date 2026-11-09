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
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 110,
    backgroundColor: '#0B132B',
  },
});