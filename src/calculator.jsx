import { useState } from "react";

export const Calculator = () => {
  const [fullExpression, setFullExpression] = useState("");
  const [result, setResult] = useState("00");

  const handleButtonClick = (value) => {
    switch (value) {
      case "AC":
        clearDisplay();
        break;
      case "X":
        backspace();
        break;
      case "=":
        calculateResult();
        break;
      default:
        updateExpression(value);
        break;
    }
  };

  const updateExpression = (newExpression) => {
    let updatedExpression = fullExpression + newExpression;

    // Prevent two consecutive operators
    const lastTwoChars = updatedExpression.slice(-2);
    if (isNaN(lastTwoChars[0]) && isNaN(lastTwoChars[1])) {
      updatedExpression = updatedExpression.slice(0, -2) + newExpression;
    }

    setFullExpression(updatedExpression);
  };

  const backspace = () => {
    setFullExpression((prev) => prev.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      const calculated = Function(`return ${fullExpression}`)();
      if (!isNaN(calculated)) {
        setResult(calculated);
        setFullExpression(calculated.toString());
      } else {
        setResult("Error");
      }
    } catch {
      setResult("Error");
    }
  };

  const clearDisplay = () => {
    setFullExpression("");
    setResult("00");
  };

  const buttonValues = [
    ["AC", "X", "/"],
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", "."],
  ];
  const operatorValues = ["*", "-", "+", "="];

  return (
    <main className="main-section">
      <div className="calculator-container">
        {/* Display Section */}
        <div className="calculator-display">
          <p className="expression">{fullExpression || "0"}</p>
          <h2 className="result">= {result}</h2>
        </div>

        {/* Buttons Section */}
        <div className="calculator-buttons">
          <div className="buttons-grid">
            {buttonValues.flat().map((value) => (
              <button
                key={value}
                className={`button ${value === "AC" || value === "X" ? "button-clear" : ""}`}
                onClick={() => handleButtonClick(value)}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="operators-grid">
            {operatorValues.map((value) => (
              <button
                key={value}
                className={`button ${value === "=" ? "button-equal" : "button-operator"}`}
                onClick={() => handleButtonClick(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
