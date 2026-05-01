import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    (window as any).lastError = error?.toString();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-xl font-black uppercase tracking-tighter mb-4">System Recovery</h1>
          <div className="bg-red-950/20 border border-red-900 p-4 mb-8 max-w-sm">
            <p className="text-[10px] text-red-500 uppercase font-bold mb-2 tracking-widest">Error Diagnostic</p>
            <p className="text-xs font-mono text-zinc-400 break-all">{(window as any).lastError || "Unknown Error"}</p>
          </div>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            className="px-8 py-4 bg-zinc-100 text-black text-xs font-bold uppercase tracking-widest"
          >
            Wipe Data & Restart
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
