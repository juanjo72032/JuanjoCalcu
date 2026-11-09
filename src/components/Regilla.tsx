import { StyleSheet, View } from 'react-native';
import { Boton } from './Boton';

interface Props {
  isScientific: boolean;
  onPress: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onCalculate: () => void;
  onSpecial: (tipo: string) => void;
  onConstant: (tipo: 'pi' | 'e') => void;
  onMemory: (action: 'MC' | 'MR' | 'M+' | 'M-') => void;
}

export function Regilla({ 
  isScientific, 
  onPress, 
  onClear, 
  onDelete, 
  onCalculate, 
  onSpecial, 
  onConstant,
  onMemory 
}: Props) {
  return (
    <View style={styles.container}>
      {/* BARRA DE MEMORIA */}
      <View style={styles.row}>
        <Boton label="MC" color="#111827" textColor="#9CA3AF" onPress={() => onMemory('MC')} />
        <Boton label="MR" color="#111827" textColor="#9CA3AF" onPress={() => onMemory('MR')} />
        <Boton label="M+" color="#111827" textColor="#9CA3AF" onPress={() => onMemory('M+')} />
        <Boton label="M-" color="#111827" textColor="#9CA3AF" onPress={() => onMemory('M-')} />
      </View>

      {/* FUNCIONES CIENTÍFICAS (Se muestran solo si isScientific es true) */}
      {isScientific && (
        <>
          <View style={styles.row}>
            <Boton label="sin" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('sin')} />
            <Boton label="cos" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('cos')} />
            <Boton label="tan" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('tan')} />
            <Boton label="π" color="#151E3D" textColor="#48CAE4" onPress={() => onConstant('pi')} />
          </View>
          <View style={styles.row}>
            <Boton label="sin⁻¹" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('asin')} />
            <Boton label="cos⁻¹" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('acos')} />
            <Boton label="tan⁻¹" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('atan')} />
            <Boton label="e" color="#151E3D" textColor="#48CAE4" onPress={() => onConstant('e')} />
          </View>
          <View style={styles.row}>
            <Boton label="x²" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('square')} />
            <Boton label="x³" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('cube')} />
            <Boton label="xʸ" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('power')} />
            <Boton label="eˣ" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('exp')} />
          </View>
          <View style={styles.row}>
            <Boton label="√x" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('sqrt')} />
            <Boton label="∛x" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('cbrt')} />
            <Boton label="1/x" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('reciprocal')} />
            <Boton label="n!" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('factorial')} />
          </View>
          <View style={styles.row}>
            <Boton label="ln" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('ln')} />
            <Boton label="log" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('log10')} />
            <Boton label="(" color="#151E3D" textColor="#48CAE4" onPress={() => onPress('(')} />
            <Boton label=")" color="#151E3D" textColor="#48CAE4" onPress={() => onPress(')')} />
          </View>
        </>
      )}

      {/* TECLADO BÁSICO Y OPERADORES */}
      <View style={styles.row}>
        <Boton label="AC" color="#48CAE4" textColor="#0B132B" onPress={onClear} />
        <Boton label="⌫" color="#151E3D" textColor="#48CAE4" onPress={onDelete} />
        <Boton label="%" color="#151E3D" textColor="#48CAE4" onPress={() => onSpecial('percent')} />
        <Boton label="÷" color="#3A506B" textColor="#4CC9F0" onPress={() => onPress('÷')} />
      </View>

      <View style={styles.row}>
        <Boton label="7" color="#1C2541" textColor="#FFFFFF" onPress={() => onPress('7')} />
        <Boton label="8" color="#1C2541" textColor="#FFFFFF" onPress={() => onPress('8')} />
        <Boton label="9" color="#1C2541" textColor="#FFFFFF" onPress={() => onPress('9')} />
        <Boton label="×" color="#3A506B" textColor="#4CC9F0" onPress={() => onPress('×')} />
      </View>

      <View style={styles.row}>
        <Boton label="4" color="#1C2541" textColor="#FFFFFF" onPress={() => onPress('4')} />
        <Boton label="5" color="#1C2541" textColor="#FFFFFF" onPress={() => onPress('5')} />
        <Boton label="6" color="#1C2541" textColor="#FFFFFF" onPress={() => onPress('6')} />
        <Boton label="-" color="#3A506B" textColor="#4CC9F0" onPress={() => onPress('-')} />
      </View>

      <View style={styles.row}>
        <Boton label="1" color="#1C2541" textColor="#FFFFFF" onPress={() => onPress('1')} />
        <Boton label="2" color="#1C2541" textColor="#FFFFFF" onPress={() => onPress('2')} />
        <Boton label="3" color="#1C2541" textColor="#FFFFFF" onPress={() => onPress('3')} />
        <Boton label="+" color="#3A506B" textColor="#4CC9F0" onPress={() => onPress('+')} />
      </View>

      <View style={styles.row}>
        <Boton label="±" color="#1C2541" textColor="#FFFFFF" onPress={() => onSpecial('toggleSign')} />
        <Boton label="0" color="#1C2541" textColor="#FFFFFF" onPress={() => onPress('0')} />
        <Boton label="." color="#1C2541" textColor="#FFFFFF" onPress={() => onPress('.')} />
        <Boton label="=" color="#4CC9F0" textColor="#0B132B" onPress={onCalculate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});