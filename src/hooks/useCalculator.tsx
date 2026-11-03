import * as Haptics from 'expo-haptics';
import { useState } from 'react';

export function useCalculator() {
  const [formula, setFormula] = useState('0');
  const [prevNumber, setPrevNumber] = useState('');

  const limpiar = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setFormula('0');
    setPrevNumber('');
  };

  const eliminar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (formula.length === 1 || (formula.length === 2 && formula.startsWith('-'))) {
      setFormula('0');
    } else {
      setFormula(formula.slice(0, -1));
    }
  };

  const escribir = (text: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (formula === '0' && text !== '.') {
      setFormula(text);
    } else {
      setFormula(formula + text);
    }
  };

  const calcular = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    try {
      const expresionFinal = formula
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^2/g, '**2')
        .replace(/\^/g, '**');

      const resultado = eval(expresionFinal);
      setPrevNumber(formula + ' =');
      setFormula(String(resultado));
    } catch (error) {
      setFormula('Error');
    }
  };

  const manejarOperacionEspecial = (tipo: 'sqrt' | 'sqr' | 'power') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      const actual = parseFloat(formula);
      if (isNaN(actual)) return;

      if (tipo === 'sqrt') {
        if (actual < 0) {
          setFormula('Error');
          return;
        }
        setPrevNumber(`√(${formula})`);
        setFormula(String(Math.sqrt(actual)));
      } else if (tipo === 'sqr') {
        setPrevNumber(`(${formula})²`);
        setFormula(String(actual ** 2));
      } else if (tipo === 'power') {
        setPrevNumber(formula + ' ^');
        setFormula(formula + '^');
      }
    } catch {
      setFormula('Error');
    }
  };

  return {
    formula,
    prevNumber,
    limpiar,
    eliminar,
    escribir,
    calcular,
    manejarOperacionEspecial,
  };
}