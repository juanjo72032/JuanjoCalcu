import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Pressable, Animated, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useCalculator } from '../hooks/useCalculator';

export default function CalculatorScreen() {
  const [isScientific, setIsScientific] = useState(true);
  const {
    displayValue,
    formula,
    isRad,
    memory,
    inputDigit,
    inputDecimal,
    clearAll,
    deleteLastDigit,
    insertConstant,
    handleOperator,
    handleEquals,
    handleUnaryOp,
    toggleAngleUnit,
    memoryClear,
    memoryRead,
    memoryAdd,
    memorySub,
  } = useCalculator();

  const Btn = ({ 
    title, 
    onPress, 
    type = 'number', 
    style 
  }: { 
    title: string; 
    onPress: () => void; 
    type?: 'number' | 'op' | 'func' | 'accent' | 'mem'; 
    style?: any 
  }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    let btnStyle = styles.btnNumber;
    let textStyle = styles.textNumber;
    let pressColor = '#3A86EF';

    if (type === 'op') { 
      btnStyle = styles.btnOp; 
      textStyle = styles.textOp; 
      pressColor = '#FF006E'; 
    } else if (type === 'func') { 
      btnStyle = styles.btnFunc; 
      textStyle = styles.textFunc; 
      pressColor = '#8338EC'; 
    } else if (type === 'accent') { 
      btnStyle = styles.btnAccent; 
      textStyle = styles.textAccent; 
      pressColor = '#06D6A0'; 
    } else if (type === 'mem') { 
      btnStyle = styles.btnMem; 
      textStyle = styles.textMem; 
      pressColor = '#FB5607'; 
    }

    return (
      <Animated.View style={[{ flex: 1, marginHorizontal: 3 }, { transform: [{ scale: scaleAnim }] }]}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
          style={({ pressed }) => [
            styles.btnBase,
            // Si es modo básico, aumentamos la altura de los botones para llenar la pantalla
            !isScientific && { height: 64 }, 
            btnStyle,
            style,
            pressed && { backgroundColor: pressColor }
          ]}
        >
          <Text style={[styles.textBase, textStyle, !isScientific && { fontSize: 22 }]}>{title}</Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER DE MODO */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.tabBtn, !isScientific && styles.tabActive]} 
          onPress={() => setIsScientific(false)}
        >
          <Text style={[styles.tabText, !isScientific && styles.tabTextActive]}>Básica</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabBtn, isScientific && styles.tabActive]} 
          onPress={() => setIsScientific(true)}
        >
          <Text style={[styles.tabText, isScientific && styles.tabTextActive]}>Científica</Text>
        </TouchableOpacity>
      </View>

      {/* DISPLAY DE RESULTADOS */}
      <View style={styles.displayContainer}>
        <View style={styles.badgeContainer}>
          {isScientific && (
            <TouchableOpacity onPress={toggleAngleUnit} style={styles.badge}>
              <Text style={styles.badgeText}>{isRad ? 'RAD' : 'DEG'}</Text>
            </TouchableOpacity>
          )}
          {memory !== 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>M</Text>
            </View>
          )}
        </View>
        <Text style={styles.formulaText} numberOfLines={1}>{formula}</Text>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>{displayValue}</Text>
      </View>

      {/* TECLADO DE BOTONES */}
      <ScrollView contentContainerStyle={styles.keypad} bounces={false}>
        {/* BARRA DE MEMORIA (Opcional en básica, la mantenemos discreta) */}
        <View style={styles.row}>
          <Btn title="MC" type="mem" onPress={memoryClear} />
          <Btn title="MR" type="mem" onPress={memoryRead} />
          <Btn title="M+" type="mem" onPress={memoryAdd} />
          <Btn title="M-" type="mem" onPress={memorySub} />
        </View>

        {/* FUNCIONES CIENTÍFICAS (Solo se muestran si isScientific es true) */}
        {isScientific && (
          <>
            <View style={styles.row}>
              <Btn title={isRad ? 'DEG' : 'RAD'} type="func" onPress={toggleAngleUnit} />
              <Btn title="sin" type="func" onPress={() => handleUnaryOp('sin')} />
              <Btn title="cos" type="func" onPress={() => handleUnaryOp('cos')} />
              <Btn title="tan" type="func" onPress={() => handleUnaryOp('tan')} />
            </View>
            <View style={styles.row}>
              <Btn title="sin⁻¹" type="func" onPress={() => handleUnaryOp('asin')} />
              <Btn title="cos⁻¹" type="func" onPress={() => handleUnaryOp('acos')} />
              <Btn title="tan⁻¹" type="func" onPress={() => handleUnaryOp('atan')} />
              <Btn title="π" type="func" onPress={() => insertConstant('pi')} />
            </View>
            <View style={styles.row}>
              <Btn title="x²" type="func" onPress={() => handleUnaryOp('square')} />
              <Btn title="x³" type="func" onPress={() => handleUnaryOp('cube')} />
              <Btn title="xʸ" type="func" onPress={() => handleOperator('power')} />
              <Btn title="e" type="func" onPress={() => insertConstant('e')} />
            </View>
            <View style={styles.row}>
              <Btn title="√x" type="func" onPress={() => handleUnaryOp('sqrt')} />
              <Btn title="∛x" type="func" onPress={() => handleUnaryOp('cbrt')} />
              <Btn title="ʸ√x" type="func" onPress={() => handleOperator('nthRoot')} />
              <Btn title="1/x" type="func" onPress={() => handleUnaryOp('reciprocal')} />
            </View>
            <View style={styles.row}>
              <Btn title="ln" type="func" onPress={() => handleUnaryOp('ln')} />
              <Btn title="log" type="func" onPress={() => handleUnaryOp('log10')} />
              <Btn title="eˣ" type="func" onPress={() => handleUnaryOp('exp')} />
              <Btn title="n!" type="func" onPress={() => handleUnaryOp('factorial')} />
            </View>
          </>
        )}

        {/* TECLADO NUMÉRICO Y OPERADORES (Siempre visibles) */}
        <View style={styles.row}>
          <Btn title="AC" type="accent" onPress={clearAll} />
          <Btn title="⌫" type="func" onPress={deleteLastDigit} />
          <Btn title="%" type="func" onPress={() => handleUnaryOp('percent')} />
          <Btn title="÷" type="op" onPress={() => handleOperator('÷')} />
        </View>

        <View style={styles.row}>
          <Btn title="7" onPress={() => inputDigit('7')} />
          <Btn title="8" onPress={() => inputDigit('8')} />
          <Btn title="9" onPress={() => inputDigit('9')} />
          <Btn title="×" type="op" onPress={() => handleOperator('×')} />
        </View>

        <View style={styles.row}>
          <Btn title="4" onPress={() => inputDigit('4')} />
          <Btn title="5" onPress={() => inputDigit('5')} />
          <Btn title="6" onPress={() => inputDigit('6')} />
          <Btn title="-" type="op" onPress={() => handleOperator('-')} />
        </View>

        <View style={styles.row}>
          <Btn title="1" onPress={() => inputDigit('1')} />
          <Btn title="2" onPress={() => inputDigit('2')} />
          <Btn title="3" onPress={() => inputDigit('3')} />
          <Btn title="+" type="op" onPress={() => handleOperator('+')} />
        </View>

        <View style={styles.row}>
          <Btn title="±" onPress={() => handleUnaryOp('toggleSign')} />
          <Btn title="0" onPress={() => inputDigit('0')} />
          <Btn title="." onPress={inputDecimal} />
          <Btn title="=" type="accent" onPress={handleEquals} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B132B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#1C2541',
  },
  tabBtn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tabActive: {
    backgroundColor: '#3A506B',
  },
  tabText: {
    color: '#8D99AE',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  displayContainer: {
    height: 110,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#0B132B',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  badge: {
    backgroundColor: '#1C2541',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 5,
  },
  badgeText: {
    color: '#4CC9F0',
    fontSize: 11,
    fontWeight: 'bold',
  },
  formulaText: {
    color: '#94A3B8',
    fontSize: 16,
    marginBottom: 2,
    textAlign: 'right',
  },
  displayText: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  keypad: {
    paddingHorizontal: 5,
    paddingBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  btnBase: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textBase: {
    fontSize: 17,
    fontWeight: '600',
  },
  btnNumber: { backgroundColor: '#1C2541' },
  textNumber: { color: '#FFFFFF' },
  btnOp: { backgroundColor: '#3A506B' },
  textOp: { color: '#4CC9F0' },
  btnFunc: { backgroundColor: '#151E3D' },
  textFunc: { color: '#48CAE4' },
  btnAccent: { backgroundColor: '#4CC9F0' },
  textAccent: { color: '#0B132B', fontWeight: 'bold' },
  btnMem: { backgroundColor: '#111827', height: 32 },
  textMem: { color: '#9CA3AF', fontSize: 12 },
});