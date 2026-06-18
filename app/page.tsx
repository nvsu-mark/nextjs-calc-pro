// app/page.tsx
"use client";

import { useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const handleKeyPress = (value: string) => {
    // 1. Reset everything if 'C' is pressed
    if (value === "C") {
      setDisplay("0");
      setEquation("");
      setIsFinished(false);
      return;
    }

    // 2. Compute the calculation safely when '=' is pressed
    if (value === "=") {
      try {
        const finalEquation = equation + display;
        // Using Function is a safer backend alternative to eval() in Javascript
        const result = new Function(`return ${finalEquation}`)();
        
        setDisplay(Number(result).toString());
        setEquation("");
        setIsFinished(true);
      } catch (error) {
        setDisplay("Error");
      }
      return;
    }

    // 3. Handle operators (+, -, *, /)
    if (["+", "-", "*", "/"].includes(value)) {
      setEquation(display + " " + value + " ");
      setDisplay("0");
      setIsFinished(false);
      return;
    }

    // 4. Handle input strings (numbers and decimal validation)
    if (display === "0" || isFinished) {
      setDisplay(value === "." ? "0." : value);
      setIsFinished(false);
    } else {
      if (value === "." && display.includes(".")) return; // Block multiple decimals
      setDisplay(display + value);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "C", "="
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 text-white">
      <div className="w-full max-w-sm bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-400">Calc Pro</h2>
          <span className="text-xs px-2 py-1 rounded bg-slate-800 text-emerald-400 font-mono">v1.1.0</span>
        </div>

        {/* Dynamic Display Screen */}
        <div className="w-full h-24 flex flex-col justify-end items-end px-4 mb-6 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/50">
          <div className="text-slate-500 text-sm font-mono tracking-wide h-6 mb-1">
            {equation}
          </div>
          <div className="text-white text-4xl font-semibold font-mono tracking-tight truncate w-full text-right">
            {display}
          </div>
        </div>

        {/* Buttons Grid Layout */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleKeyPress(btn)}
              className={`h-16 rounded-2xl text-xl font-semibold transition-all active:scale-95 ${
                btn === "="
                  ? "bg-emerald-500 text-white hover:bg-emerald-400"
                  : ["/", "*", "-", "+"].includes(btn)
                  ? "bg-amber-500 text-white hover:bg-amber-400"
                  : btn === "C"
                  ? "bg-rose-600 text-white hover:bg-rose-500"
                  : "bg-slate-800 text-slate-100 hover:bg-slate-700"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}