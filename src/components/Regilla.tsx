import { StyleSheet, View } from 'react-native';
import { Boton } from './Boton';

interface Props {
  onPress: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onCalculate: () => void;
  onSpecial: (tipo: 'sqrt' | 'sqr' | 'power') => void;
}

export function Regilla({ onPress, onClear, onDelete, onCalculate, onSpecial }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Boton label="C" color="#1E293B" textColor="#F43F5E" onPress={onClear} />
        <Boton label="⌫" color="#1E293B" textColor="#38BDF8" onPress={onDelete} />
        <Boton label="x²" color="#1E293B" textColor="#38BDF8" onPress={() => onSpecial('sqr')} />
        <Boton label="√" color="#1E293B" textColor="#38BDF8" onPress={() => onSpecial('sqrt')} />
      </View>

      <View style={styles.row}>
        <Boton label="xʸ" color="#1E293B" textColor="#38BDF8" onPress={() => onPress('^')} />
        <Boton label="(" color="#1E293B" textColor="#38BDF8" onPress={() => onPress('(')} />
        <Boton label=")" color="#1E293B" textColor="#38BDF8" onPress={() => onPress(')')} />
        <Boton label="÷" color="#0284C7" textColor="#FFFFFF" onPress={() => onPress('÷')} />
      </View>

      <View style={styles.row}>
        <Boton label="7" color="#0B132B" textColor="#E2E8F0" onPress={() => onPress('7')} />
        <Boton label="8" color="#0B132B" textColor="#E2E8F0" onPress={() => onPress('8')} />
        <Boton label="9" color="#0B132B" textColor="#E2E8F0" onPress={() => onPress('9')} />
        <Boton label="×" color="#0284C7" textColor="#FFFFFF" onPress={() => onPress('×')} />
      </View>

      <View style={styles.row}>
        <Boton label="4" color="#0B132B" textColor="#E2E8F0" onPress={() => onPress('4')} />
        <Boton label="5" color="#0B132B" textColor="#E2E8F0" onPress={() => onPress('5')} />
        <Boton label="6" color="#0B132B" textColor="#E2E8F0" onPress={() => onPress('6')} />
        <Boton label="-" color="#0284C7" textColor="#FFFFFF" onPress={() => onPress('-')} />
      </View>

      <View style={styles.row}>
        <Boton label="1" color="#0B132B" textColor="#E2E8F0" onPress={() => onPress('1')} />
        <Boton label="2" color="#0B132B" textColor="#E2E8F0" onPress={() => onPress('2')} />
        <Boton label="3" color="#0B132B" textColor="#E2E8F0" onPress={() => onPress('3')} />
        <Boton label="+" color="#0284C7" textColor="#FFFFFF" onPress={() => onPress('+')} />
      </View>

      <View style={styles.row}>
        <Boton label="0" color="#0B132B" textColor="#E2E8F0" isDouble onPress={() => onPress('0')} />
        <Boton label="." color="#0B132B" textColor="#E2E8F0" onPress={() => onPress('.')} />
        <Boton label="=" color="#0369A1" textColor="#FFFFFF" onPress={onCalculate} />
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
  },
});