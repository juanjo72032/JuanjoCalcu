import * as Haptics from 'expo-haptics';
import { useState } from 'react';

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [formula, setFormula] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [expressionChain, setExpressionChain] = useState<string>('');
  
  const [memory, setMemory] = useState<number>(0);
  const [isRad, setIsRad] = useState<boolean>(false);

  const triggerHaptic = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}
  };

  const toggleAngleUnit = () => {
    triggerHaptic();
    setIsRad(!isRad);
  };

  const inputDigit = (digit: string) => {
    triggerHaptic();
    let newDisplay = '';

    if (waitingForOperand) {
      newDisplay = digit;
      setWaitingForOperand(false);
    } else {
      if (displayValue === '0' && digit === '0') {
        return; // Evita ceros múltiples al inicio (00000 -> 0)
      }
      newDisplay = displayValue === '0' ? digit : displayValue + digit;
    }

    setDisplayValue(newDisplay);
    setFormula(expressionChain ? `${expressionChain} ${newDisplay}` : newDisplay);
  };

  const inputDecimal = () => {
    triggerHaptic();
    let newDisplay = displayValue;

    if (waitingForOperand) {
      newDisplay = '0.';
      setWaitingForOperand(false);
    } else if (!displayValue.includes('.')) {
      newDisplay = displayValue + '.';
    } else {
      return; // Evita puntos múltiples (....)
    }

    setDisplayValue(newDisplay);
    setFormula(expressionChain ? `${expressionChain} ${newDisplay}` : newDisplay);
  };

  const clearAll = () => {
    triggerHaptic();
    setDisplayValue('0');
    setFormula('');
    setExpressionChain('');
    setWaitingForOperand(false);
  };

  const deleteLastDigit = () => {
    triggerHaptic();
    if (waitingForOperand) return;
    if (displayValue.length <= 1 || displayValue === 'Error') {
      setDisplayValue('0');
      setFormula(expressionChain);
    } else {
      const newDisplay = displayValue.slice(0, -1);
      setDisplayValue(newDisplay);
      setFormula(expressionChain ? `${expressionChain} ${newDisplay}` : newDisplay);
    }
  };

  const insertConstant = (type: 'pi' | 'e') => {
    triggerHaptic();
    const val = type === 'pi' ? String(Math.PI) : String(Math.E);
    setDisplayValue(val);
    setWaitingForOperand(true);
    setFormula(expressionChain ? `${expressionChain} ${val}` : val);
  };

  const handleOperator = (nextOperator: string) => {
    triggerHaptic();

    // Reemplaza operadores múltiples seguidos (ej: "++++" -> "+")
    if (waitingForOperand && expressionChain) {
      setExpressionChain(prev => {
        const trimmed = prev.trim();
        const updated = trimmed.substring(0, trimmed.length - 1) + nextOperator;
        setFormula(updated);
        return updated;
      });
      return;
    }

    setWaitingForOperand(true);

    const newChain = expressionChain ? `${expressionChain} ${displayValue} ${nextOperator}` : `${displayValue} ${nextOperator}`;
    setExpressionChain(newChain);
    setFormula(newChain);
  };

  const handleEquals = () => {
    triggerHaptic();

    if (!expressionChain) return;

    try {
      let fullExpression = '';
      
      // Si dejamos un operador colgando al final (ej: "5 + 2 +"), evaluamos sin duplicar el último número
      if (waitingForOperand) {
        const trimmed = expressionChain.trim();
        fullExpression = trimmed.substring(0, trimmed.lastIndexOf(' '));
      } else {
        fullExpression = `${expressionChain} ${displayValue}`;
      }
      
      const sanitizedExpression = fullExpression
        .replace(/×/g, '*')
        .replace(/÷/g, '/');

      let res = Function(`'use strict'; return (${sanitizedExpression})`)();

      const formattedResult = isNaN(res) || !isFinite(res) ? 'Error' : (Number.isInteger(res) ? String(res) : String(Number(res.toFixed(8))));
      
      setFormula(fullExpression);
      setDisplayValue(formattedResult);
      
      setExpressionChain('');
      setWaitingForOperand(true);
    } catch (error) {
      setDisplayValue('Error');
      setExpressionChain('');
    }
  };

  const handleUnaryOp = (opType: string) => {
    triggerHaptic();
    const current = parseFloat(displayValue);
    let result = 0;
    const angleConv = isRad ? 1 : Math.PI / 180;

    switch (opType) {
      case 'sqrt': result = Math.sqrt(current); break;
      case 'cbrt': result = Math.cbrt(current); break;
      case 'square': result = Math.pow(current, 2); break;
      case 'cube': result = Math.pow(current, 3); break;
      case 'reciprocal': result = current === 0 ? NaN : 1 / current; break;
      case 'sin': result = Math.sin(current * angleConv); break;
      case 'cos': result = Math.cos(current * angleConv); break;
      case 'tan': result = Math.tan(current * angleConv); break;
      case 'asin': result = isRad ? Math.asin(current) : Math.asin(current) * (180 / Math.PI); break;
      case 'acos': result = isRad ? Math.acos(current) : Math.acos(current) * (180 / Math.PI); break;
      case 'atan': result = isRad ? Math.atan(current) : Math.atan(current) * (180 / Math.PI); break;
      case 'ln': result = Math.log(current); break;
      case 'log10': result = Math.log10(current); break;
      case 'exp': result = Math.exp(current); break;
      case 'tenPow': result = Math.pow(10, current); break;
      case 'percent': result = current / 100; break;
      case 'factorial':
        if (current < 0 || !Number.isInteger(current)) {
          setDisplayValue('Error');
          return;
        }
        let fact = 1;
        for (let i = 2; i <= current; i++) fact *= i;
        result = fact;
        break;
      case 'toggleSign': result = current * -1; break;
      default: return;
    }

    if (isNaN(result) || !isFinite(result)) {
      setDisplayValue('Error');
    } else {
      const formatted = Number.isInteger(result) ? String(result) : String(Number(result.toFixed(8)));
      setDisplayValue(formatted);
      setFormula(`${opType}(${current})`);
      setWaitingForOperand(true);
    }
  };

  const memoryClear = () => { triggerHaptic(); setMemory(0); };
  const memoryRead = () => { triggerHaptic(); setDisplayValue(String(memory)); setWaitingForOperand(true); };
  const memoryAdd = () => { triggerHaptic(); setMemory(memory + parseFloat(displayValue)); };
  const memorySub = () => { triggerHaptic(); setMemory(memory - parseFloat(displayValue)); };

  return {
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
  };
};