import { useState } from 'react';

export function useCalculator() {
  const [formula, setFormula] = useState('0');
  const [prevNumber, setPrevNumber] = useState('');

  const limpiar = () => {
    setFormula('0');
    setPrevNumber('');
  };

  const eliminar = () => {
    if (formula.length === 1 || (formula.length === 2 && formula.startsWith('-'))) {
      setFormula('0');
    } else {
      setFormula(formula.slice(0, -1));
    }
  };

  const escribir = (text: string) => {
    if (formula === '0' && text !== '.') {
      setFormula(text);
    } else {
      setFormula(formula + text);
    }
  };

  const prepararOperacion = (op: string) => {
    setPrevNumber(formula);
    setFormula('0');
  };

  const calcular = () => {
    try {
      // Reemplazamos símbolos visuales por operadores de evaluación JS
      const expresionFinal = formula
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^2/g, '**2')
        .replace(/\^/g, '**');

      const resultado = eval(expresionFinal);
      setFormula(String(resultado));
      setPrevNumber('');
    } catch (error) {
      setFormula('Error');
    }
  };

  const manejarOperacionEspecial = (tipo: 'sqrt' | 'sqr' | 'power') => {
    try {
      const actual = parseFloat(formula);
      if (isNaN(actual)) return;

      if (tipo === 'sqrt') {
        if (actual < 0) {
          setFormula('Error');
          return;
        }
        setFormula(String(Math.sqrt(actual)));
      } else if (tipo === 'sqr') {
        setFormula(String(actual ** 2));
      } else if (tipo === 'power') {
        setPrevNumber(formula);
        setFormula(''); // Espera el exponente
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
    prepararOperacion,
    calcular,
    manejarOperacionEspecial,
  };
}