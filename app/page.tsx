// app/page.tsx
"use client";

import { useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  
  // NEW STATE: Tracks if the app is in Dark Mode or Light Mode
  const [darkMode, setDarkMode] = useState(true);

  const handleKeyPress = (value: string) => {
    if (value === "C") {
      setDisplay("0");
      setEquation("");
      isFinished && setIsFinished(false);
      return;
    }

    if (value === "=") {
      try {
        const finalEquation = equation + display;
        const result = new Function(`return ${finalEquation}`)();
        setDisplay(Number(result).toString());
        setEquation("");
        setIsFinished(true);
      } catch (error) {
        setDisplay("Error");
      }
      return;
    }

    if (["+", "-", "*", "/"].includes(value)) {
      setEquation(display + " " + value + " ");
      setDisplay("0");
      setIsFinished(false);
      return;
    }

    if (display === "0" || isFinished) {
      setDisplay(value === "." ? "0." : value);
      setIsFinished(false);
    } else {
      if (value === "." && display.includes(".")) return;
      setDisplay(display + value);
    }
  };

  const buttons = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "C", "="];

  return (
    // DYNAMIC BACKGROUND: Flips between slate-950 (dark) and zinc-100 (light)
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-300 ${
      darkMode ? "bg-slate-950 text-white" : "bg-zinc-100 text-slate-900"
    }`}>
      
      {/* DYNAMIC CARD BODY */}
      <div className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl border transition-colors duration-300 ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-zinc-200"
      }`}>
        
        {/* Header with Toggle Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${darkMode ? "text-slate-400" : "text-zinc-500"}`}>Calc Pro</h2>
          
          {/* THE THEME SWITCH BUTTON */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              darkMode ? "bg-slate-800 text-amber-400 hover:bg-slate-700" : "bg-zinc-200 text-indigo-600 hover:bg-zinc-300"
            }`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* DYNAMIC DISPLAY SCREEN */}
        <div className={`w-full h-24 flex flex-col justify-end items-end px-4 mb-6 rounded-2xl overflow-hidden border transition-colors ${
          darkMode ? "bg-slate-950 border-slate-800/50" : "bg-zinc-50 border-zinc-200"
        }`}>
          <div className="text-slate-500 text-sm font-mono tracking-wide h-6 mb-1">
            {equation}
          </div>
          <div className={`text-4xl font-semibold font-mono tracking-tight truncate w-full text-right ${
            darkMode ? "text-white" : "text-zinc-900"
          }`}>
            {display}
          </div>
        </div>

        {/* BUTTONS GRID */}
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
                  : darkMode 
                    ? "bg-slate-800 text-slate-100 hover:bg-slate-700" 
                    : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300"
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