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

  const handleUnaryOp = (opType: string) => {
    triggerHaptic();
    const current = displayValue;
    
    let formattedSnippet = '';
    if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'ln', 'log10', 'exp', 'sqrt', 'cbrt'].includes(opType)) {
      formattedSnippet = `${opType}(${current})`;
    } else if (opType === 'square') {
      formattedSnippet = `(${current})²`;
    } else if (opType === 'cube') {
      formattedSnippet = `(${current})³`;
    } else if (opType === 'percent') {
      formattedSnippet = `${current}/100`;
    } else {
      formattedSnippet = `${opType}(${current})`;
    }

    const newChain = expressionChain ? `${expressionChain} ${formattedSnippet}` : formattedSnippet;
    setExpressionChain(newChain);
    setFormula(newChain);
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    triggerHaptic();

    // Si no hay cadena pero hay un display value, armamos la expresión actual
    const fullExpression = expressionChain ? `${expressionChain} ${waitingForOperand ? '' : displayValue}` : displayValue;
    
    if (!fullExpression.trim()) return;

    try {
      let cleanedExpr = fullExpression.trim();
      // Si termina en operador colgante, lo removemos
      if (['+', '-', '×', '÷'].some(op => cleanedExpr.endsWith(op))) {
        cleanedExpr = cleanedExpr.substring(0, cleanedExpr.lastIndexOf(' '));
      }

      // Convertimos los operadores visuales y funciones matemáticas a formato JS ejecutable
      let jsExpression = cleanedExpr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/²/g, '**2')
        .replace(/³/g, '**3');

      // Reemplazo seguro de funciones trigonométricas y científicas
      // Si el modo es DEG (Grados), convertimos el ángulo a radianes dentro de la función (grados * PI / 180)
      const toRadFactor = isRad ? '1' : `(Math.PI / 180)`;

      jsExpression = jsExpression
        .replace(/sin\(([^)]+)\)/g, `Math.sin(($1) * ${toRadFactor})`)
        .replace(/cos\(([^)]+)\)/g, `Math.cos(($1) * ${toRadFactor})`)
        .replace(/tan\(([^)]+)\)/g, `Math.tan(($1) * ${toRadFactor})`)
        .replace(/sqrt\(([^)]+)\)/g, `Math.sqrt($1)`)
        .replace(/cbrt\(([^)]+)\)/g, `Math.cbrt($1)`)
        .replace(/ln\(([^)]+)\)/g, `Math.log($1)`)
        .replace(/log10\(([^)]+)\)/g, `Math.log10($1)`)
        .replace(/exp\(([^)]+)\)/g, `Math.exp($1)`);

      // Trigonométricas inversas (asin, acos, atan)
      const toDegFactor = isRad ? '1' : `(180 / Math.PI)`;
      jsExpression = jsExpression
        .replace(/asin\(([^)]+)\)/g, `(Math.asin($1) * ${toDegFactor})`)
        .replace(/acos\(([^)]+)\)/g, `(Math.acos($1) * ${toDegFactor})`)
        .replace(/atan\(([^)]+)\)/g, `(Math.atan($1) * ${toDegFactor})`);

      let res = Function(`'use strict'; return (${jsExpression})`)();

      const formattedResult = isNaN(res) || !isFinite(res) ? 'Error' : (Number.isInteger(res) ? String(res) : String(Number(res.toFixed(8))));
      
      setFormula(cleanedExpr);
      setDisplayValue(formattedResult);
      
      setExpressionChain('');
      setWaitingForOperand(true);
    } catch (error) {
      setDisplayValue('Error');
      setExpressionChain('');
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