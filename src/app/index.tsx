import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useCalculator } from '../hooks/useCalculator';
import { Display } from '../components/Display';
import { Regilla } from '../components/Regilla';

export default function HomeScreen() {
  const {
    formula,
    prevNumber,
    limpiar,
    eliminar,
    escribir,
    calcular,
    manejarOperacionEspecial,
  } = useCalculator();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calculator}>
        <Display formula={formula} prevNumber={prevNumber} />
        <Regilla
          onPress={escribir}
          onClear={limpiar}
          onDelete={eliminar}
          onCalculate={calcular}
          onSpecial={manejarOperacionEspecial}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030712', // Fondo general azul oscuro elegante
  },
  calculator: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 30,
  },
});