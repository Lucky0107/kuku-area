import { useState } from 'react';
import './App.css';
import { Grid } from './components/Grid';
import { FormulaDisplay } from './components/FormulaDisplay';

export default function App() {
  const [selection, setSelection] = useState({ width: 0, height: 0 });

  return (
    <div className="app-container">
      <header className="header">
        <h1>Kuku Area</h1>
        <p>Touch the grid to feel the area.</p>
      </header>

      <main className="main-content">
        <FormulaDisplay width={selection.width} height={selection.height} />
        <Grid selection={selection} onSelectionChange={setSelection} />
      </main>
    </div>
  );
}
