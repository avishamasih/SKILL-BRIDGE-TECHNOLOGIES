// ============================================================
// CALCULATOR - script.js
// ============================================================

const previousOperandEl = document.getElementById('previous-operand');
const currentOperandEl = document.getElementById('current-operand');
const buttons = document.querySelectorAll('.btn');

let currentOperand = '0';
let previousOperand = '';
let operator = null;
let shouldResetScreen = false;

function updateDisplay() {
  currentOperandEl.textContent = currentOperand;
  previousOperandEl.textContent = previousOperand;
}

function appendNumber(number) {
  if (currentOperand === '0' || shouldResetScreen) {
    currentOperand = '';
    shouldResetScreen = false;
  }
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand += number;
}

function chooseOperator(op) {
  if (currentOperand === '' && previousOperand === '') return;

  if (previousOperand !== '' && !shouldResetScreen) {
    calculate();
  }

  operator = op;
  previousOperand = `${currentOperand} ${operator}`;
  shouldResetScreen = true;
}

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '÷':
      if (current === 0) {
        currentOperand = 'Error';
        previousOperand = '';
        operator = null;
        shouldResetScreen = true;
        updateDisplay();
        return;
      }
      result = prev / current;
      break;
    case '%':
      result = prev % current;
      break;
    default:
      return;
  }

  result = Math.round(result * 100000000) / 100000000;

  currentOperand = result.toString();
  previousOperand = '';
  operator = null;
  shouldResetScreen = true;
}

function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operator = null;
  shouldResetScreen = false;
}

function deleteLast() {
  if (shouldResetScreen) return;
  currentOperand = currentOperand.slice(0, -1);
  if (currentOperand === '' || currentOperand === '-') {
    currentOperand = '0';
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === 'clear') {
      clearAll();
    } else if (action === 'delete') {
      deleteLast();
    } else if (action === 'operator') {
      chooseOperator(value);
    } else if (action === 'equals') {
      calculate();
    } else {
      appendNumber(value);
    }

    updateDisplay();
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    appendNumber(e.key);
  } else if (e.key === '.') {
    appendNumber('.');
  } else if (e.key === '+' || e.key === '-') {
    chooseOperator(e.key);
  } else if (e.key === '*') {
    chooseOperator('×');
  } else if (e.key === '/') {
    e.preventDefault();
    chooseOperator('÷');
  } else if (e.key === 'Enter' || e.key === '=') {
    calculate();
  } else if (e.key === 'Backspace') {
    deleteLast();
  } else if (e.key === 'Escape') {
    clearAll();
  }
  updateDisplay();
});

updateDisplay();
