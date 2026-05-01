import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, errorText: string}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorText: "" };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorText: error?.message || error?.toString() || "Unknown Error" };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-xl font-black uppercase tracking-tighter mb-4">System Crash Detected</h1>
          <div className="bg-red-950/20 border border-red-900 p-6 mb-8 max-w-sm w-full">
            <p className="text-[10px] text-red-500 uppercase font-bold mb-4 tracking-widest">Diagnostic Output</p>
            <p className="text-xs font-mono text-zinc-300 break-all text-left">{this.state.errorText}</p>
          </div>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            className="w-full max-w-sm py-4 bg-zinc-100 text-black text-xs font-bold uppercase tracking-widest"
          >
            Clear Data & Restart
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error("Critical Error: Root element not found");
}
