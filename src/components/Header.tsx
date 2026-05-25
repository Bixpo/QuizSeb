import { BrainCircuit } from "lucide-react";
import React from "react";

export const Header = () => {
  return (
    <header className="flex items-center justify-center gap-3 mb-12">
      <div className="w-16 h-16 bg-indigo-600 rounded-xl flex-items-center justify-center shadow-sm">
        <BrainCircuit className="w-14 h-14 text-white" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-800">
        Quiz GincaSeb
      </h1>
    </header>
  );
};
