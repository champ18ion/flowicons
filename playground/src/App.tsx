import { useState } from "react";
import Landing from "./pages/Landing";
import Playground from "./pages/Playground";

export default function App() {
  const [view, setView] = useState<'landing' | 'playground'>('landing');

  if (view === 'playground') {
    return <Playground onBack={() => setView('landing')} />;
  }

  return <Landing onEnter={() => setView('playground')} />;
}
