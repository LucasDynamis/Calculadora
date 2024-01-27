// Obtém o elemento de exibição
const display = document.getElementById("display");

// Pega todos os botões
const buttons = document.querySelectorAll(".button");

// Define algumas variáveis ​​para armazenar o estado da calculadora
let firstOperand = null; //O primeiro operando
let secondOperand = null; //O segundo operando
let operator = null; // O operador
let result = null; //O resultado do cálculo
let clearDisplay = false; //Se deseja limpar o display na próxima entrada

// Define uma função para atualizar o display
function updateDisplay() {
  // Se o resultado não for nulo, mostre-o
  if (result !== null) {
    display.textContent = result;
  }
  // Se o segundo operando não for nulo, mostre-o
  else if (secondOperand !== null) {
    display.textContent = `${String(firstOperand || '')} ${operator || ''} ${secondOperand}`;
  }
  // Se o operador não for nulo, mostre-o
  else if (operator !== null) {
    display.textContent = `${String(firstOperand || '')} ${operator}`;
  }
  // Se o primeiro operando não for nulo, mostre-o
  else if (firstOperand !== null) {
    display.textContent = String(firstOperand);
  }
  // Caso contrário, mostra zero
  else {
    display.textContent = "0";
  }
}

// Define uma função para lidar com o clique do botão
function handleButtonClick(event) {
  // Obtém o valor do botão
  const value = event.target.textContent;

  //Se o valor for um número
  if (!isNaN(value) || value === ".") {
    // Se o display precisar ser limpo, configure o segundo operando para o valor e limpe o display
    if (clearDisplay) {
      secondOperand = value;
      clearDisplay = false;
    } else {
      secondOperand = secondOperand ? secondOperand + value : value;
    }
    // Atualiza a exibição
    updateDisplay();
  }

  // Se o valor for um operador
  else if (["+", "-", "*", "/", "%"].includes(value)) {
    //Se o primeiro operando e o operador não forem nulos, realize o cálculo e armazene o resultado
    if (firstOperand && operator) {
      calculate();
    }
    // Define o primeiro operando para o segundo operando ou o resultado ou zero se ambos forem nulos
    firstOperand = secondOperand || result || "0";
    // Define o operador para o valor
    operator = value;
    // Define o segundo operando e o resultado como nulo
    secondOperand = null;
    result = null;
    // Define o display para ser limpo na próxima entrada
    clearDisplay = true;
    // Atualiza a exibição
    updateDisplay();
  }

  // Se o valor for o sinal de igual
  else if (value === "=") {
    // Se o primeiro operando, o segundo operando e o operador não forem nulos, realiza o cálculo e armazena o resultado
    if (firstOperand && secondOperand && operator) {
      calculate();
    }
    // Define o primeiro operando, o segundo operando e o operador como nulos
    firstOperand = null;
    secondOperand = null;
    operator = null;
    // Atualiza a exibição
    updateDisplay();
  }

  // Se o valor for o botão limpar
  else if (value === "C") {
    // Redefine todas as variáveis ​​para null
    firstOperand = null;
    secondOperand = null;
    operator = null;
    result = null;
    // Atualiza a exibição
    updateDisplay();
  }

  // Se o valor for o botão de sinal
  else if (value === "+/-") {
    // Se o segundo operando não for nulo, multiplique-o por -1 e atualize o display
    if (secondOperand) {
      secondOperand = String(-1 * Number(secondOperand));
      updateDisplay();
    }
  }
}

// Define uma função para realizar o cálculo
function calculate() {
  // Converte os operandos em números
  const x = Number(firstOperand);
  const y = Number(secondOperand);

  // Executa a operação com base no operador e armazena o resultado
  switch (operator) {
    case "+":
      result = String(x + y);
      break;
    case "-":
      result = String(x - y);
      break;
    case "*":
      result = String(x * y);
      break;
    case "/":
      result = String(x / y);
      break;
    case "%":
      result = String(x % y);
      break;
  }
}

// Adiciona um ouvinte de evento de mousedown a cada botão
for (let button of buttons) {
  button.addEventListener("mousedown", handleButtonClick);
}
