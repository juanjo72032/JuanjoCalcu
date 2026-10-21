import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CalculadoraScreen() {
  return (
    <View style={styles.calculatorContainer}>
      {/* Zona de Display / Resultados */}
      <View style={styles.displayContainer}>
        <Text style={styles.subResultText}>2 + 2</Text>
        <Text style={styles.mainResultText} numberOfLines={1} adjustsFontSizeToFit>
          4
        </Text>
      </View>

      {/* Zona de Botones */}
      <View style={styles.buttonsContainer}>
        {/* Fila 1 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonTop}><Text style={styles.buttonTextTop}>C</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonTop}><Text style={styles.buttonTextTop}>±</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonTop}><Text style={styles.buttonTextTop}>%</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonOp}><Text style={styles.buttonTextOp}>÷</Text></TouchableOpacity>
        </View>

        {/* Fila 2 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonNumber}><Text style={styles.buttonTextNumber}>7</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber}><Text style={styles.buttonTextNumber}>8</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber}><Text style={styles.buttonTextNumber}>9</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonOp}><Text style={styles.buttonTextOp}>×</Text></TouchableOpacity>
        </View>

        {/* Fila 3 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonNumber}><Text style={styles.buttonTextNumber}>4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber}><Text style={styles.buttonTextNumber}>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber}><Text style={styles.buttonTextNumber}>6</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonOp}><Text style={styles.buttonTextOp}>-</Text></TouchableOpacity>
        </View>

        {/* Fila 4 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonNumber}><Text style={styles.buttonTextNumber}>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber}><Text style={styles.buttonTextNumber}>2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber}><Text style={styles.buttonTextNumber}>3</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonOp}><Text style={styles.buttonTextOp}>+</Text></TouchableOpacity>
        </View>

        {/* Fila 5 */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.buttonNumber, styles.buttonZero]}><Text style={styles.buttonTextNumber}>0</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonNumber}><Text style={styles.buttonTextNumber}>.</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonOp}><Text style={styles.buttonTextOp}>=</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calculatorContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  displayContainer: {
    paddingBottom: 20,
    alignItems: "flex-end",
  },
  subResultText: {
    color: "#8DA9C4", // Azul grisáceo claro
    fontSize: 32,
  },
  mainResultText: {
    color: "#FFFFFF",
    fontSize: 70,
    fontWeight: "bold",
  },
  buttonsContainer: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  // Botones de funciones superiores (C, ±, %) -> Azul medio
  buttonTop: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#1C3144",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  buttonTextTop: {
    color: "#64DFDF", // Cyan brillante
    fontSize: 28,
  },
  // Botones numéricos -> Azul marino profundo
  buttonNumber: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#001F54",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  buttonZero: {
    flex: 2.1,
    aspectRatio: undefined,
    height: 75,
    alignItems: "flex-start",
    paddingLeft: 30,
  },
  buttonTextNumber: {
    color: "#FFFFFF",
    fontSize: 28,
  },
  // Botones de operaciones (+, -, ×, ÷, =) -> Azul eléctrico / Cyan
  buttonOp: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#0077B6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  buttonTextOp: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "600",
  },
});