"use client";

import { useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState("0");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 text-white">
      <div className="w-full max-w-sm bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800">
        <h2 className="text-xl font-bold mb-4 text-slate-400">Calc Pro</h2>
        <div className="w-full h-20 flex items-center justify-end px-4 mb-6 bg-slate-950 rounded-xl text-3xl font-mono">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", "C", "=", "+"].map((char) => (
            <button 
              key={char} 
              className="h-14 rounded-xl bg-slate-800 text-xl font-semibold hover:bg-slate-700 active:scale-95 transition-transform"
              onClick={() => char === "C" ? setDisplay("0") : setDisplay(char)}
            >
              {char}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}