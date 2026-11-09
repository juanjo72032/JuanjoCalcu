import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useCalculator } from '../hooks/useCalculator';
import { Display } from '../components/Display';
import { Regilla } from '../components/Regilla';

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

  const handleSpecial = (tipo: string) => {
    if (tipo === 'power') handleOperator('power');
    else handleUnaryOp(tipo);
  };

  const handleMemoryAction = (action: 'MC' | 'MR' | 'M+' | 'M-') => {
    if (action === 'MC') memoryClear();
    else if (action === 'MR') memoryRead();
    else if (action === 'M+') memoryAdd();
    else if (action === 'M-') memorySub();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER DE MODO BÁSICA / CIENTÍFICA */}
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

      {/* SCROLL GENERAL DE LA PANTALLA */}
      <ScrollView contentContainerStyle={styles.content} bounces={false}>
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

        {/* DISPLAY SUPERIOR */}
        <Display formula={displayValue} prevNumber={formula} />

        {/* REGILLA MODULAR COMPLETA */}
        <Regilla
          isScientific={isScientific}
          onPress={(val) => {
            if (['0','1','2','3','4','5','6','7','8','9'].includes(val)) {
              inputDigit(val);
            } else if (val === '.') {
              inputDecimal();
            } else if (['+', '-', '×', '÷'].includes(val)) {
              handleOperator(val);
            } else if (val === '(' || val === ')') {
              inputDigit(val);
            }
          }}
          onClear={clearAll}
          onDelete={deleteLastDigit}
          onCalculate={handleEquals}
          onSpecial={handleSpecial}
          onConstant={insertConstant}
          onMemory={handleMemoryAction}
        />
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
  content: {
    padding: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: 8,
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
});